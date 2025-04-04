import fp from "fastify-plugin";
import Mercurius from "mercurius";
import { makeSchema } from "./makeSchema";

export default fp(
  async (app) => {
    const schema = makeSchema();

    await app.register(Mercurius, {
      context(req) {
        return { app, req };
      },
      graphiql: true,
      schema,
      subscription: {
        context(socket, req) {
          return { app, req };
        },
      },
    });
  },
  {
    name: "graphql",
    dependencies: ["app.env"],
  },
);
