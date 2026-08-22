# School System

School System is a full-stack platform for school administration, teaching, learning, and family communication. The frontend is built with Vue 3 and Nuxt 4 and connects to the existing Express and MongoDB backend.

## Features

- Keycloak-backed registration, login, logout, password administration, and SSO
- Role-aware dashboard navigation
- Student, teacher, staff, and parent workspaces
- Courses, lesson planning, assignments, attendance, and grading
- Admissions, fees, events, announcements, reports, tasks, and timetables
- Public website content and package plans served by the existing API
- Responsive light and dark themes

## Requirements

- Node.js 22 or later
- npm
- MongoDB
- Docker Desktop or another Docker-compatible engine for local Keycloak

## Run locally

Install the backend dependencies and start the local services:

```sh
cd backend
npm install
npm run dev
```

This single development command generates private local credentials when needed and starts both the Express API and the Keycloak/PostgreSQL stack. The Keycloak admin console is available at `http://localhost:8081/admin/`. The imported realm is `school-system`; self-registered school owners receive the tenant-scoped `admin` role. Other users need their realm role and the school's `school_id` user attribute configured in Keycloak.

To run only the backend API without Keycloak:

```sh
cd backend
npm run dev:api
```

In a second terminal, install and start the Nuxt frontend:

```sh
cd frontend
npm install
npm run dev
```

The frontend runs at `http://127.0.0.1:3000`, expects the API at `http://localhost:3001/api`, and connects to Keycloak at `http://localhost:8081` by default. Copy the backend and frontend `.env.example` files when those defaults need to be changed.

## Project structure

```text
backend/                 Express API and MongoDB models
  keycloak/              Realm import and local identity configuration
  docker-compose.keycloak.yml
frontend/
  app/
    assets/              Global Nuxt styles
    components/          Public, authentication, and dashboard components
    composables/         API, authentication, and theme state
    data/                Navigation and safe fallback content
    layouts/             Public and authenticated layouts
    middleware/          Dashboard authentication guard
    pages/               File-based Nuxt routes
    types/               Shared TypeScript interfaces
  public/                Static images and site assets
  nuxt.config.ts         Nuxt runtime and module configuration
```

## Frontend checks

```sh
cd frontend
npm run typecheck
npm run build
```

## License

Pisval Tech License.
