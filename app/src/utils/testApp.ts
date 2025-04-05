import type { FastifyInstance } from "fastify";
import { test } from "vitest";
import { makeApp } from "../makeApp";

export const testApp = test.extend<{
  app: FastifyInstance;
}>({
  // biome-ignore lint/correctness/noEmptyPattern:
  app: async ({}, use) => {
    const app = await makeApp();
    await use(app);
  },
});
