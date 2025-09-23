Junie Guidelines: Project Structure and Conventions

Overview
- This repository is a NestJS-based REST API service.
- Jest is used for unit and e2e testing.
- Data persistence will use Sequelize ORM with a SQLite database.

Current Project Structure (root)
- README.md — Project overview and setup instructions.
- eslint.config.mjs — ESLint configuration.
- nest-cli.json — Nest CLI configuration (sourceRoot: src).
- node_modules/ — Installed dependencies (auto-generated).
- package.json — Project metadata, scripts, Jest config.
- package-lock.json — NPM lockfile.
- src/ — Application source code.
- test/ — End-to-end tests (Jest + Supertest).
- tsconfig.json — TypeScript configuration for development.
- tsconfig.build.json — TypeScript configuration for build output.

Current src/ contents
- src/main.ts — Application bootstrap; starts Nest HTTP server on PORT (default 3000).
- src/app.module.ts — Root application module; place global imports/providers here.
- src/app.controller.ts — Example controller exposing GET / route.
- src/app.service.ts — Example service used by the controller.

Current test/ contents
- test/app.e2e-spec.ts — Example E2E test verifying GET / returns "Hello World!" using Supertest.

REST API Conventions
- Controllers reside under src/modules/<feature>/<feature>.controller.ts and define HTTP routes.
- Services reside under src/modules/<feature>/<feature>.service.ts and encapsulate business logic.
- Modules group related controllers/services under src/modules/<feature>/<feature>.module.ts and are imported by AppModule.
- DTOs and validation can be placed alongside modules under src/modules/<feature>/dto/*.ts.
- Common/shared utilities can go under src/common/ (e.g., filters, interceptors, pipes).

Testing (Jest)
- Unit tests: colocate as *.spec.ts near the unit under test (e.g., src/**/__tests__/* or src/**/*.spec.ts).
- E2E tests: live in test/ and use Supertest against a Nest application instance (see test/app.e2e-spec.ts).
- Commands (from package.json):
  - npm test — run all tests.
  - npm run test:watch — run tests in watch mode.
  - npm run test:cov — run tests with coverage.
  - npm run test:e2e — run end-to-end tests with the e2e Jest config.

ORM and Database (Sequelize + SQLite)
- ORM: Sequelize will be used with a SQLite database file for local development and testing.
- Recommended structure for ORM integration:
  - src/database/
    - database.module.ts — Exposes the Sequelize instance/connection.
    - sequelize.config.ts — Centralized configuration (dialect: 'sqlite', storage path, logging settings).
  - src/modules/<feature>/entities/
    - <Entity>.model.ts — Sequelize model definitions (init attributes, associations).
  - src/migrations/ — Sequelize migrations (if using sequelize-cli or custom runner).
  - src/seeders/ — Seed data scripts (optional).
- Environment/configuration:
  - Use environment variables to configure DB file path and logging, e.g.,
    - DATABASE_FILE=./data/dev.sqlite
    - NODE_ENV=development|test|production
    - PORT=3000
  - For tests, use a separate SQLite file (e.g., ./data/test.sqlite) or in-memory storage (:memory:), configured in Jest setup.
- Initialization (to be implemented):
  - Create and export a Sequelize instance configured for SQLite in src/database/sequelize.config.ts.
  - Provide it via a DatabaseModule and inject into modules that require database access.
  - Define models under src/modules/*/entities and register them with Sequelize before app bootstrap.

Build and Run
- Development: npm run start:dev (watches for changes).
- Production: npm run build then npm run start:prod (runs dist/main.js).
- Linting/format: npm run lint; npm run format.

Future Additions Checklist (for Sequelize + SQLite)
- Add sequelize and sqlite3 packages (and @types where helpful for TS typings).
- Create src/database/sequelize.config.ts and src/database/database.module.ts.
- Decide on model organization (central registry or per-module registration) and implement associations.
- Optionally integrate sequelize-typescript for decorator-based models (if desired).
- Configure migrations/seeders if needed, and document how to run them.

Notes
- Keep controllers thin; place logic in services.
- Validate all incoming request DTOs and handle exceptions with global filters as needed.
- Maintain a clear module structure for each feature of the REST API.
