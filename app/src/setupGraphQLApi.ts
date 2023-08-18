import type { FastifyInstance } from "fastify";
import Mercurius from "mercurius";

import { defineContext, makeSchema } from "./api-graphql";
import type { UserRepository } from "./repositories";

export async function setupGraphQLApi(
  app: FastifyInstance,
  { userRepository }: { userRepository: UserRepository },
) {
  await app.register(Mercurius, {
    schema: makeSchema(),
    graphiql: true,
    context() {
      return defineContext({
        repositories: {
          user: userRepository,
        },
      });
    },
    subscription: {
      context() {
        return defineContext({
          repositories: {
            user: userRepository,
          },
        });
      },
    },
  });
}
