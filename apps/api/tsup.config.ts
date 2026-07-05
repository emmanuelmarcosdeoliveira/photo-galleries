import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["main.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node16",
  clean: true,
  sourcemap: true,
  minify: false,
  bundle: true,
  splitting: false,
  treeshake: true,
});
