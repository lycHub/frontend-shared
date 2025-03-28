import { outputFile, pathExists } from "fs-extra";
import { join } from "node:path";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";
import { validBodyString, getDirname } from "./utils";

const DefaultOptions = {
  outputDir: "/quick-dts",
  cover: false,
  routePath: "/gen-dts",
};

export default (options) => {
  const finalOptions = { ...DefaultOptions, ...options };
  let root = getDirname();
  return {
    name: "vite-plugin-auto-dts",
    apply: "serve",
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (
            req.method.toLowerCase() === "post" &&
            req.url === finalOptions.routePath
          ) {
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });

            // 为简化这里写死，实际需要用户自己传过来
            const fileKey = "test-file";
            const destPath = join(
              root,
              finalOptions.outputDir,
              `${fileKey}.d.ts`
            );

            req.on("end", async () => {
              const errMsg = validBodyString(body);

              if (errMsg) {
                res.statusCode = 400;
                res.end(errMsg);
                next();
                return;
              }

              if (!finalOptions.cover) {
                const isExit = await pathExists(destPath);
                if (isExit) {
                  res.statusCode = 201;
                  res.end("Auto gen dts existed");
                  next();
                  return;
                }
              }

              try {
                const result = await genType(body);
                // console.log("quicktype res>>>", result);
                if (result) {
                  await outputFile(destPath, result, {
                    flag: "a",
                  });
                  res.statusCode = 201;
                  res.end("Auto gen dts success");
                } else {
                  res.statusCode = 400;
                  res.end("Auto gen dts fail");
                }
              } catch (error) {
                res.statusCode = 400;
                res.end(error.message);
              } finally {
                next();
              }
            });
          } else {
            next();
          }
        });
      };
    },
  };
};

async function genType(data) {
  const jsonInput = jsonInputForTargetLanguage("TypeScript");
  await jsonInput.addSource({
    name: "dts",
    samples: [data],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: "TypeScript",
  });
  if (lines?.length) {
    let str = "";

    for (const line of lines) {
      str += `${line}\r\n`;
    }
    return str;
  }

  return "";
}
