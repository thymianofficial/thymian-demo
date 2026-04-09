import fp from 'fastify-plugin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import SqliteDb, { Database } from 'better-sqlite3';
import { readFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
  }
}

export default fp(async (fastify) => {
  const location =
    process.env.SQLITE_MODE === 'FILE'
      ? join(__dirname, '../../space_mission.db')
      : ':memory:';

  const db = new SqliteDb(location);

  const tableName = 'astronaut';
  const stmt = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
  );
  const row = stmt.get(tableName);

  if (!row) {
    fastify.log.info('Initializing database...');
    db.exec(
      await readFile(join(__dirname, '..', 'init.sql'), {
        encoding: 'utf8',
      }),
    );
  } else {
    fastify.log.info(
      'Database already initialized. Skipping initialization...',
    );
  }

  fastify.decorate('db', db);
});
