const assert = require('node:assert/strict');
const test = require('node:test');

test('accepts only correctly signed RS256 tokens with the configured issuer and audience', async () => {
  const { exportJWK, generateKeyPair, SignJWT } = await import('jose');
  const { publicKey, privateKey } = await generateKeyPair('RS256');
  const publicJwk = await exportJWK(publicKey);
  publicJwk.kid = 'test-signing-key';
  publicJwk.alg = 'RS256';
  publicJwk.use = 'sig';

  const issuer = 'http://keycloak.test/realms/school-system';
  const authenticate = require('../src/middlewares/authenticate');
  const baseToken = () => new SignJWT({ email: 'admin@example.test' })
    .setProtectedHeader({ alg: 'RS256', kid: publicJwk.kid })
    .setSubject('keycloak-user-id')
    .setIssuer(issuer)
    .setIssuedAt()
    .setExpirationTime('2m');

  const validToken = await baseToken().setAudience('school-system-api').sign(privateKey);
  const jwks = { keys: [publicJwk] };
  const verify = token => authenticate.verifyAccessTokenWithJwks(token, jwks, {
    issuer,
    audience: 'school-system-api',
  });
  const payload = await verify(validToken);
  assert.equal(payload.sub, 'keycloak-user-id');

  const wrongAudienceToken = await baseToken().setAudience('different-api').sign(privateKey);
  await assert.rejects(
    verify(wrongAudienceToken),
    /aud/i,
  );
});
