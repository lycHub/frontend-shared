import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
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
