import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export function getDirname() {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
}

export function isJson(str) {
  if (typeof str == "string") {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      console.log("Json parse error：" + str + "!!!" + e);
      return false;
    }
  }
  return false;
}

export function isObj(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

export function validBodyString(data) {
  let errMsg = "";
  if (!isJson(data)) {
    errMsg = "data must be an json string";
  }
  return errMsg;
}
