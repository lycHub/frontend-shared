import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { uid } from "uid";
import { outputFileSync } from "fs-extra/esm";

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
  return outputFileSync(filePath, jsonContent);
}
