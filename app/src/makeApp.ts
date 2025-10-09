import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import fastify from "fastify";
import graphql from "./graphql";
import web from "./web";

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
   * Setup HTTP Routes
   */
  await app.register(fastifyAutoload, {
    dir: path.resolve("./src/routes"),
    ignorePattern: /\.spec\.ts$/,
  });

  /**
   * Setup GraphQL API
   */
  await app.register(graphql);

  /**
   * Setup Web Server (React Router)
   */
  await app.register(web);

  /**
   * Waiting for fastify plugins to be ready
   */
  await app.ready();

  return app;
}
