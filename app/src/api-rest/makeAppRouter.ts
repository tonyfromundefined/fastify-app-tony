import { pingRouter } from "./ping";
import { t } from "./trpc";

export function makeAppRouter() {
  return t.router({
    ping: pingRouter,
  });
}
