import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { uid } from "uid";

export function getDirname(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}

export function textToObject(text) {
  return {
    key: uid(),
    text,
  };
}

export function writeToJsonFile(contentStr, filePath) {
  const jsonContent =
    typeof contentStr === "string"
      ? contentStr
      : JSON.stringify(contentStr, null, 2);
  return writeFile(filePath, jsonContent, "utf-8");
}
