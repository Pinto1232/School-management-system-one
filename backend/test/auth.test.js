const assert = require('node:assert/strict');
const test = require('node:test');
const authenticate = require('../src/middlewares/authenticate');
const { authorize } = require('../src/middlewares/authorize');

test('extracts supported school roles from realm and API client claims', () => {
  const payload = {
    realm_access: { roles: ['offline_access', 'student', 'admin', 'platform_admin'] },
    resource_access: {
      'school-system-api': { roles: ['teacher', 'unrelated-role'] },
    },
  };

  assert.deepEqual(authenticate.rolesFromToken(payload), ['student', 'admin', 'platform_admin', 'teacher']);
});

test('selects the highest-privilege school role deterministically', () => {
  assert.equal(authenticate.primaryRole(['student', 'teacher']), 'teacher');
  assert.equal(authenticate.primaryRole(['student', 'admin']), 'admin');
  assert.equal(authenticate.primaryRole(['admin', 'platform_admin']), 'platform_admin');
  assert.equal(authenticate.primaryRole([]), 'unassigned');
});

test('uses a signed school claim and otherwise isolates the identity to its subject', () => {
  assert.equal(authenticate.schoolIdFromToken({ sub: 'user-123', school_id: 'school-a' }), 'school-a');
  assert.equal(authenticate.schoolIdFromToken({ sub: 'user-123' }), 'user-123');
  assert.throws(() => authenticate.schoolIdFromToken({ sub: '../invalid' }), /invalid school identifier/i);
});

test('authorizes when any Keycloak role is allowed', () => {
  const middleware = authorize(['teacher', 'admin']);
  let nextCalled = false;

  middleware(
    { user: { role: 'student', roles: ['student', 'teacher'] } },
    {},
    () => { nextCalled = true; },
  );

  assert.equal(nextCalled, true);
});

test('platform administrators inherit school administrator permissions', () => {
  const middleware = authorize(['admin']);
  let nextCalled = false;

  middleware(
    { user: { role: 'platform_admin', roles: ['platform_admin'] } },
    {},
    () => { nextCalled = true; },
  );

  assert.equal(nextCalled, true);
});

test('returns forbidden when no Keycloak role is allowed', () => {
  const middleware = authorize(['admin']);
  const response = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  middleware({ user: { role: 'student', roles: ['student'] } }, response, () => {});

  assert.equal(response.statusCode, 403);
  assert.match(response.body.message, /admin/);
});

test('returns unauthorized when the bearer token is missing', async () => {
  const response = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  await authenticate({ header: () => undefined }, response, () => {});
  assert.equal(response.statusCode, 401);
  assert.match(response.body.message, /bearer token/i);
});
