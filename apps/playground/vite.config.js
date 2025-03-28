import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoDts from "./plugins/auto-dts";

export default defineConfig({
  plugins: [
    autoDts({ a: "a" }),
    react({
      babel: {
        plugins: [
          [
            "./plugins/px2rem.js",
            {
              remUnit: 75,
              remPrecision: 5,
            },
          ],
        ],
      },
    }),
  ],
});
