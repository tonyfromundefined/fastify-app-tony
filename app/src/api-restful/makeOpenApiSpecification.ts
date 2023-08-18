import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./appRouter";

export function makeOpenApiSpecification({ baseUrl }: { baseUrl: string }) {
  return generateOpenApiDocument(appRouter, {
    title: "fastify-app-tony API",
    version: "1.0.0",
    baseUrl,
  });
}
