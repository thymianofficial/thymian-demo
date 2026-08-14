import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';

const astronautsPlugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify) => {
  const astronautInputSchema = {
    type: 'object',
    required: ['name', 'email', 'password', 'role'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      role: {
        type: 'string',
        enum: ['Commander', 'Pilot', 'Specialist', 'PayloadMaster'],
      },
    },
  } as const;

  const astronautSchema = {
    type: 'object',
    required: ['id', 'name', 'email', 'role_id'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string' },
      role_id: { type: 'integer' },
    },
  } as const;

  fastify.get<{
    Querystring: { limit?: number; offset?: number };
  }>(
      '/',
      {
      onRequest: fastify.basicAuth,
      schema: {
        querystring: {
          type: 'object',
          properties: {
            limit: { type: 'integer', minimum: 1, default: 10 },
            offset: { type: 'integer', minimum: 0, default: 0 },
          },
        } as const,
        response: {
          200: {
            type: 'array',
            items: astronautSchema,
          },
          401: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request) => {
      const { limit, offset } = request.query;

      const stmt = fastify.db.prepare<
        [number, number],
        {
          id: number;
          name: string;
          email: string;
          role_id: number;
        }
      >('SELECT id, name, email, role_id FROM astronaut LIMIT ? OFFSET ?');
      return stmt.all(limit, offset);
    },
  );

  fastify.post(
    '/',
    {
      schema: {
        body: astronautInputSchema,
        response: {
          201: astronautSchema,
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          409: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body;

      const roleStmt = fastify.db.prepare<[string], { id: number }>(
        'SELECT id FROM role WHERE name = ?',
      );
      const roleRow = roleStmt.get(role);

      if (!roleRow) {
        reply.code(400);
        return { error: 'Invalid role' };
      }

      const emailStmt = fastify.db.prepare<[string], { id: number }>(
        'SELECT id FROM astronaut WHERE email = ?',
      );

      const emailRow = emailStmt.get(email);

      if (emailRow) {
        reply.code(409);
        return { error: 'Astronaut with this email already exists' };
      }

      const stmt = fastify.db.prepare<[string, string, string, number]>(
        'INSERT INTO astronaut (name, email, password, role_id) VALUES (?, ?, ?, ?)',
      );

      const result = stmt.run(name, email, password, roleRow.id);

      reply.code(201);
      return {
        id: result.lastInsertRowid,
        name,
        email,
        role_id: roleRow.id,
      };
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      onRequest: fastify.basicAuth,
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        },
        response: {
          200: astronautSchema,
          401: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const stmt = fastify.db.prepare(
        'SELECT id, name, email, role_id FROM astronaut WHERE id = ?',
      );
      const astronaut = stmt.get(id);

      if (!astronaut) {
        reply.code(404);
        return { error: 'Astronaut not found' };
      }

      return astronaut;
    },
  );

  fastify.put<{ Params: { id: string } }>(
    '/:id',
    {
      onRequest: fastify.basicAuth,
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        },
        body: astronautInputSchema,
        response: {
          200: astronautSchema,
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          401: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          403: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          409: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, email, password, role } = request.body as any;

      const checkStmt = fastify.db.prepare(
        'SELECT id FROM astronaut WHERE id = ?',
      );
      const exists = checkStmt.get(id);

      if (!exists) {
        reply.code(404);
        return { error: 'Astronaut not found' };
      }

      if (request.user?.id !== Number(id)) {
        reply.code(403);
        return { error: 'Unauthorized to update this astronaut' };
      }

      const roleStmt = fastify.db.prepare<[string], { id: number }>(
        'SELECT id FROM role WHERE name = ?',
      );
      const roleRow = roleStmt.get(role);

      if (!roleRow) {
        reply.code(400);
        return { error: 'Invalid role' };
      }

      const emailStmt = fastify.db.prepare<[string, number], { id: number }>(
        'SELECT id FROM astronaut WHERE email = ? AND id != ?',
      );
      const emailRow = emailStmt.get(email, +id);

      if (emailRow) {
        reply.code(409);
        return { error: 'Astronaut with this email already exists' };
      }

      const stmt = fastify.db.prepare<[string, string, string, number, number]>(
        'UPDATE astronaut SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
      );
      stmt.run(name, email, password, roleRow.id, +id);

      return {
        id: Number(id),
        name,
        email,
        role_id: roleRow.id,
      };
    },
  );

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    {
      onRequest: fastify.basicAuth,
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        },
        response: {
          204: { type: 'null' },
          401: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          403: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const readStmt = fastify.db.prepare(
        'SELECT id FROM astronaut WHERE id = ?',
      );
      const astronaut = readStmt.get(id);
      if (!astronaut) {
        reply.code(404);
        return { error: 'Astronaut not found' };
      }

      // Astronauts can only delete themselves
      if (request.user?.id !== Number(id)) {
        reply.code(403);
        return { error: 'Unauthorized to delete this astronaut' };
      }

      const stmt = fastify.db.prepare('DELETE FROM astronaut WHERE id = ?');
      stmt.run(id);

      reply.code(204);
      return;
    },
  );
};

export default astronautsPlugin;
