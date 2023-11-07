import { t } from "./trpc";
import { createPing, getPing } from "./v1/ping";

export function makeAppRouter() {
  return t.router({
    v1: t.router({
      createPing,
      getPing,
    }),
  });
}

export type AppRouter = ReturnType<typeof makeAppRouter>;
