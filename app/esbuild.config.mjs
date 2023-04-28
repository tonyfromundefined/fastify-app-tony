import fs from "node:fs";
import path from "node:path";

import { build } from "esbuild";

const pkg = JSON.parse(
  fs.readFileSync(path.resolve("./package.json"), "utf-8")
);
const external = [
  ...Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  }),
  "vite",
];

build({
  entryPoints: ["./src/index.ts"],
  outdir: "dist",
  target: "node16",
  platform: "node",
  bundle: true,
  minify: false,
  sourcemap: true,
  format: "esm",
  outExtension: {
    ".js": ".mjs",
  },
  external,
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
