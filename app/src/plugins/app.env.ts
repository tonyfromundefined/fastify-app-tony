import FastifyEnv from "@fastify/env";
import { type Static, Type } from "@sinclair/typebox";
import fp from "fastify-plugin";

const schema = Type.Object({
  COOKIE_SECRET: Type.String(),
});

declare module "fastify" {
  interface FastifyInstance {
    env: Static<typeof schema>;
  }
}

export default fp(
  async (app) => {
    await app.register(FastifyEnv, {
      confKey: "env",
      schema,
      data: { ...process.env },
    });
  },
  { name: "app.env" },
);
