import type { FastifyInstance } from "fastify";

import fs from "node:fs/promises";
import path from "node:path";
import FastifyStatic from "@fastify/static";
import { createServer } from "vite";

const DEV = process.env.NODE_ENV !== "production";

export async function setupClient(app: FastifyInstance) {
  if (DEV) {
    const vite = await createServer({
      appType: "custom",
      server: {
        middlewareMode: true,
      },
    });

    app.use(vite.middlewares);

    app.route({
      async handler(req, reply) {
        const template = await fs.readFile(
          path.resolve("./src/client/index.html"),
          "utf-8",
        );

        const html = await vite.transformIndexHtml(req.url, template);

        reply.status(200);
        reply.header("Content-Type", "text/html");
        reply.header("Cache-Control", "public, max-age=0, must-revalidate");
        reply.send(html);
      },
      method: "GET",
      url: "*",
    });
  } else {
    const html = await fs.readFile(
      path.resolve("./dist/client/index.html"),
      "utf-8",
    );

    await app.register(FastifyStatic, {
      maxAge: "14 days",
      prefix: "/assets/",
      root: path.resolve("./dist/client/assets"),
    });

    app.route({
      handler(req, reply) {
        reply.status(200);
        reply.header("Content-Type", "text/html");
        reply.header("Cache-Control", "public, max-age=0, must-revalidate");
        reply.send(html);
      },
      method: "GET",
      url: "*",
    });
  }
}
