import fp from "fastify-plugin";
import type { UserRepository } from "../../core/entities/User";
import { makeUserRepository } from "./makeUserRepository";

interface Repositories {
  user: UserRepository;
}

declare module "fastify" {
  interface FastifyInstance {
    repositories: Repositories;
  }
}

export default fp(
  async (app) => {
    const repositories: Repositories = {
      user: makeUserRepository(),
    };

    app.decorate("repositories", repositories);
  },
  {
    name: "repositories",
    dependencies: ["app.env"],
  },
);
