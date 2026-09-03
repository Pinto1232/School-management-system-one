const assert = require('node:assert/strict');
const test = require('node:test');
const app = require('../src/app');
const authenticate = require('../src/middlewares/authenticate');
const authenticateAccessToken = require('../src/middlewares/authenticateAccessToken');
const authenticateFeedback = authenticateAccessToken.withTenantIdentity;
const packageRoutes = require('../src/routes/packages');
const contentRoutes = require('../src/routes/contents/contentRoutes');

const protectedRequests = [
  ['GET', '/api/finances'],
  ['GET', '/api/gradebook'],
  ['GET', '/api/humanresources'],
  ['GET', '/api/payments'],
  ['GET', '/api/libraries'],
  ['GET', '/api/events'],
  ['GET', '/api/enrollments/student/example'],
  ['POST', '/api/packages'],
  ['POST', '/api/content'],
];

test('every sensitive route family is mounted behind authentication', () => {
  const authenticationLayers = app._router.stack.filter(layer => layer.handle === authenticate);
  for (const [, path] of protectedRequests.slice(0, 7)) {
    assert.equal(
      authenticationLayers.some(layer => layer.regexp.test(path)),
      true,
      `${path} must be mounted behind authentication`,
    );
  }
});

test('navigation uses verified access-token authentication without profile synchronization', () => {
  const authenticationLayer = app._router.stack.find(layer => layer.handle === authenticateAccessToken);

  assert.ok(authenticationLayer);
  assert.equal(authenticationLayer.regexp.test('/api/v1/navigation/sidebar'), true);
});

test('public package and content routers authenticate their mutations', () => {
  const mutationIsProtected = (router, method, path) => router.stack.some(layer =>
    layer.route?.path === path
    && layer.route.methods[method]
    && layer.route.stack.some(handler => handler.handle === authenticate));

  assert.equal(mutationIsProtected(packageRoutes, 'post', '/'), true);
  assert.equal(packageRoutes.stack.some(layer => (
    layer.route?.path === '/feedback'
    && layer.route.methods.get
    && layer.route.stack.some(handler => handler.handle === authenticateFeedback)
  )), true);
  assert.equal(packageRoutes.stack.some(layer => (
    layer.route?.path === '/:planKey/feedback'
    && layer.route.methods.put
    && layer.route.stack.some(handler => handler.handle === authenticateFeedback)
  )), true);
  assert.equal(mutationIsProtected(contentRoutes, 'post', '/content'), true);
});
