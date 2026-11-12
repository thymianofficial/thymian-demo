# Space Launch System API

An HTTP API managing space missions, astronauts, rocket launches, and crew assignments. Built with Fastify and SQLite, this project serves as a demo application for [Thymian](https://github.com/thymianofficial/thymian) -- an API testing tool.

> Looking for the project without the Thymian setup? Switch to [this branch](https://github.com/thymianofficial/thymian-demo/tree/main).

## Prerequisites

- Node.js 18 or higher
- npm 8 or higher

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm start
```

For development with auto-reload and pretty-printed logs:

```bash
npm run dev
```

The server starts on `http://localhost:3000`.

### Running Thymian

On this branch Thymian is already set up. So just follow these steps:

#### 1. Running the dev server

```bash 
npm run dev
```

#### 2. Check if every transaction can be executed

```bash 
npx thymian sampler check
```

#### 3. Running thymian test

```bash 
npx thymian test
```

#### How it is set up

Thymian builds a request for every transaction in `openapi.yaml` on each run. The
hooks under `.thymian/sampler/hooks/` shape those requests so each one reaches the
status code the description declares:

- `identities.ts` — the seed astronauts the hooks sign in as: Sarah (Commander), Emily
  (a second Commander) and John (Pilot)
- `auth.ts` — signs every secured request in as Sarah
- `astronauts.ts`, `launches.ts` — the data and identities each transaction needs

`.thymian/sampler/generated/` holds the hook types generated from `openapi.yaml`. After
changing the description, regenerate them and type-check the hooks:

```bash
npx thymian sampler sync
npx thymian sampler validate
```

### Custom Rules and Their Tests

`rules/` holds two rules from the Space Launch System's own API guidelines. Both run in
all three contexts, and the demo API breaks both:

- `space-api/created-responses-have-location`: a `201 Created` response must name the new
  resource in a `Location` header.
- `space-api/client-errors-are-problem-json`: a `4xx` response must be
  `application/problem+json`.

`thymian.config.yaml` loads them through the rule set `rules/index.ts`, so `npx thymian lint`
and `npx thymian test` report them next to the RFC 9110 rules. Each rule is tested with
[`@thymian/rules-testing`](https://thymian.dev/guides/http-rules/testing-rules/), which runs
it through the real linter, tester and analyzer:

```bash
npm run test:rules        # vitest
npm run typecheck:rules   # tsc over rules/
```

```
rules/
  index.ts                                   # the rule set: every *.rule.ts next to it
  created-responses-have-location.rule.ts
  created-responses-have-location.test.ts
  client-errors-are-problem-json.rule.ts
  client-errors-are-problem-json.test.ts
  test-support/space-api.ts                  # builds the described Transactions
```

#### Installing an unreleased Thymian

`@thymian/rules-testing` is not released yet. This branch installs Thymian
`0.4.0-rules-testing.0`, built from the top of the `rules-testing` stack in the
Thymian repo (branch `mk/707-document-observed-lists`), from a local
[Verdaccio](https://verdaccio.org) registry. `.npmrc` points npm there. To set it up:

```bash
# in the thymian repo, on mk/707-document-observed-lists
npm install
npm run local-registry                    # keeps running; use a second terminal
npx nx sync                               # the stack's TypeScript references are out of sync
npm run local-publish -- --dist-tag latest --version 0.4.0-rules-testing.0
git checkout -- .                         # the publish versions every package.json

# here
npm install
```

The lockfile keeps no registry URLs. If `npm install` fails with `EINTEGRITY`, your
build of Thymian differs from the one the lockfile recorded: delete `package-lock.json`
and `node_modules`, and install again.

### Environment Variables

| Variable      | Default  | Description                                                                                         |
| ------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `PORT`        | `3000`   | Server listening port                                                                               |
| `SQLITE_MODE` | `MEMORY` | `MEMORY` for in-memory (data lost on restart) or `FILE` for persistent storage (`space_mission.db`) |

Example with persistent database:

```bash
SQLITE_MODE=FILE npm start
```

## API Documentation

Once the server is running:

- **Swagger UI:** `http://localhost:3000/documentation`
- **OpenAPI JSON:** `http://localhost:3000/documentation/json`

The API is defined in `openapi.yaml` (OpenAPI 3.0.3) and loaded statically.

## API Endpoints

### Astronauts (`/astronauts`)

| Method | Path               | Auth | Description                                                |
| ------ | ------------------ | ---- | ---------------------------------------------------------- |
| GET    | `/astronauts`      | Yes  | List all astronauts (supports `limit`/`offset` pagination) |
| POST   | `/astronauts`      | No   | Create a new astronaut                                     |
| GET    | `/astronauts/{id}` | Yes  | Get astronaut by ID                                        |
| PUT    | `/astronauts/{id}` | Yes  | Update astronaut (self-only)                               |
| DELETE | `/astronauts/{id}` | Yes  | Delete astronaut (self-only)                               |

### Launches (`/launches`)

| Method | Path                          | Auth | Description                           |
| ------ | ----------------------------- | ---- | ------------------------------------- |
| GET    | `/launches`                   | No   | List all launches                     |
| POST   | `/launches`                   | Yes  | Create a launch (Commander role only) |
| GET    | `/launches/{id}`              | Yes  | Get launch by ID                      |
| PUT    | `/launches/{id}`              | Yes  | Update launch (creator only)          |
| DELETE | `/launches/{id}`              | Yes  | Delete launch (creator only)          |
| GET    | `/launches/{id}/crew-members` | Yes  | List crew members for a launch        |
| POST   | `/launches/{id}/crew-members` | Yes  | Add crew member (Commander role only) |

### Rocket Types (`/rocket_types`)

| Method | Path            | Auth | Description           |
| ------ | --------------- | ---- | --------------------- |
| GET    | `/rocket_types` | No   | List all rocket types |

## Authentication

The API uses HTTP Basic Authentication. Credentials are validated against the astronaut table (email + password).

Sample credentials (Commander role):

- **Email:** `sarah.mitchell@space.org`
- **Password:** `starlight`

Only astronauts with the **Commander** role can create launches and assign crew members.

## Database

SQLite via `better-sqlite3`. The database is automatically initialized with schema and seed data on first startup (see `src/init.sql`).

Seed data includes 5 rocket types, 4 roles, 10 astronauts, and 10 launches with crew assignments.

## Project Structure

```
src/
  index.ts              # Entry point -- starts the server
  server.ts             # Server builder -- registers plugins and Swagger
  init.sql              # Database schema and seed data
  plugins/
    db.ts               # SQLite database plugin
    auth.ts             # HTTP Basic Auth plugin
    astronauts.ts       # Astronaut CRUD routes
    launches.ts         # Launch CRUD + crew management routes
    rocket_types.ts     # Rocket types route
rules/                  # custom Thymian rules and their tests
openapi.yaml            # OpenAPI 3.0.3 specification
```

## Tech Stack

- **[Fastify](https://fastify.dev/)** -- web framework
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** -- SQLite database
- **[tsx](https://github.com/privatenumber/tsx)** -- TypeScript execution (no build step)
- **[@fastify/swagger](https://github.com/fastify/fastify-swagger)** + **[@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)** -- API documentation
- **[@fastify/basic-auth](https://github.com/fastify/fastify-basic-auth)** -- authentication
- **[Thymian](https://github.com/thymianofficial/thymian)** -- API testing (dev dependency)
