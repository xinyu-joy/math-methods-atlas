# 数学方法地图：维护说明

公开网站 https://xinyu-joy.github.io/math-methods-atlas/ 。当前内容版本 v0.3，日期 2026-11-06。

## 内容文件

| 文件 | 内容 |
| --- | --- |
| `src/data.mjs` | 63 学科、30 方法族的基础信息；每个方法最后一项是永久编号 |
| `src/editorial.mjs` | 中英文别名、直观解释、问题入口 |
| `src/subject-guides.mjs` | 20 个原缺内容学科的研究问题、分支、路径、阅读位置、待办 |
| `src/method-references.mjs` | 各方法的文献、定位、支持内容与核对限制 |
| `src/verified-claims.mjs` | 5 个具体结论核验示范和 3 条跨领域联系 |
| `src/catalog.mjs` | 整合条目与按实际内容计算进度 |

方法编号 M001–M030 随基础记录保存，改名和排序时保留编号；别名与解释仍按编号对应，不随数据排列改变。结论与联系分别使用 C、B 编号。任何编号发布后不重复使用，不随标题改变链接。

## 核验规则

1. 学科导读、独立方法、具体命题是不同统计单位。当前 20 篇专门导读与另 43 个学科的方法索引合计覆盖全部目录，但不代表全面研究完成。
2. 引用记录写明作者、年份或版本、URL、章节/定理/页码、支持范围、实际检查粒度。只检查目录或摘要时明确写出，不计为正文核验。
3. 具体命题须给全假设、结论、逐步推导、可复算例子、失效边界和准确来源。本版 5 条仅为编辑核验示范，未经独立同行审阅，不是形式化证明验证。
4. 方法族不能因一条命题已核验就整体标为已核验。研究联系注明既有依据；编辑提出的问题必须独立标记待验证和未系统查新。
5. 新增或修改结论的例算时，同步更新 `scripts/verify-examples.mjs`。该程序以整数和有理数复算当前五个特定例子，不证明一般结论。

## 构建与检查

需要 Node.js 22.12 或更新版本。构建时使用锁定版本的 KaTeX，生成 HTML 与 MathML，样式、字体和许可证随静态站点分发，读者离线也可阅读公式。

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run dev
```

构建后可以直接打开 `dist/index.html` 离线阅读。源数据会生成 JSON、方法 CSV 和学科导读 CSV，例算记录由程序实际执行后生成。`downloads/math-atlas-v0.1.xlsx` 是历史工作簿，不包含 v0.2 新内容，界面须保留该说明。

`verify.mjs` 检查全部生成页面、内部链接与锚点、条目身份、来源字段、20 个原缺内容学科和统计口径。内容规模改变时，应审核并同步修改发布验收数量；不要为了通过检查把新内容算进错误类别。

## 发布

仓库根目录 `.github/workflows/math-atlas-pages.yml` 在推送 `main` 后执行生成、内容与链接检查，然后发布 `math-atlas/dist` 到 GitHub Pages。数学例算在构建阶段执行。PR 只构建和检查，不部署。

默认仓库为 `xinyu-joy/math-methods-atlas`；`GITHUB_REPOSITORY` 可替换目标，`SITE_URL` 可指定规范网址。全部站内资源使用相对路径。读者不需要登录 GitHub。

## 来源

学科分类由 Mathematical Reviews 与 zbMATH 的 MSC2020 提供，原分类资料标明 CC BY-NC-SA，具体条款以官方说明为准。各导读保留原始来源与实际核对范围。不转载专著或论文全文。

## v0.3 深度批次

- `src/deep/*.json`：六个具体方法 D001–D006、核心书籍与补充来源、七个新增学科导读、实际检索记录。根对象为 methods、books（兼含 notes/paper）、subjectGuides、retrievalLog。
- `src/deep-catalog.mjs`：整合批次，分别统计具体方法、方法家族、书籍与实际阅读。
- `scripts/deep-pages.mjs`：生成具体方法页、书目来源页、检索入口和覆盖矩阵。
- `scripts/verify-deep-examples.mjs`：精确有理数、多项式恒等式、矩阵秩、联合转移核、有限元组装与积分检查；不证明一般定理。
- `research/batch03-audit.json`：内容审计、样板选择依据、书目缺口与下一批可执行任务。
- `research/batch03-contract.json`：内容字段约定；不是完成状态清单。

原有 M 方法家族链接不变。D 方法路径使用 `methods/<family-id>/<stable-slug>/index.html`，来源为 `library/<source-id>/index.html`；发布后不复用 ID 或修改 slug。一个来源版本单独建记录，其阅读位置可以有多段；不同版本不能混用页码。新增条目后须检查重复 DOI／版本与所有引用。

新页面支持 $...$ 行内公式和独立 formulas 数组。文字由模板转义，公式在构建时严格解析；不信任任意 HTML。关键词按中英文、别名、定义及正文建立索引，书目按编号、作者、版本信息及阅读范围检索，筛选结果保存在 URL。

本批补 MSC 13、47、55、60、65、81、90 导读，其余学科按覆盖矩阵保留待补。不能因为方法关联数增加而把学科标为研究完成。目录与章节摘要使用 contents；仅已读正文片段使用 excerpt；chapter 限定为确实完整读过的相关章节。复算、假设检查和外部同行审阅是独立字段。

读者从 `coverage/index.html` 下载本批来源、具体方法、检索日志、审计与例算记录。`downloads/atlas.json` 同时保存历史家族数据和新增具体方法。历史 Excel 仍是 v0.1，不声称已同步。站点不分发书籍或论文全文。
