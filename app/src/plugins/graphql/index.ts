import path from "node:path";
import { useGraphQLModules } from "@envelop/graphql-modules";
import fp from "fastify-plugin";
import { glob } from "glob";
import { createApplication } from "graphql-modules";
import { createYoga } from "graphql-yoga";
import type { Context } from "../../Context";

export default fp(
  async (app) => {
    const yoga = createYoga<Context>({
      plugins: [
        useGraphQLModules(
          createApplication({
            modules: await loadModules(),
          }),
        ),
      ],
    });

    app.route({
      url: yoga.graphqlEndpoint,
      method: ["GET", "POST", "OPTIONS"],
      handler: async (req, reply) => {
        const context: Context = { app, req };

        const response = await yoga.handleNodeRequestAndResponse(
          req,
          reply,
          context,
        );

        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });

        reply.status(response.status);
        reply.send(response.body);

        return reply;
      },
    });
  },
  {
    name: "graphql",
    dependencies: ["app.env"],
  },
);

async function loadModules() {
  const modules = await glob(
    path.resolve("./src/plugins/graphql/modules/*/index.ts"),
  )
    .then((ps) => Promise.all(ps.map((p) => import(p))))
    .then((ms) => ms.map((m) => m.default));

  return modules;
}
