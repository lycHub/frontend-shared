import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command, mode }) => {
  const isLocal = command === "serve";
  const env = loadEnv(mode, join(__dirname, "envs"), "VITE_");
  console.log("env.VITE_BASE_URL>>>>", env.VITE_BASE_URL);
  return {
    envDir: "envs",
    plugins: [tailwindcss()],
    server: {
      host: true,
      strictPort: true,
    },
    base: isLocal ? "/" : env.VITE_BASE_URL,
  };
});
