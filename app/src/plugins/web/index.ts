import { reactRouterFastify } from "@mcansh/remix-fastify/react-router";
import type {
  FastifyInstance,
  FastifyRequest,
  RawServerBase,
  RouteGenericInterface,
} from "fastify";
import fp from "fastify-plugin";

declare module "react-router" {
  interface AppLoadContext {
    app: FastifyInstance;
    req: FastifyRequest<RouteGenericInterface, RawServerBase>;
  }
}

export default fp(
  async (app) => {
    await app.register(reactRouterFastify, {
      buildDirectory: "./dist/plugins/web",
      async getLoadContext(req) {
        return { app, req };
      },
    });
  },
  {
    name: "web",
    dependencies: ["app.env", "app.gracefulShutdown"],
  },
);
