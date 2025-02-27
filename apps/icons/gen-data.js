import { genIconJson } from "./utils/genData.js";
try {
  await genIconJson();
  console.log("Gen svg json success");
} catch (error) {
  console.error("Gen svg json fail", error);
}
