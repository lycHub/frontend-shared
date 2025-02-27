import { genCSS } from "./utils/gen-css.js";

try {
  await genCSS();
  console.log("Gen svg css success");
} catch (error) {
  console.error("Gen svg css fail", error);
}
