import fs from "node:fs";
import path from "node:path";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { defineResolvers } from "./__generated__/resolvers";

export function makeSchema() {
  const typeDefs = fs.readFileSync(
    path.resolve("./src/api-graphql/__generated__/schema.graphql"),
    "utf-8",
  );

  const resolvers = defineResolvers({
    Query: {
      ping: () => true,
    },
  });

  return makeExecutableSchema({
    inheritResolversFromInterfaces: true,
    resolvers,
    typeDefs,
  });
}
