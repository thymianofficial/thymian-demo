import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';

const rocketTypesPlugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify) => {
  const rocketTypeSchema = {
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    },
  } as const;

  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: rocketTypeSchema,
          },
        },
      },
    },
    async () => {
      const stmt = fastify.db.prepare<
        never[],
        {
          id: number;
          name: string;
        }
      >('SELECT id, name FROM rocket_type');
      return stmt.all();
    },
  );
};

export default rocketTypesPlugin;
