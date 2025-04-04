import path from "node:path";
import FastifyAutoLoad from "@fastify/autoload";
import FastifyCors from "@fastify/cors";
import Fastify from "fastify";

export async function makeApp() {
  /**
   * Setup Fastify and Plugins
   */
  const app = Fastify();

  /**
   * Setup CORS
   */
  await app.register(FastifyCors, {
    preflightContinue: true,
  });

  /**
   * Setup Plugins
   */
  await app.register(FastifyAutoLoad, {
    dir: path.resolve("./src/plugins"),
    maxDepth: 1,
  });

  /**
   * Health Check Endpoint
   */
  app.route({
    handler: () => ({
      ok: true,
    }),
    method: "GET",
    url: "/healthz",
  });

  /**
   * Waiting for Fastify Plugins...
   */
  await app.ready();

  return app;
}
