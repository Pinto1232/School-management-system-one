const { getTenant } = require('./context');

const NO_TENANT = '__missing_tenant_context__';
const QUERY_OPERATIONS = [
  'countDocuments',
  'deleteMany',
  'deleteOne',
  'find',
  'findOne',
  'findOneAndDelete',
  'findOneAndReplace',
  'findOneAndUpdate',
  'replaceOne',
  'updateMany',
  'updateOne',
];

const removeSchoolIdMutation = (update) => {
  if (!update) return update;
  if (Array.isArray(update)) {
    for (const stage of update) {
      if (stage.$set) delete stage.$set.schoolId;
      if (stage.$addFields) delete stage.$addFields.schoolId;
      if (Array.isArray(stage.$unset)) {
        stage.$unset = stage.$unset.filter(field => field !== 'schoolId');
      } else if (stage.$unset === 'schoolId') {
        delete stage.$unset;
      }
    }
    return update;
  }

  delete update.schoolId;
  if (update.$set) delete update.$set.schoolId;
  if (update.$setOnInsert) delete update.$setOnInsert.schoolId;
  if (update.$unset) delete update.$unset.schoolId;
  return update;
};

module.exports = function tenantPlugin(schema) {
  if (schema.get('tenantScoped') === false) return;

  schema.add({
    schoolId: {
      type: String,
      required: true,
      immutable: true,
      index: true,
    },
  });

  schema.pre('validate', function enforceTenantOnDocument(next) {
    if (this.$locals?.bypassTenant) return next();

    const schoolId = getTenant()?.schoolId;
    if (!schoolId) {
      this.invalidate('schoolId', 'A school tenant context is required.');
      return next();
    }

    this.schoolId = schoolId;
    return next();
  });

  for (const operation of QUERY_OPERATIONS) {
    schema.pre(operation, function scopeTenantQuery(next) {
      if (this.getOptions().bypassTenant === true) return next();

      const schoolId = getTenant()?.schoolId || NO_TENANT;
      this.setQuery({ ...this.getQuery(), schoolId });
      if (operation.toLowerCase().includes('update') || operation.toLowerCase().includes('replace')) {
        this.setUpdate(removeSchoolIdMutation(this.getUpdate()));
      }
      return next();
    });
  }

  schema.pre('insertMany', function scopeInsertedDocuments(next, documents) {
    const schoolId = getTenant()?.schoolId;
    if (!schoolId) return next(new Error('A school tenant context is required.'));

    for (const document of documents) document.schoolId = schoolId;
    return next();
  });

  schema.pre('aggregate', function scopeTenantAggregate(next) {
    if (this.options?.bypassTenant === true) return next();

    const schoolId = getTenant()?.schoolId || NO_TENANT;
    this.pipeline().unshift({ $match: { schoolId } });
    return next();
  });
};
