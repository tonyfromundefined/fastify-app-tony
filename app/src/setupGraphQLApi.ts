import type { FastifyInstance } from "fastify";
import Mercurius from "mercurius";

import { makeSchema } from "./api-graphql";
import type { UserRepository } from "./core/entities/User";
import { defineContext } from "./defineContext";

export async function setupGraphQLApi(
  app: FastifyInstance,
  {
    userRepository,
  }: {
    userRepository: UserRepository;
  },
) {
  const schema = makeSchema();

  await app.register(Mercurius, {
    schema,
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
