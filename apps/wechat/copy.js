import { copyFile } from "node:fs/promises";

try {
  await copyFile("../icons/icon.css", "./miniprogram/icon.css");
  console.log("copy icon.css success");
} catch (error) {
  console.error("The icon.css could not be copied", error);
}
