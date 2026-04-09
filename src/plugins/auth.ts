import fp from 'fastify-plugin';
import basicAuth from '@fastify/basic-auth';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      name: string;
      email: string;
      role_id: number;
      role: string;
    };
  }
}

export default fp(async (fastify) => {
  fastify.register(basicAuth, {
    validate: async (username, password, req, reply) => {
      const stmt = fastify.db.prepare<
        [string, string],
        {
          id: number;
          name: string;
          email: string;
          role_id: number;
          role: string;
        }
      >(
        `
            SELECT astronaut.*, role.name AS role, role.id AS role_id
            FROM astronaut 
            LEFT JOIN role ON role.id = astronaut.role_id
            WHERE email = ? AND password = ?`,
      );
      const result = stmt.get(username, password);

      if (!result) {
        return new Error('Invalid credentials');
      }

      // Attach user to request for later use
      req.user = {
        id: result.id,
        name: result.name,
        email: result.email,
        role_id: result.role_id,
        role: result.role,
      };
    },
    authenticate: true,
  });
});
