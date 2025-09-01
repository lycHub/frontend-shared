import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDirname, writeToJsonFile } from "./i18n/util.js";
import { destr } from "destr";
import { batchTranslateText } from "./i18n/translate/index.js";

const basePath = getDirname(import.meta.url);

let allJson = [];

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

async function makeLangJson({ extractJson, lang, mainLang }) {
  let jsonText = {};
  if (mainLang === lang) {
    jsonText = extractJson.reduce((res, item) => {
      res[item.text] = item.text;
      return res;
    }, {});
  } else {
    const textList = extractJson.map((item) => item.text);
    const { TargetTextList } = await batchTranslateText({
      Source: "zh",
      Target: "en",
      SourceTextList: textList,
    });
    if (TargetTextList?.length) {
      jsonText = extractJson.reduce((res, item, index) => {
        res[item.text] = TargetTextList[index] || item.text;
        return res;
      }, {});
    }
  }

  // console.log("makeLangJson>>", lang, jsonText);
  await writeToJsonFile(jsonText, join(basePath, `src/i18n/${lang}.json`));
  console.log("gen i18n success");
}

async function genLocalJson({ langs, mainLang }) {
  let extractJson = [];
  if (allJson.length) {
    extractJson = allJson.slice();
  } else {
    extractJson = await readFileContent(join(basePath, "i18n/extract.json"));
    allJson = extractJson.slice();
  }

  langs.forEach((lang) => {
    makeLangJson({
      lang,
      extractJson,
      mainLang,
    });
  });
}

genLocalJson({
  langs: Langs,
  mainLang: Langs[0],
});
