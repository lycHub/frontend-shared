import { PluginOption } from "vite";
import { join } from "node:path";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";
import { validBodyString } from "./utils";
import { outputFile } from "fs-extra";

interface Options {
  outputDir: string;
  cover: boolean;
  routePath: string;
}

const DefaultOptions: Options = {
  outputDir: "/quick-dts",
  cover: false,
  routePath: "/gen-dts",
};

export default (options?: Partial<Options>): PluginOption => {
  const finalOptions = { ...DefaultOptions, ...options };
  return {
    name: "vite-plugin-res-to-dts",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url === finalOptions.routePath && req.method === "POST") {
            res.setHeader("content-type", "text/plain; charset=utf-8");
            let data = "";
            req.on("data", (chunk) => {
              data += chunk.toString();
            });
            req.on("end", async () => {
              const errMsg = validBodyString(data);
              if (errMsg) {
                res.end("gen fail");
                next();
                return;
              }
              const bodyData = JSON.parse(data);

              const fileKey = Object.keys(bodyData)[0];
              const content = Object.values(bodyData)[0] as Record<
                string,
                unknown
              >;
              // console.log("req end", fileKey, content);
              const destPath = join(
                "./",
                finalOptions.outputDir,
                `${fileKey}.d.ts`
              );
              try {
                const result = await genType(content);
                // console.log("quicktype res>>>", result);
                if (result) {
                  await outputFile(destPath, result);
                  console.log("Gen dts>>>", "Gen dts file success");
                } else {
                  console.error("Gen dts error>>>", "Gen dts file failed");
                }
              } catch (error) {
                console.error("Gen dts error>>>", error);
                res.end("gen fail");
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

async function genType(data: Record<string, unknown>) {
  const jsonInput = jsonInputForTargetLanguage("TypeScript");

  await jsonInput.addSource({
    name: "dts",
    samples: [JSON.stringify(data)],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: "TypeScript",
    rendererOptions: {
      "just-types": "true",
    },
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
