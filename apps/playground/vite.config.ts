import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import iconify from "./vite-plugin-iconify";

export default defineConfig({
  plugins: [react(), iconify()],
});
