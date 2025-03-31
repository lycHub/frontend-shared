import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export function getDirname() {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
}

export function isJsonString(data: unknown) {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  return data;
}

export function isObj(obj: unknown) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isArray(obj: unknown) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

export function validBodyString(data: unknown) {
  let errMsg = "";
  if (!isJsonString(data)) {
    errMsg = "data must be an json string";
  }
  return errMsg;
}
