import FastifyStatic from "@fastify/static";
import type { FastifyInstance } from "fastify";
import fs from "fs/promises";
import path from "path";
import { createServer } from "vite";

const DEV = process.env.NODE_ENV !== "production";

export async function setupClient(app: FastifyInstance) {
  if (DEV) {
    const vite = await createServer({
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.route({
      url: "*",
      method: "GET",
      async handler(req, reply) {
        const template = await fs.readFile(
          path.resolve("./src/client/index.html"),
          "utf-8"
        );

        const html = await vite.transformIndexHtml(req.url, template);

        reply.status(200);
        reply.header("Content-Type", "text/html");
        reply.header("Cache-Control", "public, max-age=0, must-revalidate");
        reply.send(html);
      },
    });
  } else {
    const html = await fs.readFile(
      path.resolve("./dist/client/index.html"),
      "utf-8"
    );

    await app.register(FastifyStatic, {
      prefix: "/assets/",
      maxAge: "14 days",
      root: path.resolve("./dist/client/assets"),
    });

    app.route({
      url: "*",
      method: "GET",
      handler(req, reply) {
        reply.status(200);
        reply.header("Content-Type", "text/html");
        reply.header("Cache-Control", "public, max-age=0, must-revalidate");
        reply.send(html);
      },
    });
  }
}
