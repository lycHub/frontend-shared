import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactScopedCss from "vite-plugin-react-scope-css";
import resToDts from "./plugins/res2dts.ts";

export default defineConfig({
  plugins: [
    reactScopedCss(),
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
    resToDts(),
  ],
});
