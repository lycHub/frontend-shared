import express from "express";

// import { render } from "../../../dist/server/entry-server.js";
import { join, dirname } from "node:path";
import fse from "fs-extra";
import { fileURLToPath } from "node:url";

let render = () => {};

const isDev = process.env.NODE_ENV === "development";

if (!isDev) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  render = require("../../../dist/server/entry-server.js").render;
}

const router = express.Router({ caseSensitive: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createViteServer() {
  router.get(/(.*)/, async (req, res, next) => {
    const originalUrl = req.originalUrl;

    const htmlStr = fse.readFileSync(
      join(__dirname, "../../../dist/client/index.html"),
      "utf-8"
    );

    const module = await import(`../apis/test.js`);
    let loadedData = null;
    if (module.getServerSideProps) {
      loadedData = await module.getServerSideProps();
    }
    console.log("request url>>>", originalUrl);
    try {
      const { pipe, abort } = render({
        originalUrl,
        htmlStr,
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
    } catch (error: unknown) {
      console.error(error);
      next(error);
    }
  });
}

createViteServer();

export { router };
