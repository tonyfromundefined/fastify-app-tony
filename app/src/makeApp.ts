import FastifyCookie from "@fastify/cookie";
import FastifyCors from "@fastify/cors";
import FastifyMiddie from "@fastify/middie";
import Fastify from "fastify";
import { MongoClient } from "mongodb";

import { env } from "./env";
import { makeUserRepository } from "./repositories";
import { setupClient } from "./setupClient";
import { setupGraphQLApi } from "./setupGraphQLApi";
import { setupTrpcApi } from "./setupTrpcApi";

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
    hook: "onRequest",
    secret: env.cookieSecret,
  });

  /**
   * Prepare MongoDB
   */
  const mongoClient = new MongoClient(env.mongo.endpoint);
  const db = mongoClient.db(env.mongo.dbName);

  /**
   * Prepare Repositories
   */
  const userRepository = makeUserRepository({ db });

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
   * Setup React Client (Single Page Application)
   *
   * GET  /*
   * GET  /assets/*
   */
  await setupClient(app);

  /**
   * Setup GraphQL API
   *
   * GET  /graphiql
   * POST /graphql
   */
  await setupGraphQLApi(app, {
    userRepository,
  });

  /**
   * Setup tRPC API
   *
   * GET  /api/*
   * GET  /api/spec.json
   * GET  /api/docs
   */
  await setupTrpcApi(app, {
    userRepository,
  });

  /**
   * Waiting for Fastify Plugins...
   */
  await app.ready();

  return app;
}
