import { writeFileSync } from "node:fs";
import { getIconCSS } from "@iconify/utils";
import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from "@iconify/tools";

const svgPath = "./svgs";
const destPath = "./icon.css";

(async () => {
  const iconSet = await importDirectory(svgPath, {
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

  writeFileSync(destPath, cssStr, "utf8");
  // todo: watch svgPath by chokidar
})();
