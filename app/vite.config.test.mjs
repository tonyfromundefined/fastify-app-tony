import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
    poolOptions: {
      forks: {
        execArgv: ["--experimental-strip-types", "--loader", "extensionless"],
      },
    },
    setupFiles: ["dotenv-safe/config.js"],
  },
});
