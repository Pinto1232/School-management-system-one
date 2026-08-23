import type { H3Event } from 'h3'
import type { JWTPayload } from 'jose'
import { createRemoteJWKSet, jwtVerify } from 'jose'

interface KeycloakPayload extends JWTPayload {
  realm_access?: { roles?: unknown }
  resource_access?: Record<string, { roles?: unknown }>
}

const SCHOOL_ROLES = ['platform_admin', 'admin', 'teacher', 'staff', 'parent', 'student'] as const
const JWKS_AVAILABILITY_ERRORS = new Set([
  'ERR_JOSE_GENERIC',
  'ERR_JWKS_INVALID',
  'ERR_JWKS_MULTIPLE_MATCHING_KEYS',
  'ERR_JWKS_TIMEOUT',
])
const jwksByIssuer = new Map<string, ReturnType<typeof createRemoteJWKSet>>()

const rolesFrom = (value: unknown) => Array.isArray(value)
  ? value.filter((role): role is string => typeof role === 'string')
  : []

const getJwks = (issuer: string) => {
  const existing = jwksByIssuer.get(issuer)
  if (existing) return existing

  const jwks = createRemoteJWKSet(new URL(`${issuer}/protocol/openid-connect/certs`), {
    timeoutDuration: 5000,
    cooldownDuration: 30_000,
    cacheMaxAge: 10 * 60_000,
  })
  jwksByIssuer.set(issuer, jwks)
  return jwks
}

export const requireKeycloakAuth = async (event: H3Event) => {
  const config = useRuntimeConfig(event)
  const keycloakUrl = config.public.keycloakUrl.replace(/\/+$/, '')
  const realm = config.public.keycloakRealm.trim()
  const audience = config.public.keycloakAudience.trim()
  const clientId = config.public.keycloakClientId.trim()

  if (!keycloakUrl || !realm || !audience || !clientId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Keycloak authentication is not configured.',
    })
  }

  const authorization = getHeader(event, 'authorization') || ''
  const match = authorization.match(/^Bearer\s+(.+)$/i)
  if (!match?.[1]) {
    setResponseHeader(event, 'WWW-Authenticate', 'Bearer')
    throw createError({ statusCode: 401, statusMessage: 'Missing bearer token.' })
  }

  const issuer = `${keycloakUrl}/realms/${encodeURIComponent(realm)}`
  try {
    new URL(issuer)
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Keycloak authentication is not configured correctly.',
    })
  }

  try {
    const { payload } = await jwtVerify(match[1].trim(), getJwks(issuer), {
      issuer,
      audience,
      algorithms: ['RS256'],
      clockTolerance: 5,
    })
    const token = payload as KeycloakPayload

    const realmRoles = rolesFrom(token.realm_access?.roles)
    const apiRoles = rolesFrom(token.resource_access?.[audience]?.roles)
    const frontendRoles = rolesFrom(token.resource_access?.[clientId]?.roles)
    const roles = [...new Set([...realmRoles, ...apiRoles, ...frontendRoles].map(role => role.toLowerCase()))]
      .filter(role => SCHOOL_ROLES.includes(role as typeof SCHOOL_ROLES[number]))

    // Keycloak lightweight access tokens can omit `sub`. This endpoint only
    // needs the verified API audience and roles, so identity is optional here.
    return {
      userId: typeof token.sub === 'string' && token.sub ? token.sub : null,
      roles,
    }
  } catch (error) {
    const errorCode = typeof error === 'object' && error !== null && 'code' in error
      ? String(error.code)
      : ''
    if (error instanceof TypeError || JWKS_AVAILABILITY_ERRORS.has(errorCode)) {
      setResponseHeader(event, 'Retry-After', 5)
      throw createError({
        statusCode: 503,
        statusMessage: 'The authentication service is temporarily unavailable.',
      })
    }

    const claim = typeof error === 'object' && error !== null && 'claim' in error
      ? String(error.claim)
      : ''
    const reason = typeof error === 'object' && error !== null && 'reason' in error
      ? String(error.reason)
      : ''

    if (import.meta.dev) {
      console.warn(`[keycloak-auth] Access token rejected (${errorCode || 'unknown'}${claim ? `, claim: ${claim}` : ''}).`)
    }

    setResponseHeader(event, 'WWW-Authenticate', 'Bearer error="invalid_token"')
    throw createError({
      statusCode: 401,
      statusMessage: import.meta.dev
        ? `Invalid access token (${[errorCode || 'unknown', claim, reason].filter(Boolean).join(', ')}).`
        : 'Invalid or expired access token.',
    })
  }
}
