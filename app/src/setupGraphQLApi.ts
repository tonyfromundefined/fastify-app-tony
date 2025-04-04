import type { FastifyInstance } from "fastify";

import Mercurius from "mercurius";

import type { UserRepository } from "./core/entities/User";

import { defineContext } from "./defineContext";
import { makeSchema } from "./graphql";

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
    context() {
      return defineContext({
        repositories: {
          user: userRepository,
        },
      });
    },
    graphiql: true,
    schema,
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
