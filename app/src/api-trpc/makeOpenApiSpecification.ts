import { generateOpenApiDocument } from "trpc-openapi";

import type { makeAppRouter } from "./makeAppRouter";

export function makeOpenApiSpecification({
  appRouter,
  baseUrl,
}: {
  appRouter: ReturnType<typeof makeAppRouter>;
  baseUrl: string;
}) {
  return generateOpenApiDocument(appRouter, {
    baseUrl,
    title: "fastify-app-tony API",
    version: "1.0.0",
  });
}
