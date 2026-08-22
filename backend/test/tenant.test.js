const assert = require('node:assert/strict');
const test = require('node:test');
const mongoose = require('../src/tenancy/register');
const { runWithTenant } = require('../src/tenancy/context');

const tenantTestSchema = new mongoose.Schema({ name: String });
const TenantTest = mongoose.models.TenantSecurityTest
  || mongoose.model('TenantSecurityTest', tenantTestSchema);

const runQueryHook = (operation, query) => new Promise((resolve, reject) => {
  tenantTestSchema.s.hooks.execPre(operation, query, [], error => (error ? reject(error) : resolve()));
});

test('tenant documents fail closed without a school context', async () => {
  const document = new TenantTest({ name: 'unscoped' });
  await assert.rejects(document.validate(), /school tenant context/i);
});

test('tenant documents receive the active school identifier', async () => {
  const document = new TenantTest({ name: 'scoped', schoolId: 'attacker-value' });
  await runWithTenant('school-a', () => document.validate());
  assert.equal(document.schoolId, 'school-a');
});

test('tenant query middleware enforces the active school and strips tenant mutations', async () => {
  const query = TenantTest.findOneAndUpdate(
    { name: 'record', schoolId: 'school-b' },
    { $set: { name: 'updated', schoolId: 'school-b' } },
  );

  await runWithTenant('school-a', () => runQueryHook('findOneAndUpdate', query));
  assert.equal(query.getQuery().schoolId, 'school-a');
  assert.equal(query.getUpdate().$set.schoolId, undefined);
});
