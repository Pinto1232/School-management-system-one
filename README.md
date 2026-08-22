# School System

School System is a full-stack platform for school administration, teaching, learning, and family communication. The frontend is built with Vue 3 and Nuxt 4 and connects to the existing Express and MongoDB backend.

## Features

- Account registration, login, and password recovery
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

## Run locally

Install and start the backend:

```sh
cd backend
npm install
npm start
```

In a second terminal, install and start the Nuxt frontend:

```sh
cd frontend
npm install
npm run dev
```

The frontend runs at `http://127.0.0.1:3000` and expects the API at `http://localhost:3001/api` by default. Copy `frontend/.env.example` to `frontend/.env` to override those URLs.

## Project structure

```text
backend/                 Express API and MongoDB models
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
