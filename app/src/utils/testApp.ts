import type { FastifyInstance } from "fastify";
import { test } from "vitest";
import { makeApp } from "../makeApp";

let app: FastifyInstance | null = null;

export const testApp = test.extend<{
  app: FastifyInstance;
}>({
  // biome-ignore lint/correctness/noEmptyPattern: empty object is expected
  app: async ({}, use) => {
    if (!app) {
      app = await makeApp();
    }

    await use(app);
  },
});
