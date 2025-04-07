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

  // router.get("/api/*", async (req, res, next) => {});

  router.get(/(.*)/, async (req, res, next) => {
    const originalUrl = req.originalUrl;
    const originHtml = readFileSync(
      join(__dirname, "../../index.html"),
      "utf-8"
    );

    /*  const serverAction = RouteServerMap["/"];
    if (serverAction) {
      const data = await serverAction();
      console.log("data :>> ", data);
    } */

    const module = await import(`../../src/test.js`);
    let loadedData = null;
    if (module.getServerSideProps) {
      loadedData = await module.getServerSideProps();
    }

    try {
      // const template = await vite.transformIndexHtml(originalUrl, originHtml);
      const { render } = await vite.ssrLoadModule(
        join(__dirname, "../../src/entry-server.tsx")
      );
      const { pipe, abort } = render({
        originalUrl,
        loadedData,
        onShellReady() {
          res.setHeader("content-type", "text/html");
          pipe(res);
        },
        onShellError() {
          res.statusCode = 500;
          res.setHeader("content-type", "text/html");
          res.send("<h1>出错了</h1>");
          abort();
        },
        onAllReady() {
          next();
        },
      });
      // console.log({ appHtml });
      //     let html = template.replace(`<!--ssr-outlet-->`, () => appHtml);
      //     html = `
      //   <script>
      //     window.__LOADED_STATE__ = ${JSON.stringify(loadedData)};
      //   </script>
      //   ${html}
      // `;
      // res.status(200).set({ "Content-Type": "text/html" }).end(html);
      // next();
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      next(error);
    }
  });
}

createViteServer();

export { router };
