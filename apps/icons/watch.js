import chokidar from "chokidar";
import { genIconJson } from "./utils/genData.js";
import { genCSS } from "./utils/gen-css.js";

const watcher = chokidar.watch("./svgs");

let running = false;

watcher.on("add", async () => {
  if (running) return;
  running = true;
  try {
    await Promise.all([genIconJson(), genCSS()]);
    console.log("Gen svg success");
  } catch (error) {
    console.error("Gen svg fail", error);
  } finally {
    running = false;
  }
});

watcher.on("unlink", async () => {
  if (running) return;
  running = true;
  try {
    await Promise.all([genIconJson(), genCSS()]);
    console.log("Gen svg success");
  } catch (error) {
    console.error("Gen svg fail", error);
  } finally {
    running = false;
  }
});

watcher.on("change", async (path) => {
  if (running) return;
  running = true;
  console.log("Svg changed");
  try {
    await Promise.all([genIconJson(), genCSS()]);
    console.log("Gen svg success");
  } catch (error) {
    console.error("Gen svg fail", error);
  } finally {
    running = false;
  }
});
