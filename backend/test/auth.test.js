const assert = require('node:assert/strict');
const test = require('node:test');
const authenticate = require('../src/middlewares/authenticate');
const { createAuthenticateAccessToken } = require('../src/middlewares/authenticateAccessToken');
const { authorize } = require('../src/middlewares/authorize');
const { getTenant } = require('../src/tenancy/context');

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

  assert.throws(
    () => authenticate.schoolIdFromToken({}),
    error => error.statusCode === 401 && error.code === 'IDENTITY_CLAIMS_REQUIRED',
  );
});

test('rejects access tokens that omit required profile claims as refreshable authentication failures', async () => {
  await assert.rejects(
    authenticate.syncUser({ sub: 'user-123' }, ['student'], 'school-a'),
    error => error.statusCode === 401 && error.code === 'IDENTITY_CLAIMS_REQUIRED',
  );
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
    headers: {},
    set(name, value) {
      this.headers[name] = value;
      return this;
    },
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
  assert.equal(response.headers['WWW-Authenticate'], 'Bearer');
  assert.match(response.body.message, /bearer token/i);
});

test('token-only authentication exposes roles without requiring profile claims', async () => {
  const middleware = createAuthenticateAccessToken({
    verifyAccessToken: async () => ({
      realm_access: { roles: ['admin'] },
      resource_access: {},
    }),
  });
  const request = {
    auth: null,
    user: null,
    header: () => 'Bearer signed-token',
  };
  const response = {};
  let nextCalled = false;

  await middleware(request, response, () => { nextCalled = true; });

  assert.equal(nextCalled, true);
  assert.deepEqual(request.auth.roles, ['admin']);
  assert.equal(request.user.role, 'admin');
  assert.equal(request.user.keycloakId, null);
});

test('token-only authentication can require a stable subject and tenant context', async () => {
  const middleware = createAuthenticateAccessToken({
    requireSubject: true,
    requireTenant: true,
    verifyAccessToken: async () => ({
      sub: 'user-123',
      school_id: 'school-a',
      realm_access: { roles: ['student'] },
    }),
  });
  const request = {
    auth: null,
    schoolId: null,
    user: null,
    header: () => 'Bearer signed-token',
  };
  let tenantInsideNext = null;

  await middleware(request, {}, () => {
    tenantInsideNext = getTenant()?.schoolId;
  });

  assert.equal(request.user.keycloakId, 'user-123');
  assert.equal(request.schoolId, 'school-a');
  assert.equal(tenantInsideNext, 'school-a');
});
