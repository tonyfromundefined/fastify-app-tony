import "dotenv-safe/config.js";

import { makeApp } from "./makeApp";

const HOST = process.env.HOST ?? "0.0.0.0";
const PORT = process.env.PORT ?? "3000";

Promise.resolve()
  .then(() => makeApp())
  .then((app) =>
    app.listen({
      host: HOST,
      port: Number.parseInt(PORT.toString(), 10),
    }),
  )
  .then(() => {
    console.log(`🚀 fastify-app-tony is listening on http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
