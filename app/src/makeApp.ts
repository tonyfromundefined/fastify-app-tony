import path from "node:path";
import FastifyAutoLoad from "@fastify/autoload";
import FastifyCookie from "@fastify/cookie";
import FastifyCors from "@fastify/cors";
import Fastify from "fastify";
import { env } from "./env";

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
   * Setup Cookie
   */
  await app.register(FastifyCookie, {
    hook: "onRequest",
    secret: env.cookieSecret,
  });

  /**
   * Setup Plugins
   */
  await app.register(FastifyAutoLoad, {
    dir: path.resolve("./src/plugins"),
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
