# Express API

The backend is an Express and MongoDB API secured by Keycloak access tokens.

## Environment

Copy `.env.example` to `.env` for a new local setup, or add the Keycloak values to the existing `.env`:

```env
KEYCLOAK_ISSUER=http://localhost:8081/realms/school-system
KEYCLOAK_AUDIENCE=school-system-api
```

`KEYCLOAK_ISSUER` must exactly match the `iss` claim in tokens issued by the realm. The API downloads and caches signing keys from the realm JWKS endpoint and accepts only RS256 tokens with the configured issuer and audience.

## Commands

```sh
npm install
npm test
npm run dev
```

`npm run dev` starts the Express API with Nodemon and the Keycloak/PostgreSQL Docker Compose stack together. Ctrl+C stops both attached development processes. Use `npm run dev:api` to run only Express, or `npm run keycloak:up` and `npm run keycloak:down` to manage Keycloak separately.

Authenticated Keycloak identities are synchronized into MongoDB as application profiles on their first API request. Passwords, login sessions, password resets, and role assignments are not managed by MongoDB.

All non-public API models are automatically scoped to the signed `school_id` claim. When the claim is absent, the identity is isolated to its Keycloak subject rather than receiving access to unscoped data. Only package and public-site content reads are anonymous; their mutations require the non-default `platform_admin` role.

For a single-school legacy database, back up MongoDB and run the one-time migration with the school administrator's `schoolId`:

```sh
MIGRATION_SCHOOL_ID=<school-id> npm run migrate:auth
```

See `keycloak/README.md` for existing-realm, user-role, tenant-membership, and password-recovery setup.
