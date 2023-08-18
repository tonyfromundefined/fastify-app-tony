import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import type { FastifyInstance } from "fastify";
import { fastifyTRPCOpenApiPlugin } from "trpc-openapi";
import { dedent } from "ts-dedent";

import { makeAppRouter, makeOpenApiSpecification } from "./api-trpc";
import type { CreateContext } from "./api-trpc/trpc";
import type { UserRepository } from "./core/entities/User";
import { defineContext } from "./defineContext";

const TRPC_PREFIX = "/trpc";
const API_PREFIX = "/api";

export async function setupTrpcApi(
  app: FastifyInstance,
  {
    userRepository,
  }: {
    userRepository: UserRepository;
  },
) {
  /**
   * Setup tRPC Endpoints
   */
  const appRouter = makeAppRouter();

  const createContext: CreateContext = async () => {
    return defineContext({
      repositories: {
        user: userRepository,
      },
    });
  };

  await app.register(fastifyTRPCPlugin, {
    prefix: TRPC_PREFIX,
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });

  /**
   * Setup REST API Endpoints
   */
  await app.register(fastifyTRPCOpenApiPlugin, {
    prefix: API_PREFIX,
    router: appRouter,
    createContext,
  });

  /**
   * OpenAPI Specification
   * https://swagger.io/specification/
   */
  app.route({
    method: "GET",
    url: `${API_PREFIX}/spec.json`,
    handler(req) {
      const protocol = req.headers["x-forwarded-proto"] ?? req.protocol;
      const hostname = req.headers["x-forwarded-host"] ?? req.hostname;

      const origin = `${protocol}://${hostname}${API_PREFIX}`;

      const openapiSpecification = makeOpenApiSpecification({
        baseUrl: origin,
        appRouter,
      });

      return openapiSpecification;
    },
  });

  /**
   * API Documentation using Stoplight Elements
   * https://stoplight.io/open-source/elements
   */
  app.route({
    method: "GET",
    url: `${API_PREFIX}/docs`,
    handler(req, reply) {
      /**
       * https://github.com/stoplightio/elements#web-component
       */
      const html = dedent`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>fastify-app-tony API Docs</title>
            <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
            <style>html, body { height: 100%; }</style>
          </head>
          <body>
            <elements-api
              apiDescriptionUrl="${API_PREFIX}/spec.json"
              router="hash"
              layout="sidebar"
            />
          </body>
        </html>
      `;

      reply.header("Content-Type", "text/html");
      reply.send(html);
    },
  });
}
