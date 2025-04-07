import express from "express";
import { createServer } from "vite";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fse from "fs-extra";

const { readFileSync } = fse;
const router = express.Router({ caseSensitive: true });

async function createViteServer() {
  const vite = await createServer({
    mode: "ssr",
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: "custom",
  });

  // 将 vite 的 connect 实例作中间件使用
  router.use(vite.middlewares);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  router.get(/(.*)/, async (req, res, next) => {
    const url = req.originalUrl;
    const originHtml = readFileSync(
      join(__dirname, "../../index.html"),
      "utf-8"
    );
    // console.log({ originHtml });
    try {
      const template = await vite.transformIndexHtml(url, originHtml);
      const { render } = await vite.ssrLoadModule(
        join(__dirname, "../../src/entry-server.tsx")
      );
      const { appHtml } = render();
      // console.log({ appHtml });
      const html = template.replace(`<!--ssr-outlet-->`, () => appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
      next();
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      next(error);
    }
  });
}

createViteServer();

export { router };
