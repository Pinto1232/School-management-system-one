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
NUXT_PUBLIC_API_BASE=http://localhost:3001/api
NUXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

The API paths used by the previous frontend are preserved, including authentication, website content, packages, and user management. Safe sample data keeps dashboard sections usable when an endpoint is unavailable during local frontend development.

The frontend is Nuxt-only; legacy React source and Vite configuration have been removed.
