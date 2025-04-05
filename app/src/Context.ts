import type { FastifyInstance, FastifyRequest } from "fastify";

export type Context = {
  app: FastifyInstance;
  req: FastifyRequest;
};
