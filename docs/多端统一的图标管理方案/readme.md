**目录 (Table of Contents)**

[TOCM]

[TOC]


# 多端统一的图标管理方案

> 本文目标：
 - 多端(pc, mobile,小程序)统一图标技术栈；
 - 多端可复用同一目录的图标，甚至可以跨项目引用同一图标库；
 - 极简的图标添加和使用方式。

## 痛点：图标开发管理的混乱

**1. 使用方式非常多**

	前端开发中，使用图标的方式非常多，传统的有使用图片、Svg，从字体图标（Icon Fonts）等。基于框架又有很多不同封装，可以自己封装<Icon />组件，也可用第三方库比如svgr。并且每种使用方式也有多种。
	
	比如图片可以用`<img />`标签，也可以css url()；
	
	字体图标可以用 unicode `<i class="iconfont">&#x33;</i>` 或 font-class的方式 `<i class="iconfont icon-xxx"></i>`;
	
	svg可以直接使用`<svg />`标签，也可以图片标签加载`<img src="menu.svg" />`, css url也可以加载svg.


**2. 多种图标来源**

	- 在线平台比如iconfont, iconify等;
	- 设计稿直接下载.

**3. 多项目可复用性**

	很多项目都有pc和mobile端，甚至小程序，它们往往都是同一套ui风格，图标也几乎是从同一份设计稿下载的，

	但日常开发中同样的图标文件往往只能通过cv的方式粘到各个端的项目中，造成维护成本翻倍，占磁盘空间。

## font-class和svg的局限

尽管上述有那么多使用图标的方式，但实际开发大多是使用svg和font-class的方式， 因为他们都可以直接通过css来改变尺寸和颜色，这种便利性是其它方案难以做到的，但这两种方式仍有一些局限性。

	 svg: 只有svg标签的方式能做到用css改变颜色和尺寸，但直接写svg标签会降低html的可读性，所以每种技术栈都有各自的库来简化svg的使用比如react的svgr, 原生的web component, 这在web端很方便但其它不支持svg标签的端呢？(各种小程序)。
	 font-class: 这是唯一能同时在web和小程序使用的方式，并且可以通过css改变图标属性，但它缺点也很多，比如要加载额外的字体文件，高分辨率下会模糊，不能用js控制内部细节，比如图标的路径动画？

## 确定方案
	由于svg能精细的控制内部path，方便做path动画，并且不会失真，所以web端还是用svg做图标是目前最合适的方案；
	小程序为了能让css改变图标，只有font-class的方式是最合适的

传统的做法是web端项目用svg的封装库，比如svgr，小程序端用iconfont的font-class方案，

今天介绍的就是能统一web和小程序技术栈的图标库 —— <a href="https://iconify.design/" target="_blank">Iconify</a>

以及多端多项目如何引用同一个图标目录。


## <a href="https://iconify.design/" target="_blank">Iconify</a> 简介

引用官网原文： Iconify是一套面向开发人员和设计师的工具，旨在以一致的方式轻松使用不同的图标集。

### features
- 官方自带20多万个图标，都经过清理、优化和更新；
- 提供很多优化和操作图标的工具函数，比如图标优化，导入导出等；
- 官方封装了各技术栈对应的图标组件；
- 多场景可用：html, css, svg，figma等...

## 基本使用
> 代码都以react项目为例。

根据不同使用场景选择对应的方式：

![](./assets/multi-use.png)

web开发建议使用web component的方式，这样可以不限技术栈。

而web component官方也提供了一个react的封装包[@iconify-icon/react](https://iconify.design/docs/iconify-icon/react.html)，

和[@iconify/react](https://iconify.design/docs/icon-components/react/)不同，前者只是以react的方式封装了一下web component组件，后者完全是react的实现方式。

**安装**
```sh
npm add @iconify-icon/react
```

**找到官方图标**

在[官方图标库](https://icon-sets.iconify.design/)选择一个图标.

![](./assets/use.png)


**引入并使用**
```tsx
import { Icon } from "@iconify-icon/react";

function Page() {

  return (
    <div className="page">
      <Icon icon="ri:armchair-fill" />
      <div>
  );
}

```

页面上应该有了一个沙发的图标：

![](./assets/preview.png)

用到那个图标，就是去加载对应的json文件。

**改变属性**

可以方便的用css或自带的一些属性改变图标样式

```tsx
 <Icon icon="ri:armchair-fill" />
      <Icon icon="ri:armchair-fill" style={{ color: '#e00' }} />
      <Icon icon="ri:armchair-fill" style={{ color: '#e00', fontSize: '2em' }} />
      <Icon icon="ri:armchair-fill" style={{ color: '#e00', fontSize: '2em' }} rotate={45} />
```

![](./assets/preview2.png)

官方图标可很好的满足没有ui设计的公司或项目，怕请求失败的话也可把官方库私有化部署。

## 使用本地图标

对于有设计稿的项目，如果要完美还原，那只能从设计稿下载图标文件。

**添加图标到项目的静态资源目录**

![](./assets/add-icon.png)

**生成icon data**

```sh
npm add @iconify/tools
```

根目录添加个iconify.js:

```js
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

genIconJson();

function genIconJson(options = {}) {
  const finalOptions = { ...DefaultOptions, ...options };
  refreshIconJson({
    root: getDirname(),
    ...finalOptions,
  }).then(() => {
    console.log(`${finalOptions.destPath} refreshed`);
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

```

```sh
node iconify
```

此时会生成一个zs.json, iconify会读取这个文件，里面列出了可以使用的图标。

![](./assets/gen-data.png)


在入口文件处发请求：添加图标到iconify组件

```js
axios.get('/public/zs.json').then(({ data }) => {
  addCollection(data);
});
```

然后就能像用官方组件一样，用自己添加的组件：

```tsx
   <Icon icon="zs:search" style={{ color: "blue" }} />
      <Icon icon="zs:shopping" style={{ color: "red" }} />
      <Icon icon="zs:user" style={{ color: "yellow", fontSize: "24px" }} />
```

![](./assets/view.png)


## 写个vite插件优化流程

虽然可以使用本地图标，但每次修改svg目录，还是得跑一下iconify.js, 可用node监听svg目录变化自动run iconify.js.

建议参考项目使用的cli,这里以vite为例写个插件：

vite-plugin-iconify.js
```js
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

```


vite.config.js
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import iconify from "./vite-plugin-iconify";

export default defineConfig({
    envDir: "envs",
    cacheDir: "../../node_modules/.vite",
    plugins: [react(), iconify()],
  });
```

配置好后，只需要在svg目录修改图标就能直接用了，比svgr还方便一点，但这点可以忽略不记，

关键是svgr不能用在小程序，这就导致小程序得换其它方案，但iconify支持font-class的用法，能在小程序使用。


## 用于微信小程序

这里以原生微信小程序为例。


