import { buildServer } from './server';

async function start() {
  const server = await buildServer();

  try {
    const port = process.env.PORT ?? 3000;
    await server.listen({ port: Number(port), host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
