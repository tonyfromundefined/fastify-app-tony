import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import relay from "vite-plugin-relay-lite";

export default defineConfig({
  root: "./src/plugins/client",
  build: {
    sourcemap: true,
    cssCodeSplit: false,
  },
  plugins: [react(), vanillaExtractPlugin(), relay()],
  define: {
    "process.env": {},
  },
});
