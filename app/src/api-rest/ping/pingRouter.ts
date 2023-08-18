import * as z from "zod";

import { t } from "../trpc";

export const pingRouter = t.router({
  getPing: t.procedure
    .meta({
      openapi: {
        method: "GET",
        path: "/ping",
      },
    })
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return {
        message: `Hello, ${input.name}.`,
      };
    }),
  createPing: t.procedure
    .meta({
      openapi: {
        method: "POST",
        path: "/ping/create",
      },
    })
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return {
        message: `Hello, ${input.name}.`,
      };
    }),
});
