import FastifyGracefulShutdown from "fastify-graceful-shutdown";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    await app.register(FastifyGracefulShutdown);
  },
  { name: "app.gracefulShutdown" },
);
