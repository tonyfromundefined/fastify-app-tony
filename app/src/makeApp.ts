import FastifyCookie from "@fastify/cookie";
import FastifyCors from "@fastify/cors";
import FastifyMiddie from "@fastify/middie";
import Fastify from "fastify";
import { MongoClient } from "mongodb";

import { env } from "./env";
import { makeUserRepository } from "./repositories";
import { setupClient } from "./setupClient";
import { setupGraphQLApi } from "./setupGraphQLApi";
import { setupRestfulApi } from "./setupRestfulApi";

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
   * Setup GraphQL API
   *
   * GET  /graphiql
   * POST /graphql
   */
  await setupGraphQLApi(app, {
    userRepository,
  });

  /**
   * Setup RESTful API
   *
   * GET  /api/*
   */
  await setupRestfulApi(app);

  /**
   * Waiting for Fastify Plugins...
   */
  await app.ready();

  return app;
}
