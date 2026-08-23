# Nuxt frontend

This directory contains the active Vue 3 and Nuxt 4 frontend for School System.

## Commands

```sh
npm install          # Install dependencies
npm run dev          # Start Nuxt on 127.0.0.1:3000
npm run typecheck    # Validate Vue and TypeScript
npm run build        # Create the production server bundle
npm run preview      # Preview the production build
```

## Environment

Copy `.env.example` to `.env` when the backend does not use the defaults:

```env
# Public base URL of the school management backend API, including its API path prefix.
NUXT_PUBLIC_API_BASE=

# Public base URL of the backend server, used for uploaded files and images.
NUXT_PUBLIC_BACKEND_URL=

# Server-only URL of the WordPress REST endpoint that provides dashboard sidebar links.
NUXT_WORDPRESS_SIDEBAR_URL=

# Public base URL of the Keycloak authentication server.
NUXT_PUBLIC_KEYCLOAK_URL=

# Keycloak realm used by the school system.
NUXT_PUBLIC_KEYCLOAK_REALM=

# Public Keycloak client ID configured for the Nuxt frontend.
NUXT_PUBLIC_KEYCLOAK_CLIENT_ID=

# Keycloak API client/audience whose roles are included in access tokens.
NUXT_PUBLIC_KEYCLOAK_AUDIENCE=
```

Authentication uses the official Keycloak JavaScript adapter with Authorization Code flow and S256 PKCE. Public login actions open Keycloak directly, while `/login` remains an automatic handoff and retry route. Access and refresh tokens remain in memory and the access token is refreshed before protected API calls. Dashboard navigation and routes are filtered by Keycloak role, and API failures remain visible instead of being replaced with sample records.

Server state is managed with TanStack Vue Query. Query keys and options are colocated in composables, authenticated cache entries include the user identifier, mutations update the cache optimistically and roll back on failure, and public queries are dehydrated during SSR and hydrated in the browser.

The frontend is Nuxt-only; legacy React source and Vite configuration have been removed.
