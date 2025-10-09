import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  appDirectory: "./src/web",
  buildDirectory: "./dist/web",
} satisfies Config;
