import Fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';
import db from './plugins/db.js';
import launchesPlugin from './plugins/launches';
import astronautsPlugin from './plugins/astronauts';
import rocketTypesPlugin from './plugins/rocket_types';
import auth from './plugins/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function buildServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: true,
  });

  // Read OpenAPI spec from root directory
  const openapiPath = join(__dirname, '../', 'openapi.yaml');
  const openapiContent = readFileSync(openapiPath, 'utf-8');
  const openapiSpec = parse(openapiContent);

  // Register Swagger with the OpenAPI spec
  await fastify.register(fastifySwagger, {
    mode: 'static',
    specification: {
      document: openapiSpec,
    },
  });

  // Register Swagger UI
  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });

  fastify
    .register(db)
    .register(auth)
    .register(launchesPlugin, {
      prefix: '/launches',
    })
    .register(astronautsPlugin, {
      prefix: '/astronauts',
    })
    .register(rocketTypesPlugin, {
      prefix: '/rocket_types',
    });

  return fastify;
}
