import type { FastifyInstance } from "fastify";

import Mercurius from "mercurius";

import type { UserRepository } from "./core/entities/User";

import { makeSchema } from "./api-graphql";
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
