import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import resToDts from "./plugins/res2dts.ts";

export default defineConfig({
  plugins: [
    resToDts(),
    react({
      babel: {
        plugins: [
          [
            "./plugins/px2rem.cts",
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
