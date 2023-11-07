import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { OpenApiMeta } from "trpc-openapi";

import { initTRPC } from "@trpc/server";

import type { Context } from "../defineContext";

export type CreateContext = (
  opts: CreateFastifyContextOptions,
) => Promise<Context>;

export const t = initTRPC.context<CreateContext>().meta<OpenApiMeta>().create();
