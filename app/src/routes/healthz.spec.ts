import { testApp } from "../utils";

testApp("healthz", async ({ app }) => {
  const response = await app.inject({
    method: "GET",
    url: "/healthz",
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({ ok: true });
});
