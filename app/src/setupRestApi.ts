import type { FastifyInstance } from "fastify";
import { fastifyTRPCOpenApiPlugin } from "trpc-openapi";
import { dedent } from "ts-dedent";

import { makeAppRouter, makeOpenApiSpecification } from "./api-rest";
import type { CreateContext } from "./api-rest/trpc";
import type { UserRepository } from "./core/entities/User";
import { defineContext } from "./defineContext";

export async function setupRestApi(
  app: FastifyInstance,
  {
    userRepository,
  }: {
    userRepository: UserRepository;
  },
) {
  const prefix = "/api";

  const appRouter = makeAppRouter();

  const createContext: CreateContext = async () => {
    return defineContext({
      repositories: {
        user: userRepository,
      },
    });
  };

  await app.register(fastifyTRPCOpenApiPlugin, {
    prefix,
    router: appRouter,
    createContext,
  });

  /**
   * OpenAPI Specification
   * https://swagger.io/specification/
   */
  app.route({
    method: "GET",
    url: `${prefix}/spec.json`,
    handler(req) {
      const protocol = req.headers["x-forwarded-proto"] ?? req.protocol;
      const hostname = req.headers["x-forwarded-host"] ?? req.hostname;

      const origin = `${protocol}://${hostname}${prefix}`;

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
    url: `${prefix}/docs`,
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
              apiDescriptionUrl="${prefix}/spec.json"
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
