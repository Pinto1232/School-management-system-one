require('../tenancy/register');

const asyncHandler = require('./asyncHandler');
const User = require('../models/User');
const { keycloakAudience, keycloakIssuer } = require('../config/env');
const { runWithTenant } = require('../tenancy/context');

const SCHOOL_ROLES = ['platform_admin', 'admin', 'teacher', 'staff', 'parent', 'student'];
let verifierPromise;

const getVerifier = async () => {
  if (!verifierPromise) {
    verifierPromise = import('jose').then(({ createRemoteJWKSet, jwtVerify }) => {
      const jwks = createRemoteJWKSet(
        new URL(`${keycloakIssuer.replace(/\/$/, '')}/protocol/openid-connect/certs`),
      );

      return token => jwtVerify(token, jwks, {
        issuer: keycloakIssuer,
        audience: keycloakAudience,
        algorithms: ['RS256'],
      });
    });
  }

  return verifierPromise;
};

const verifyAccessToken = async (token) => {
  const verify = await getVerifier();
  const { payload } = await verify(token);
  return payload;
};

const verifyAccessTokenWithJwks = async (token, jwks, options = {}) => {
  const { createLocalJWKSet, jwtVerify } = await import('jose');
  const { payload } = await jwtVerify(token, createLocalJWKSet(jwks), {
    issuer: options.issuer || keycloakIssuer,
    audience: options.audience || keycloakAudience,
    algorithms: ['RS256'],
  });
  return payload;
};

const rolesFromToken = (payload) => {
  const realmRoles = Array.isArray(payload.realm_access?.roles)
    ? payload.realm_access.roles
    : [];
  const clientRoles = Array.isArray(payload.resource_access?.[keycloakAudience]?.roles)
    ? payload.resource_access[keycloakAudience].roles
    : [];

  return [...new Set([...realmRoles, ...clientRoles])]
    .map(role => String(role).toLowerCase())
    .filter(role => SCHOOL_ROLES.includes(role));
};

const primaryRole = roles => SCHOOL_ROLES.find(role => roles.includes(role)) || 'unassigned';

const schoolIdFromToken = (payload) => {
  const claim = payload.school_id || payload.schoolId;
  const schoolId = String(claim || payload.sub || '').trim();

  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(schoolId)) {
    const error = new Error('The access token has an invalid school identifier.');
    error.statusCode = 403;
    error.code = 'INVALID_SCHOOL_ID';
    throw error;
  }

  return schoolId;
};

const profileConflict = (message) => {
  const error = new Error(message);
  error.statusCode = 409;
  error.code = 'IDENTITY_PROFILE_CONFLICT';
  return error;
};

const syncUser = async (payload, roles, schoolId) => {
  const email = String(payload.email || '').trim().toLowerCase();
  if (!email) {
    const error = new Error('The Keycloak account must have an email address.');
    error.statusCode = 403;
    error.code = 'EMAIL_REQUIRED';
    throw error;
  }

  let user = await User.findOne({ keycloakId: payload.sub })
    .setOptions({ bypassTenant: true })
    .select('-password -loginAttempts -lockUntil');

  const emailOwner = await User.findOne({ email })
    .setOptions({ bypassTenant: true })
    .select('_id keycloakId schoolId');

  if (emailOwner?.keycloakId && emailOwner.keycloakId !== payload.sub) {
    throw profileConflict('This email belongs to a different Keycloak identity.');
  }

  if (!user) {
    const canLinkLegacyProfile = payload.email_verified === true
      && emailOwner
      && !emailOwner.keycloakId
      && emailOwner.schoolId === schoolId;

    if (emailOwner && !canLinkLegacyProfile) {
      throw profileConflict(
        'A legacy profile already uses this email. Verify the email and migrate that profile before signing in.',
      );
    }

    user = canLinkLegacyProfile
      ? await User.findById(emailOwner._id).setOptions({ bypassTenant: true })
      : new User({ schoolId });
    user.keycloakId = payload.sub;
  } else if (user.schoolId !== schoolId) {
    // The signed Keycloak school claim is authoritative. A move does not move
    // existing school data; it only changes which tenant this identity can access.
    await User.collection.updateOne({ _id: user._id }, { $set: { schoolId } });
    user.schoolId = schoolId;
  }

  user.email = email;
  user.firstName = payload.given_name || user.firstName || payload.preferred_username || email.split('@')[0];
  user.lastName = payload.family_name || user.lastName || '-';
  user.role = primaryRole(roles);
  if (payload.picture) user.image = payload.picture;

  user.lastLogin = new Date();
  await user.save();
  return user;
};

module.exports = asyncHandler(async (req, res, next) => {
  if (req.auth && req.schoolId) {
    return runWithTenant(req.schoolId, next);
  }

  const authHeader = req.header('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
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

    return res.status(401).json({ message: 'Invalid or expired access token.' });
  }

  const roles = rolesFromToken(payload);
  const schoolId = schoolIdFromToken(payload);

  return runWithTenant(schoolId, async () => {
    const localUser = await syncUser(payload, roles, schoolId);

    req.auth = { payload, roles, schoolId };
    req.schoolId = schoolId;
    req.user = {
      id: localUser.id,
      _id: localUser._id,
      keycloakId: payload.sub,
      schoolId,
      email: localUser.email,
      firstName: localUser.firstName,
      lastName: localUser.lastName,
      role: primaryRole(roles),
      roles,
      image: localUser.image || payload.picture || '',
    };

    return next();
  });
});

module.exports.rolesFromToken = rolesFromToken;
module.exports.primaryRole = primaryRole;
module.exports.schoolIdFromToken = schoolIdFromToken;
module.exports.syncUser = syncUser;
module.exports.verifyAccessToken = verifyAccessToken;
module.exports.verifyAccessTokenWithJwks = verifyAccessTokenWithJwks;
