import { z } from "zod";

import { t } from "../../trpc";

export const getPing = t.procedure
  .meta({
    openapi: {
      method: "GET",
      path: "/v1/ping",
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
  });
