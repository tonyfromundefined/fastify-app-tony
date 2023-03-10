import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src/client",
  build: {
    sourcemap: true,
    cssCodeSplit: false,
  },
  plugins: [react(), vanillaExtractPlugin()],
  define: {
    "process.env": {},
  },
});
