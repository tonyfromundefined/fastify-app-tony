import { generateOpenApiDocument } from "trpc-openapi";

import type { makeAppRouter } from "./makeAppRouter";

export function makeOpenApiSpecification({
  baseUrl,
  appRouter,
}: {
  baseUrl: string;
  appRouter: ReturnType<typeof makeAppRouter>;
}) {
  return generateOpenApiDocument(appRouter, {
    title: "fastify-app-tony API",
    version: "1.0.0",
    baseUrl,
  });
}
