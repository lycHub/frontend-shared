import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse, Lang } from "@ast-grep/napi";
import { glob, globSync, globStream, globStreamSync, Glob } from "glob";
import { getDirname, textToObject, writeToJsonFile } from "./i18n/util.js";
import { compact, uniq } from "lodash-es";
import { destr } from "destr";

const basePath = getDirname(import.meta.url);

async function readFileContent(filePath) {
  try {
    const content = await readFile(filePath, "utf-8");
    const extractJson = destr(content);
    return extractJson;
  } catch (err) {
    console.error("读取文件出错:", err);
  }
  return [];
}

const Langs = ["zh", "en"];

async function makeLangJson({ extractJson, lang, targetLang }) {
  const jsonText = extractJson.reduce((res, item) => {
    res[item.text] = item.text;
    return res;
  }, {});
  // console.log("makeLangJson>>", lang, json);
  await writeToJsonFile(jsonText, join(basePath, `src/i18n/${lang}.json`));
}

async function genLocalJson({ langs, mainLang }) {
  const extractJson = await readFileContent(
    join(basePath, "i18n/extract.json")
  );
  langs.forEach((lang) => {
    makeLangJson({
      lang,
      extractJson,
    });
  });
}

// readFileContent(join(basePath, "i18n/extract.json"));
genLocalJson({
  langs: Langs,
  mainLang: Langs[0],
});
