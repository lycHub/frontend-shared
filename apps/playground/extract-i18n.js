import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse, Lang } from "@ast-grep/napi";
import { glob, globSync, globStream, globStreamSync, Glob } from "glob";
import { getDirname, textToObject, writeToJsonFile } from "./i18n/util.js";
import { compact, uniq } from "lodash-es";

const basePath = getDirname(import.meta.url);

async function readFileContent(filePath) {
  const texts = [];
  try {
    const source = await readFile(filePath, "utf-8");
    // console.log(content);
    const ast = parse(Lang.JavaScript, source);
    const root = ast.root();
    const nodes = root.findAll('t("$A")');
    nodes.forEach((node) => {
      const text = node.getMatch("A").text();
      // console.log("text>>>", text, text === "工号");
      texts.push(text);
    });
  } catch (err) {
    console.error("读取文件出错:", err);
    throw err;
  }
  return texts;
}

async function iterateFiles() {
  try {
    const tsxFilePaths = await glob("src/**/*.tsx");
    const allTexts = [];
    if (tsxFilePaths.length) {
      const promises = tsxFilePaths.map((path) =>
        readFileContent(join(basePath, path))
      );
      for await (const texts of promises) {
        allTexts.push(...texts);
      }
    }
    const validTexts = uniq(compact(allTexts));
    const jsonText = validTexts.map((item) => textToObject(item));
    // console.log("validTexts>>> ", jsonText);
    await writeToJsonFile(jsonText, join(basePath, "i18n/extract.json"));
  } catch (err) {
    console.error("读取文件出错:", err);
    throw err;
  }
}

// readFileContent();
iterateFiles();
