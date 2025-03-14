import { readFile, writeFile } from "node:fs/promises";
import { marked } from "marked";

const basePath = "./docs/遍历ast";
const fileName = "1-写babel插件编译和优化代码";

async function logFile() {
  try {
    const mdStr = await readFile(`${basePath}/${fileName}.md`, {
      encoding: "utf8",
    });
    const htmlStr = marked.parse(mdStr);
    writeFile(
      `${basePath}/${fileName}.html`,
      `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>统一的图标管理方案</title>
          </head>
          <body>
          ${htmlStr}
          </body>
        </html>
      `
    );
  } catch (err) {
    console.error(err.message);
  }
}

logFile();
