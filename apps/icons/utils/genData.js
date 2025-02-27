import { join, dirname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs } from "fs";
import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from "@iconify/tools";

export function getDirname() {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
}

const DefaultOptions = {
  sourcePath: "../svgs",
  destPath: "../icon-data.json",
};

export function genIconJson(options = {}) {
  const finalOptions = { ...DefaultOptions, ...options };
  return refreshIconJson({
    root: getDirname(),
    ...finalOptions,
  });
}

async function refreshIconJson({ root, sourcePath, destPath }) {
  const iconSet = await importDirectory(join(root, sourcePath), {
    prefix: "zs",
    ignoreImportErrors: false,
  });

  iconSet.forEach((name, type) => {
    if (type !== "icon") {
      return;
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
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

      runSVGO(svg);
    } catch (err) {
      console.error(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }

    // Update icon
    iconSet.fromSVG(name, svg);
  });

  // Export as IconifyJSON
  const exported = JSON.stringify(iconSet.export(), null, "\t") + "\n";

  // Save to file
  await fs.writeFile(join(root, destPath), exported, "utf8");
}
