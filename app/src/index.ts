import "dotenv-safe/config.js";

import { makeApp } from "./makeApp";

const HOST = "0.0.0.0";
const PORT = 3000;

Promise.resolve()
  .then(() => makeApp())
  .then((app) =>
    app.listen({
      host: HOST,
      port: PORT,
    })
  )
  .then(() => {
    console.log(`🚀 Fastify Tony App is listening on http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
