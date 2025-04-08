import express from "express";
import { createServer } from "vite";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fse from "fs-extra";
import { match } from "path-to-regexp";
import { RouteServerMap } from "../route-apis/index.js";
import { buildMultiPath } from "../utils/path.js";

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
    // console.log("request url>>>", originalUrl);
    const originHtml = fse.readFileSync(
      join(__dirname, "../../../index.html"),
      "utf-8"
    );

    let loadedData = {};

    const matchRouteInfo = Object.keys(RouteServerMap)
      .map((item) => {
        const fn = match(item);
        const matchInfo = fn(originalUrl);
        return {
          apiKey: item,
          key: matchInfo ? buildMultiPath(matchInfo.path) : item,
          matchInfo,
        };
      })
      .filter((item) => item.matchInfo)[0];

    console.log("matchRouteKey :>> ", matchRouteInfo.key);
    if (matchRouteInfo) {
      const serverAction = RouteServerMap[matchRouteInfo.apiKey];
      // @ts-expect-error okk
      req.params.id = matchRouteInfo.matchInfo
        ? matchRouteInfo.matchInfo.params?.id
        : "";
      const data = await serverAction(req);
      loadedData = { [matchRouteInfo.key]: data };
    }

    try {
      const htmlStr = await vite.transformIndexHtml(originalUrl, originHtml);
      const { render } = await vite.ssrLoadModule(
        join(__dirname, "../../../src/entry-server.tsx")
      );
      // const fetchRequest = createFetchRequest(req, res);
      const stream = render({
        originalUrl,
        htmlStr,
        loadedData,
        onShellReady() {
          res.statusCode = 200;
          res.setHeader("content-type", "text/html");
          stream.pipe(res);
        },
        onShellError() {
          res.statusCode = 500;
          res.setHeader("content-type", "text/html");
          res.send("<h1>出错了</h1>");
          stream.abort();
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
    } catch (error: unknown) {
      vite.ssrFixStacktrace(error as Error);
      console.error(error);
      next(error);
    }
  });
}

createViteServer();

export { router };
