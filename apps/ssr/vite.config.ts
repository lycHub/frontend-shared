import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command, mode }) => {
  const isLocal = command === "serve";
  const env = loadEnv(mode, join(__dirname, "envs"), "VITE_");
  return {
    envDir: "envs",
    plugins: [react()],
    base: isLocal ? "/" : env.VITE_BASE_URL,
  };
});
