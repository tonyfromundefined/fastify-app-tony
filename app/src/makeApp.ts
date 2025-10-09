import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import fastify from "fastify";
import graphql from "./graphql";

export async function makeApp() {
  /**
   * Setup Fastify
   */
  const app = fastify();

  /**
   * Setup Plugins
   */
  await app.register(fastifyAutoload, {
    dir: path.resolve("./src/plugins"),
    ignorePattern: /\.spec\.ts$/,
    maxDepth: 1,
  });

  /**
   * Setup Routes
   */
  await app.register(fastifyAutoload, {
    dir: path.resolve("./src/routes"),
    ignorePattern: /\.spec\.ts$/,
  });

  /**
   * Setup GraphQL API
   */
  app.register(graphql);

  /**
   * Waiting for Fastify Plugins...
   */
  await app.ready();

  return app;
}
