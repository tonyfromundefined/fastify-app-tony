import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  appDirectory: "./src/plugins/web",
  buildDirectory: "./dist/plugins/web",
} satisfies Config;
