import { z } from "zod";

import { t } from "../../trpc";

export const createPing = t.procedure
  .meta({
    openapi: {
      method: "POST",
      path: "/v1/ping/create",
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
  });
