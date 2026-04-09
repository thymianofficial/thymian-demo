# Fastify Implementation

This is a Fastify implementation of the Space Mission Management API.

## Prerequisites

- Node.js 18 or higher
- npm 8 or higher

## Getting Started

### Installing Dependencies

From the `implementations/node/fastify` directory, run:

```bash
npm install
```

### Running the Application

```bash
npm start
```

For development with auto-reload and pretty logs:

```bash
npm run dev
```

The application will start on `http://localhost:3000`.

#### Database Mode

The application supports two database modes controlled by the `SQLITE_MODE` environment variable:

- **`MEMORY`** (default): Uses an in-memory SQLite database. Data is lost when the application stops.
- **`FILE`**: Uses a file-based SQLite database stored in `implementations/space_mission.db`.

**Setting the Environment Variable:**

**Linux/macOS:**
```bash
# Run with in-memory database (default)
npm start

# Run with file-based database - inline
SQLITE_MODE=FILE npm start

# Or export for the session
export SQLITE_MODE=FILE
npm start
```

**Windows (CMD):**
```cmd
REM Run with in-memory database (default)
npm start

REM Run with file-based database
set SQLITE_MODE=FILE
npm start
```

**Windows (PowerShell):**
```powershell
# Run with in-memory database (default)
npm start

# Run with file-based database
$env:SQLITE_MODE="FILE"
npm start
```

## Database

The application uses SQLite and automatically initializes the database with sample data on first startup using the shared `init.sql` file from the `implementations` folder.

By default, an in-memory database is used. When using `SQLITE_MODE=FILE`, the database file `space_mission.db` will be created in the `implementations` folder, shared across all implementations.

## API Documentation

Once the application is running, you can access:

- Swagger UI: `http://localhost:3000/documentation`
- OpenAPI Spec: `http://localhost:3000/documentation/json`

The API documentation is served from the shared `openapi.yaml` file in the root folder.

## Authentication

The API uses HTTP Basic Authentication. Use the credentials from the sample data:

- Email: `sarah.mitchell@space.org`
- Password: `starlight`

## Project Structure

- `src/`
  - `plugins/` - Fastify plugins
    - `astronauts.ts` - Astronaut routes and handlers
    - `auth.ts` - Authentication plugin
    - `db.ts` - Database connection and initialization
    - `launches.ts` - Launch routes and handlers
    - `rocket_types.ts` - Rocket type routes and handlers
  - `index.ts` - Application entry point
  - `server.ts` - Server configuration and plugin registration
