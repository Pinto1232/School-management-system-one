const assert = require('node:assert/strict');
const test = require('node:test');
require('../src/tenancy/register');
const PackageFeedback = require('../src/models/PackageFeedback');
const { normalisePlanKey } = require('../src/controllers/packages');
const { runWithTenant } = require('../src/tenancy/context');

test('accepts stable package identifiers and rejects unsafe values', () => {
  assert.equal(normalisePlanKey(' essential '), 'essential');
  assert.equal(normalisePlanKey('507f1f77bcf86cd799439011'), '507f1f77bcf86cd799439011');
  assert.throws(() => normalisePlanKey('../complete'), /invalid/i);
  assert.throws(() => normalisePlanKey(''), /invalid/i);
});

test('package feedback is tenant-scoped and stores explicit unlike feedback', async () => {
  const feedback = new PackageFeedback({
    planKey: 'complete',
    userId: 'keycloak-user-1',
    liked: false,
  });

  await runWithTenant('school-a', () => feedback.validate());

  assert.equal(feedback.schoolId, 'school-a');
  assert.equal(feedback.liked, false);
});

test('package feedback has one record per school, user, and plan', () => {
  const uniqueIndex = PackageFeedback.schema.indexes().find(([, options]) => options.unique === true);
  assert.deepEqual(uniqueIndex?.[0], { schoolId: 1, userId: 1, planKey: 1 });
});
