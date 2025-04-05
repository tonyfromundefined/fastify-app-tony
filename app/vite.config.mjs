import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import relay from "vite-plugin-relay-lite";

export default defineConfig({
  ssr: {},
  plugins: [
    reactRouter(),
    cjsInterop({
      dependencies: ["relay-runtime", "react-relay"],
    }),
    relay(),
  ],
});
