import type { UserRepository } from "../repositories";

export type Context = {
  repositories: {
    user: UserRepository;
  };
};
export function defineContext(context: Context): Context {
  return context;
}
