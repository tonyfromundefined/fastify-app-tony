import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../api-trpc/makeAppRouter";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
      fetch,
    }),
  ],
});
