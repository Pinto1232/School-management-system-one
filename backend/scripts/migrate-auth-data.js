const mongoose = require('mongoose');
const { dbUri } = require('../src/config/env');

const schoolId = String(process.env.MIGRATION_SCHOOL_ID || '').trim();
const tenantCollections = [
  'admins',
  'assignments',
  'attendances',
  'books',
  'campuses',
  'classrooms',
  'courses',
  'enrollments',
  'events',
  'faculties',
  'finances',
  'gradebooks',
  'humanresources',
  'icons',
  'libraries',
  'payments',
  'sports',
  'students',
  'studenttrackings',
  'subscriptions',
  'teachers',
  'users',
];

if (!dbUri) throw new Error('DB_URI is required.');
if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(schoolId)) {
  throw new Error('Set MIGRATION_SCHOOL_ID to the school_id used by the Keycloak administrator.');
}

const migrate = async () => {
  await mongoose.connect(dbUri);

  for (const collectionName of tenantCollections) {
    const collection = mongoose.connection.collection(collectionName);
    const result = await collection.updateMany(
      { $or: [{ schoolId: { $exists: false } }, { schoolId: null }, { schoolId: '' }] },
      { $set: { schoolId } },
    );
    console.log(`${collectionName}: assigned ${result.modifiedCount} records to ${schoolId}`);
  }

  for (const collectionName of ['admins', 'users']) {
    const result = await mongoose.connection.collection(collectionName).updateMany(
      {},
      { $unset: { password: '', loginAttempts: '', lockUntil: '' } },
    );
    console.log(`${collectionName}: removed legacy authentication fields from ${result.modifiedCount} records`);
  }

  await mongoose.disconnect();
};

migrate().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
