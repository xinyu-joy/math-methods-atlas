# 数学方法地图

按学科、问题和方法检索的公开知识网站。首版包含 63 个 MSC2020 一级学科目录、30 个方法族与 6 类问题入口。每个方法都有独立页面，以及直观解释、条件、结论、限制和来源状态。

## 当前研究进度

这是 v0.1 初步登记版，数据日期为 2026-11-03。3 个条目已核对论文或综述摘要，0 个条目完成定理级核验。领域标签为编辑整理，条目数不等于数学方法总数。

## 本地使用

需要 Node.js 22 或更新版本，无需安装第三方依赖。

```sh
npm run build
npm test
npm run dev
```

打开终端显示的本地网址。生成后的 `dist/index.html` 也可以直接在浏览器打开，全部方法页面和筛选功能不依赖服务器接口。

## 接入 math-methods-atlas

本目录放在仓库根目录的 `math-atlas/` 下。仓库级 GitHub Actions 文件位于 `.github/workflows/math-atlas-pages.yml`，只发布 `math-atlas/dist`，不发布仓库中的论文和其他文件。

首次发布时，在仓库 Settings → Pages 中将 Source 选为 GitHub Actions。推送到 main 后，工作流会构建、检查链接并发布。成功后的网址以工作流实际返回结果为准。预配置的地址为 `https://xinyu-joy.github.io/math-methods-atlas/`。

## 更新条目

- `src/data.mjs`：学科、方法用途、条件、限制与文献进度。
- `src/editorial.mjs`：中英文检索别名、直观解释与来源标题。
- `src/styles.css`：响应式样式。
- `src/app.js`：筛选、排序、链接状态与分享。
- `scripts/build.mjs`：生成静态页面、CSV、JSON、站点地图。
- `downloads/math-atlas-v0.1.xlsx`：原始登记工作簿快照。内容改变时应另行更新并标注新版本。

稳定编号 M001–M030 决定方法页面地址，更新标题时应保留编号。新增条目时同时更新数据、解释、别名与核验计数，并修改验证脚本中对应的总数。每次更新执行构建和检查。

筛选条件保存在查询参数中。所有本地资源使用相对路径，兼容项目型 GitHub Pages 的 `/math-methods-atlas/` 子路径和直接打开生成文件。没有外部字体、分析追踪或服务端依赖。

## 来源和贡献

分类来源为 Mathematical Reviews 与 zbMATH 联合维护的 [MSC2020](https://msc2020.org/)，来源标注 CC BY-NC-SA，具体授权以官方说明为准。中文简称、导航归组和方法说明为本项目整理。来源链接仅提供阅读入口，不表示所有条目已经完成学术核验。

补充建议请注明方法编号、具体修改内容、论文或专著链接，以及定理编号、章节或页码。未经核实的迁移设想应标注为待验证。
