import { defineConfig } from "astro/config";
import path from "node:path";

export default defineConfig({
  output: "static",
  publicDir: path.resolve(process.cwd(), "../public"),
  vite: {
    server: {
      fs: {
        allow: [path.resolve(process.cwd(), "..")],
      },
    },
  },
});
