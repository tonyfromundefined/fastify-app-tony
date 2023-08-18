import type { UserRepository } from "./core/entities/User";

export type Context = {
  repositories: {
    user: UserRepository;
  };
};
export function defineContext(context: Context): Context {
  return context;
}
