import { writeFile } from "node:fs/promises";
import { getIconCSS } from "@iconify/utils";
import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from "@iconify/tools";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const sourcePath = "../svgs";
const destPath = "../icon.css";

export function getDirname() {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
}

export async function genCSS() {
  const iconSet = await importDirectory(join(getDirname(), sourcePath), {
    prefix: "zs",
    ignoreImportErrors: false,
  });

  let cssStr = "";
  iconSet.forEach((name, type) => {
    if (type !== "icon") return;

    const svg = iconSet.toSVG(name);
    if (!svg) {
      // Invalid icon
      iconSet.remove(name);
      return;
    }

    try {
      cleanupSVG(svg);
      parseColors(svg, {
        defaultColor: "currentColor",
        callback: (attr, colorStr, color) => {
          if (!color) {
            return colorStr;
          }

          if (isEmptyColor(color)) {
            return color;
          }
          return "currentColor";
        },
      });

      // Optimise
      runSVGO(svg);
    } catch (err) {
      // Invalid icon
      console.error(`ICON Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }

    const iconData = svg.getIcon();
    cssStr +=
      getIconCSS(iconData, {
        iconSelector: ".zs-icon__" + name,
      }) + "\n";
  });

  return writeFile(join(getDirname(), destPath), cssStr, "utf8");
}
