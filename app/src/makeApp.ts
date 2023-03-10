import FastifyCookie from "@fastify/cookie";
import FastifyCors from "@fastify/cors";
import FastifyMiddie from "@fastify/middie";
import Fastify from "fastify";

import { env } from "./env";
import { setupClient } from "./setupClient";

export async function makeApp() {
  /**
   * Setup Fastify and Plugins
   */
  const app = Fastify();

  await app.register(FastifyMiddie);
  await app.register(FastifyCors, {
    preflightContinue: true,
  });
  await app.register(FastifyCookie, {
    secret: env.cookieSecret,
    hook: "onRequest",
  });

  /**
   * Health Check Endpoint
   */
  app.route({
    url: "/healthz",
    method: "GET",
    handler() {
      return {
        ok: true,
      };
    },
  });

  /**
   * Setup React Client (Single Page Application)
   *
   * GET  /*
   * GET  /assets/*
   */
  await setupClient(app);

  /**
   * Waiting for Fastify Plugins...
   */
  await app.ready();

  return app;
}
