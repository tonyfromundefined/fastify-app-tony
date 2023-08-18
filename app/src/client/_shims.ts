import { createFetch } from "plantae";

const fetch = createFetch({
  client: window.fetch,
});

window.fetch = fetch;
