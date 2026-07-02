# HireTrack

HireTrack is a production-style backend API for tracking job applications, companies, interviews, documents and follow-up reminders.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma
- JWT Authentication
- Docker
- Redis
- BullMQ
- AWS S3
- GitHub Actions

## Project Structure

```txt
src/
  common/
  config/
  prisma/
  auth/
  users/
  companies/
  applications/
  interviews/
  documents/
  reminders/
  dashboard/
  health/
```

## Naming Convention

- Folders: kebab-case or lowercase plural
- Files: kebab-case
- Classes: PascalCase
- Variables and functions: camelCase
- Environment variables: UPPER_SNAKE_CASE

## Local Development

```bash
npm install
npm run start:dev
```

API available at:

```txt
http://localhost:3000
```

## Status

Initial project setup completed.
