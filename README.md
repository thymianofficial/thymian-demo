# Space Launch System API

An HTTP API managing space missions, astronauts, rocket launches, and crew assignments. Built with Fastify and SQLite, this project serves as a demo application for [Thymian](https://github.com/thymianofficial/thymian) -- an API testing tool.

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
openapi.yaml            # OpenAPI 3.0.3 specification
```

## Tech Stack

- **[Fastify](https://fastify.dev/)** -- web framework
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** -- SQLite database
- **[tsx](https://github.com/privatenumber/tsx)** -- TypeScript execution (no build step)
- **[@fastify/swagger](https://github.com/fastify/fastify-swagger)** + **[@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)** -- API documentation
- **[@fastify/basic-auth](https://github.com/fastify/fastify-basic-auth)** -- authentication
- **[Thymian](https://github.com/thymianofficial/thymian)** -- API testing (dev dependency)
