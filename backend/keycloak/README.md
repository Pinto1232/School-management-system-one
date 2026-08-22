# Keycloak development setup

This directory contains the importable `school-system` realm used by the Nuxt frontend and Express API.

## Start locally

From the `backend` directory, start the API and Keycloak together:

```sh
npm run dev
```

On first use, the launcher generates strong local bootstrap and database passwords in the ignored `keycloak/.env` file with owner-only permissions. You may create that file from `.env.example` yourself when you want to choose the values.

Open the Keycloak admin console at `http://localhost:8081/admin/` and sign in with the bootstrap admin credentials from `keycloak/.env`. Change `KEYCLOAK_PORT` if port 8081 is unavailable, then use the same port in the backend issuer and frontend Keycloak URL.

The bootstrap login is intentionally temporary. In the **master** realm, create a separate permanent administrator, set a permanent password, and assign the `realm-admin` client role from the `realm-management` client. Verify that account in a private browser window before deleting the bootstrap user. A user created only in the `school-system` realm cannot administer Keycloak itself.

The realm import creates:

- Realm: `school-system`
- Public SPA client: `school-system-frontend`
- Bearer-only API audience: `school-system-api`
- Realm roles: `platform_admin`, `admin`, `teacher`, `staff`, `parent`, and `student`
- Self-registration, brute-force protection, strong passwords, and short-lived access tokens
- A `school_id` token mapper used by the API for tenant isolation

New self-registered accounts receive the school `admin` role and are isolated to a tenant based on their Keycloak user ID. The global `platform_admin` role is never assigned by default and is only required for editing public plans or marketing content.

To add a teacher, member of staff, parent, or student to an existing school:

1. Sign in as the school owner and read `schoolId` from `GET /api/users/me`.
2. In Keycloak, open the new user and set the user attribute `school_id` to that value.
3. Assign the appropriate realm role and remove any role that does not apply.
4. Have the user sign out and back in so Keycloak issues a token containing the new role and school claim.

Automated forgotten-password email is disabled until SMTP is configured in Keycloak. An administrator can still open **Users → Credentials → Reset password**. Configure SMTP under **Realm settings → Email**, test the connection, and only then enable **Forgot password** under the realm login settings.

Stop the stack without deleting its database:

```sh
npm run keycloak:down
```

Use `npm run keycloak:up` when Keycloak should run in the background without the API.

If the local database credential is accidentally exposed, rotate it and recreate the development containers without deleting data:

```sh
CONFIRM_KEYCLOAK_ROTATION=yes npm run keycloak:rotate-secrets
```

This does not change an existing Keycloak administrator's login password. Change that separately from the administrator account's **Credentials** tab.

## Existing development realm

Keycloak does not overwrite an existing realm when `--import-realm` starts against a persistent database. If the `school-system` realm already exists, mirror these settings in the Admin Console: make `admin` the default role, add the optional `platform_admin` role, disable forgotten-password email until SMTP works, and add the `school-id` user-attribute mapper to `school-system-frontend` with token claim name `school_id`.

Existing MongoDB records must be assigned to a school before tenant-scoped APIs can see them. For a database that currently contains one school only:

```sh
MIGRATION_SCHOOL_ID=<schoolId-from-api-or-keycloak> npm run migrate:auth
```

The migration also removes legacy password, login-attempt, and lock fields. Back up the database first. A database already containing multiple schools needs a school-specific migration instead.

## Production notes

The Compose stack uses Keycloak development mode and must not be exposed as a production deployment. For production, configure TLS and a production hostname, use secret management, back up PostgreSQL, configure SMTP for password-recovery email, disable development mode, and replace the localhost redirect URIs and web origins in the client configuration.
