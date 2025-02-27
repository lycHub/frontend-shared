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
  sourcePath: "/public/svgs",
  destPath: "/public/zs.json",
};

export default (options = {}) => {
  const finalOptions = { ...DefaultOptions, ...options };
  let root = getDirname();
  return {
    name: "vite-plugin-iconify",
    apply: "serve",
    configResolved(config) {
      console.log("configResolved>>>", config.root);
      root = config.root;
    },
    configureServer(server) {
      return () => {
        // server.watcher.add(join(root, finalOptions.sourcePath));
        server.watcher.on("add", (path) => {
          // console.log(`File add: ${path} `);
          refreshIconJson({
            root,
            changedFilePath: path,
            ...finalOptions,
          }).then(() => {
            console.log(`${finalOptions.destPath} refreshed`);
          });
        });
        server.watcher.on("unlink", (path) => {
          // console.log(`File unlink: ${path} `);
          refreshIconJson({
            root,
            changedFilePath: path,
            ...finalOptions,
          }).then(() => {
            console.log(`${finalOptions.destPath} refreshed`);
          });
        });
        server.watcher.on("change", (path) => {
          // console.log(`File changed 2: ${path} `);
          refreshIconJson({
            root,
            changedFilePath: path,
            ...finalOptions,
          }).then(() => {
            console.log(`${finalOptions.destPath} refreshed`);
          });
        });
      };
    },
  };
};

async function refreshIconJson({
  root,
  changedFilePath,
  sourcePath,
  destPath,
}) {
  if (!normalize(changedFilePath).includes(normalize(sourcePath))) return;
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
