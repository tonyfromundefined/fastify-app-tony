import fp from "fastify-plugin";

export default fp(
  async (app) => {
    /**
     * Health Check Endpoint
     */
    app.get("/healthz", () => ({
      ok: true,
    }));
  },
  { encapsulate: true },
);
