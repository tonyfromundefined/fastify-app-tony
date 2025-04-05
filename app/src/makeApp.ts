import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import fastify from "fastify";

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
   * Setup Plugins
   */
  await app.register(fastifyAutoload, {
    dir: path.resolve("./src/routes"),
    ignorePattern: /\.spec\.ts$/,
  });

  /**
   * Waiting for Fastify Plugins...
   */
  await app.ready();

  return app;
}
