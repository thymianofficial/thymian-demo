import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';

const launchesPlugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify) => {
  // Schemas
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

  const launchInputSchema = {
    type: 'object',
    required: ['mission_name', 'launch_date', 'rocket_type_id', 'is_manned'],
    properties: {
      mission_name: { type: 'string' },
      launch_date: { type: 'string', format: 'date' },
      rocket_type_id: { type: 'integer' },
      is_manned: { type: 'boolean', default: false },
    },
  } as const;

  const launchSchema = {
    type: 'object',
    required: [
      'id',
      'mission_name',
      'launch_date',
      'rocket_type_id',
      'is_manned',
      'created_by',
    ],
    properties: {
      id: { type: 'integer' },
      mission_name: { type: 'string' },
      launch_date: { type: 'string' },
      rocket_type_id: { type: 'integer' },
      is_manned: { type: 'boolean' },
      created_by: astronautSchema,
    },
  } as const;

  // GET /launches
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: launchSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const stmt = fastify.db.prepare<
        [],
        {
          id: number;
          mission_name: string;
          launch_date: string;
          rocket_type_id: number;
          is_manned: number;
          creator_id: number;
          creator_name: string;
          creator_email: string;
          creator_role_id: number;
        }
      >(`
        SELECT
          l.id,
          l.mission_name,
          l.launch_date,
          l.rocket_type_id,
          l.is_manned,
          a.id as creator_id,
          a.name as creator_name,
          a.email as creator_email,
          a.role_id as creator_role_id
        FROM launch l
        JOIN astronaut a ON l.created_by = a.id
      `);
      const launches = stmt.all();

      return launches.map((launch) => ({
        id: launch.id,
        mission_name: launch.mission_name,
        launch_date: launch.launch_date,
        rocket_type_id: launch.rocket_type_id,
        is_manned: Boolean(launch.is_manned),
        created_by: {
          id: launch.creator_id,
          name: launch.creator_name,
          email: launch.creator_email,
          role_id: launch.creator_role_id,
        },
      }));
    },
  );

  fastify.post(
    '/',
    {
      onRequest: fastify.basicAuth,
      schema: {
        body: launchInputSchema,
        response: {
          201: launchSchema,
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
        },
      },
    },
    async (request, reply) => {
      const { mission_name, launch_date, rocket_type_id, is_manned } =
        request.body;

      if (request.user?.role !== 'Commander') {
        reply.code(403);
        return { error: 'Unauthorized to create this launch' };
      }

      const stmt = fastify.db.prepare(
        'INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES (?, ?, ?, ?, ?)',
      );

      const result = stmt.run(
        mission_name,
        launch_date,
        rocket_type_id,
        is_manned ? 1 : 0,
        request.user!.id,
      );

      reply.code(201);
      return {
        id: result.lastInsertRowid,
        mission_name,
        launch_date,
        rocket_type_id,
        is_manned,
        created_by: {
          id: request.user!.id,
          name: request.user!.name,
          email: request.user!.email,
          role_id: request.user!.role_id,
        },
      };
    },
  );

  // GET /launches/:id
  fastify.get(
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
        } as const,
        response: {
          200: launchSchema,
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
      const stmt = fastify.db.prepare<
        [number],
        {
          id: number;
          mission_name: string;
          launch_date: string;
          rocket_type_id: number;
          is_manned: number;
          creator_id: number;
          creator_name: string;
          creator_email: string;
          creator_role_id: number;
        }
      >(`
        SELECT
          l.id,
          l.mission_name,
          l.launch_date,
          l.rocket_type_id,
          l.is_manned,
          a.id as creator_id,
          a.name as creator_name,
          a.email as creator_email,
          a.role_id as creator_role_id
        FROM launch l
        JOIN astronaut a ON l.created_by = a.id
        WHERE l.id = ?
      `);
      const launch = stmt.get(id);

      if (!launch) {
        reply.code(404);
        return { error: 'Launch not found' };
      }

      return {
        id: launch.id,
        mission_name: launch.mission_name,
        launch_date: launch.launch_date,
        rocket_type_id: launch.rocket_type_id,
        is_manned: Boolean(launch.is_manned),
        created_by: {
          id: launch.creator_id,
          name: launch.creator_name,
          email: launch.creator_email,
          role_id: launch.creator_role_id,
        },
      };
    },
  );

  // PUT /launches/:id
  fastify.put(
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
        } as const,
        body: launchInputSchema,
        response: {
          200: launchSchema,
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
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { mission_name, launch_date, rocket_type_id, is_manned } =
        request.body as any;

      // Check if launch exists
      const checkStmt = fastify.db.prepare<[number], { created_by: number }>(
        'SELECT created_by FROM launch WHERE id = ?',
      );
      const launch = checkStmt.get(id);

      if (!launch) {
        reply.code(404);
        return { error: 'Launch not found' };
      }

      // Only creator can update launch
      if (launch.created_by !== request.user!.id) {
        reply.code(403);
        return { error: 'Unauthorized to update this launch' };
      }

      const stmt = fastify.db.prepare(
        'UPDATE launch SET mission_name = ?, launch_date = ?, rocket_type_id = ?, is_manned = ? WHERE id = ?',
      );
      stmt.run(
        mission_name,
        launch_date,
        rocket_type_id,
        is_manned ? 1 : 0,
        id,
      );

      return {
        id: Number(id),
        mission_name,
        launch_date,
        rocket_type_id,
        is_manned,
        created_by: {
          id: request.user!.id,
          name: request.user!.name,
          email: request.user!.email,
          role_id: request.user!.role_id,
        },
      };
    },
  );

  // DELETE /launches/:id
  fastify.delete(
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
        } as const,
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

      const readStmt = fastify.db.prepare<[number], { created_by: number }>(
        'SELECT created_by FROM launch WHERE id = ?',
      );
      const launch = readStmt.get(id);
      if (!launch) {
        reply.code(404);
        return { error: 'Launch not found' };
      }

      // Only creator can delete launch
      if (launch.created_by !== request.user?.id) {
        reply.code(403);
        return { error: 'Unauthorized to delete this launch' };
      }

      const stmt = fastify.db.prepare<[number]>(
        'DELETE FROM launch WHERE id = ?',
      );
      stmt.run(id);

      reply.code(204);
      return;
    },
  );

  // GET /launches/:id/crew-members
  fastify.get(
    '/:id/crew-members',
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

      // Check if launch exists
      const launchStmt = fastify.db.prepare<[number], { id: number }>(
        'SELECT id FROM launch WHERE id = ?',
      );
      const launch = launchStmt.get(id);

      if (!launch) {
        reply.code(404);
        return { error: 'Launch not found' };
      }

      const stmt = fastify.db.prepare<
        [number],
        {
          id: number;
          name: string;
          email: string;
          role_id: number;
        }
      >(`
        SELECT a.id, a.name, a.email, a.role_id
        FROM astronaut a
        JOIN crew_member cm ON a.id = cm.astronaut_id
        WHERE cm.launch_id = ?
      `);

      return stmt.all(id);
    },
  );

  // POST /launches/:id/crew-members
  fastify.post(
    '/:id/crew-members',
    {
      onRequest: fastify.basicAuth,
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        } as const,
        body: {
          type: 'object',
          required: ['astronaut_id'],
          additionalProperties: false,
          properties: {
            astronaut_id: { type: 'integer' },
          },
        } as const,
        response: {
          201: { type: 'null' },
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
      const { astronaut_id } = request.body;

      if (request.user?.role !== 'Commander') {
        reply.code(403);
        return { error: 'Unauthorized to add this astronaut to this launch' };
      }

      // Check if launch exists
      const launchStmt = fastify.db.prepare<[number], { id: number }>(
        'SELECT id FROM launch WHERE id = ?',
      );
      const launch = launchStmt.get(id);

      if (!launch) {
        reply.code(404);
        return { error: 'Launch not found' };
      }

      // Check if astronaut exists
      const astronautStmt = fastify.db.prepare<[number], { id: number }>(
        'SELECT id FROM astronaut WHERE id = ?',
      );
      const astronaut = astronautStmt.get(astronaut_id);

      if (!astronaut) {
        reply.code(400);
        return { error: 'Invalid input' };
      }

      // Check if astronaut is already assigned
      const checkStmt = fastify.db.prepare<[number, number], { id: number }>(
        'SELECT id FROM crew_member WHERE astronaut_id = ? AND launch_id = ?',
      );
      const existing = checkStmt.get(astronaut_id, id);

      if (existing) {
        reply.code(409);
        return { error: 'Astronaut already assigned to this launch' };
      }

      const stmt = fastify.db.prepare<[number, number]>(
        'INSERT INTO crew_member (astronaut_id, launch_id) VALUES (?, ?)',
      );
      stmt.run(astronaut_id, id);

      reply.code(201);
      return;
    },
  );
};

export default launchesPlugin;
