import fp from "fastify-plugin";
import Mercurius from "mercurius";
import { defineContext } from "../../defineContext";
import { makeSchema } from "../../graphql";

export default fp(
  async (app) => {
    const schema = makeSchema();

    await app.register(Mercurius, {
      context() {
        return defineContext({
          repositories: {
            user: {},
          },
        });
      },
      graphiql: true,
      schema,
      subscription: {
        context() {
          return defineContext({
            repositories: {
              user: {},
            },
          });
        },
      },
    });
  },
  {
    name: "graphql",
    dependencies: ["app.env"],
  },
);
