const asyncHandler = require('./asyncHandler');
const authenticate = require('./authenticate');
const { runWithTenant } = require('../tenancy/context');

const createAuthenticateAccessToken = ({
  requireSubject = false,
  requireTenant = false,
  verifyAccessToken = authenticate.verifyAccessToken,
} = {}) => asyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    res.set('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ message: 'Missing bearer token.' });
  }

  const token = authHeader.slice('Bearer '.length).trim();
  let payload;

  try {
    payload = await verifyAccessToken(token);
  } catch (error) {
    const isConfigurationError = error instanceof TypeError && /Invalid URL/.test(error.message);
    if (isConfigurationError) {
      return res.status(500).json({ message: 'Keycloak authentication is not configured.' });
    }

    res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
    return res.status(401).json({ message: 'Invalid or expired access token.' });
  }

  const roles = authenticate.rolesFromToken(payload);
  const keycloakId = typeof payload.sub === 'string' && payload.sub ? payload.sub : null;
  if (requireSubject && !keycloakId) {
    res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
    return res.status(401).json({
      message: 'The access token must include a stable subject.',
      code: 'IDENTITY_CLAIMS_REQUIRED',
    });
  }

  req.auth = { payload, roles };
  req.user = {
    keycloakId,
    role: authenticate.primaryRole(roles),
    roles,
  };

  if (requireTenant) {
    let schoolId;
    try {
      schoolId = authenticate.schoolIdFromToken(payload);
    } catch (error) {
      if (error.statusCode === 401) res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
      return res.status(error.statusCode || 403).json({
        message: error.message,
        code: error.code,
      });
    }

    req.auth.schoolId = schoolId;
    req.schoolId = schoolId;
    req.user.schoolId = schoolId;
    return runWithTenant(schoolId, next);
  }

  return next();
});

const authenticateAccessToken = createAuthenticateAccessToken();
const authenticateAccessTokenWithTenantIdentity = createAuthenticateAccessToken({
  requireSubject: true,
  requireTenant: true,
});

module.exports = authenticateAccessToken;
module.exports.createAuthenticateAccessToken = createAuthenticateAccessToken;
module.exports.withTenantIdentity = authenticateAccessTokenWithTenantIdentity;
