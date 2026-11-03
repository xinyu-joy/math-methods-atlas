// A locator is a reading entry point, not a claim that every theorem in the
// method family has been audited. Each record states the actual reading depth.
export const methodReferences = {
  M001: [{
    title: 'Set Theory and Forcing Lecture Notes',
    authors: 'Jean-Louis Krivine；Christian Rosendal 译；Jessica Schirle 排印',
    year: '版本年份未标明（排印说明提及 2018 年课程）',
    url: 'https://cpb-us-e2.wpmucdn.com/sites.uci.edu/dist/0/3985/files/2020/01/set-theory.pdf',
    locator: '§4.1 Model Theory for U-formulas，p.33；§7.1–7.6，pp.49–60，含 Generic Extensions、Truth Lemma 与 ZFC + ¬CH。',
    supports: '提供从模型与泛型扩张进入强迫法、相对一致性问题的阅读路径。',
    reviewLevel: 'contents',
    checked: '目录与编者说明已核对',
    limitation: '尚未逐步核对强迫构造及真值引理的证明；具体元理论和模型假设必须按正文检查。'
  }],
  M002: [{
    title: 'Mathematics for Computer Science',
    authors: 'Eric Lehman、F. Thomson Leighton、Albert R. Meyer',
    year: '2015（5 月 18 日修订）',
    url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf',
    locator: '第5章 Induction；§5.4 State Machines，Definition 5.4.5 与 Invariant Principle，书页135；第6章 Recursive Data Types。',
    supports: '把归纳用于离散结构，并用状态机不变量证明可达状态的性质与程序部分正确性。',
    reviewLevel: 'text',
    checked: '目录与不变量原理正文已核对',
    limitation: '不变量通常只给部分正确性；终止性需要额外论证，本次未覆盖所有递归或超限归纳形式。'
  }],
  M003: [{
    title: 'Introduction to Theoretical Computer Science：Polynomial-time reductions',
    authors: 'Boaz Barak',
    year: '在线版（访问 2026-11-03）',
    url: 'https://introtcs.org/public/lec_12_NP.html',
    locator: '章节 Polynomial-time reductions 的导言、Formal definitions of problems 及随后归约定义。',
    supports: '将已知困难问题变换为目标问题，用归约传递算法或条件性的计算困难结论。',
    reviewLevel: 'text',
    checked: '正文导言与问题定义已核对',
    limitation: '此入口聚焦多项式时间归约和判定问题；归约方向、计算模型及归约类型不能省略。'
  }],
  M004: [{
    title: 'Introduction to Representation Theory',
    authors: 'Pavel Etingof、Oleg Golberg、Sebastian Hensel、Tiankai Liu、Alex Schwendner、Dmitry Vaintrob、Elena Yudovina',
    year: '2009；arXiv v5 标注 2011',
    url: 'https://arxiv.org/pdf/0901.0827',
    locator: '§1.3 Representations，p.7；§2.1 Semisimple representations，p.23；§3.1 Maschke’s theorem，p.33；§3.9 Tensor product multiplicities，p.42。',
    supports: '以线性表示、不可约分解和特征标处理对称结构及张量积的分解问题。',
    reviewLevel: 'contents',
    checked: '目录已核对',
    limitation: '这里定位的是代数与有限群表示入门；未据此核验任意 Lie 群、无限维表示或物理系统的分解条件。'
  }],
  M005: [{
    title: 'Ideals, Varieties, and Algorithms，第4版作者目录',
    authors: 'David A. Cox、John Little、Donal O’Shea',
    year: '2015（第4版）',
    url: 'https://dacox.people.amherst.edu/iva/toc.html',
    locator: '第2章 §5 Gröebner Bases、§7 Buchberger’s Algorithm、§8 Applications；第3章 §1 Elimination and Extension、§3 Implicitization。',
    supports: '定位多项式理想的算法计算、消元和隐式化问题的标准阅读章节。',
    reviewLevel: 'contents',
    checked: '作者目录已核对',
    limitation: '本次取得目录，未核对书中算法证明或复杂度；域、单项式序及消元定理的假设仍需逐项核验。'
  }],
  M006: [{
    title: 'Algebraic Topology：作者提供的分章版本',
    authors: 'Allen Hatcher',
    year: '2002',
    url: 'https://pi.math.cornell.edu/~hatcher/AT/ATchapters.html',
    locator: '第2章 Homology，书页97–184；第3章 Cohomology，书页185–260。',
    supports: '为利用同调和上同调不变量研究拓扑空间与映射提供标准教材入口。',
    reviewLevel: 'contents',
    checked: '作者分章目录与页码已核对',
    limitation: '尚未逐个核验计算或同构定理；此处覆盖代数拓扑，不代表已覆盖层上同调、导出范畴等全部分支。'
  }],
  M007: [{
    title: 'The Stacks Project：Descent data for quasi-coherent sheaves',
    authors: 'The Stacks Project Authors',
    year: '持续更新（访问 2026-11-03）',
    url: 'https://stacks.math.columbia.edu/tag/023A',
    locator: 'Tag 023A；§35.2；Definition 35.2.1 的下降数据及三重纤维积上的 cocycle condition。',
    supports: '说明怎样记录局部拟凝聚层及重叠区域的相容同构，以提出局部对象能否下降到整体的问题。',
    reviewLevel: 'text',
    checked: '定义与相邻说明正文已核对',
    limitation: '该页主要定义下降数据；完整有效下降定理需要后续章节。它不证明所有数论问题都满足局部到整体原则。'
  }],
  M008: [{
    title: 'Analytic Combinatorics：作者介绍与详细目录',
    authors: 'Philippe Flajolet、Robert Sedgewick',
    year: '作者在线目录（访问 2026-11-03）',
    url: 'https://sedgewick.io/books/analytic-combinatorics/',
    locator: 'Part A，第I章 Ordinary GFs、第II章 Exponential GFs、第III章 Multivariate GFs；Part B，第VI章 Singularity Analysis。',
    supports: '把组合构造编码为生成函数，再通过复分析获得计数的渐近行为。',
    reviewLevel: 'contents',
    checked: '作者简介与详细目录已核对',
    limitation: '目录定位不等于转移定理或鞍点法证明核验；适用的解析域、奇点类型与一致性条件仍需查正文。'
  }],
  M009: [{
    title: 'The Probabilistic Method：Lecture Notes',
    authors: 'Jiří Matoušek、Jan Vondrák',
    year: '2008（3 月修订）',
    url: 'https://www.cs.cmu.edu/afs/cs.cmu.edu/academic/class/15850-f20/www/handouts/matousek-vondrak-prob-ln.pdf',
    locator: '第2章 The Probabilistic Method，p.11；第3章 Linearity of Expectation，p.18；第5章 The Second Moment，p.24；§6.1 Lovász Local Lemma，p.33。',
    supports: '为通过随机选择、期望、二阶矩或局部引理证明组合对象存在提供分层阅读路线。',
    reviewLevel: 'contents',
    checked: '目录、版本与前言已核对',
    limitation: '本条尚未逐证核验这些存在性定理；存在证明是否能有效构造对象需要另行分析。'
  }],
  M010: [{
    title: 'On the Size of Kakeya Sets in Finite Fields',
    authors: 'Zeev Dvir',
    year: '2008',
    url: 'https://arxiv.org/pdf/0803.2336',
    locator: '§1.1，Theorem 3 及证明，PDF p.3；§2，Lemma 2.1（Schwartz–Zippel）。',
    supports: '展示把几何点集嵌入低次多项式消失问题，再由零点约束推出有限域 Kakeya 集大小下界。',
    reviewLevel: 'text',
    checked: 'Theorem 3 陈述、证明段落与 Lemma 2.1 陈述已核对',
    limitation: '这是有限域 Kakeya 问题的具体成功案例，不代表实数域 Kakeya 问题或所有多项式方法变体都已解决。'
  }],
  M011: [{
    title: 'EE261：The Fourier Transform and Its Applications',
    authors: 'Brad G. Osgood',
    year: '在线课程（访问 2026-11-03）',
    url: 'https://see.stanford.edu/Course/EE261',
    locator: 'Lecture 3：Convergence；Lecture 4：Orthogonality、Rayleigh’s Identity、Heat Equation；Lecture 9：Convolution；Lecture 11：Schwartz Space。',
    supports: '建立从频率分解与收敛方式，到卷积和热方程求解的阅读路径。',
    reviewLevel: 'contents',
    checked: '官方课程内容与讲次定位已核对',
    limitation: '本次未逐段观看讲课或核验全部证明；此入口以经典 Fourier 分析为主，不覆盖一般群上的全部调和分析。'
  }],
  M012: [{
    title: '18.102 Introduction to Functional Analysis：Complete Lecture Notes',
    authors: 'Casey Rodriguez 授课；Andrew Lin 笔记',
    year: '2021',
    url: 'https://ocw.mit.edu/courses/18-102-introduction-to-functional-analysis-spring-2021/8fb8d5c170f1613151aca71de21027bc_MIT18_102s21_full_lec.pdf',
    locator: 'Theorem 232（Spectral theorem）及前面的 maximum principle 推导，PDF p.117。',
    supports: '在可分 Hilbert 空间的紧自伴算子情形，说明特征向量展开与变分选择特征值的联系。',
    reviewLevel: 'text',
    checked: '定理陈述与相邻证明段落已核对',
    limitation: '该结论的紧性和自伴性不可省略；不据此推广到一般非正规算子或无界算子的连续谱。'
  }],
  M013: [{
    title: 'Calculus of Variations',
    authors: 'Thomas Schmidt',
    year: '2020（3 月 9 日版本）',
    url: 'https://www.math.uni-hamburg.de/en/forschung/bereiche/am/geom-part-differentialgleichungen/dokumente/calcvar.pdf',
    locator: '§2.1 The direct method，书页15–17，abstract existence theorem for minimizers；§2.3 Coercivity, weak compactness, and existence。',
    supports: '通过下水平集紧性或序列紧性，以及下半连续性，证明极小解存在。',
    reviewLevel: 'text',
    checked: '抽象存在定理、假设及相邻说明正文已核对',
    limitation: '具体泛函仍需证明紧性和下半连续性；此定理本身不保证唯一性、正则性或计算算法收敛。'
  }],
  M014: [{
    title: '18.S190 Lecture 5：Complete Metric Spaces',
    authors: 'Paige Bright',
    year: '2023',
    url: 'https://ocw.mit.edu/courses/18-s190-introduction-to-metric-spaces-january-iap-2023/mit18_s190iap23_lec5.pdf',
    locator: 'Lecture 5，§1：Definition 6（Contraction），p.2；Theorem 8（Banach Fixed Point Theorem）及证明，p.3。',
    supports: '在非空完备度量空间上，以压缩映射迭代构造唯一不动点，并用几何级数估计证明迭代序列收敛。',
    reviewLevel: 'text',
    checked: '压缩定义、Theorem 8 陈述与证明段落已核对',
    limitation: '本条核对的是 Banach 压缩映射情形；Brouwer、Schauder 等定理的存在性、唯一性和迭代保证不能与之互换。'
  }],
  M015: [{
    title: 'The Concentration-Compactness Principle in the Calculus of Variations. The Locally Compact Case, Part 1',
    authors: 'Pierre-Louis Lions',
    year: '1984',
    url: 'https://ems.press/content/serial-article-files/17555?nt=1',
    locator: 'Annales de l’Institut Henri Poincaré, Analyse Non Linéaire 1(2)，pp.109–145；Introduction 与 §I 的 Lemma I.1 及其使用说明。',
    supports: '识别变分极小化序列的失紧机制，并说明如何通过排除消失、分裂等行为恢复有效紧性。',
    reviewLevel: 'text',
    checked: '摘要、引言与引理使用说明已核对',
    limitation: '本次没有逐行复核原文全部证明；原文的 locally compact case 不覆盖所有临界或缩放失紧情形。'
  }],
  M016: [{
    title: 'Notes on Partial Differential Equations',
    authors: 'John K. Hunter',
    year: '2014（6 月 18 日修订）',
    url: 'https://math.ucdavis.edu/~hunter/pdes/pde_notes.pdf',
    locator: '§2.3 Maximum Principle：Theorems 2.17、2.18（PDF pp.33–34）；第7章 Wave Equation。',
    supports: '通过调和函数的最大值原理给出边界控制，并推出 Poisson–Dirichlet 问题解的唯一性。',
    reviewLevel: 'text',
    checked: 'Theorems 2.17、2.18 陈述与证明段落已核对；波动方程部分仅目录定位',
    limitation: '所读正文覆盖经典调和函数的最大值原理；不同方程的能量估计、弱解和正则性要求需另行核验。'
  }],
  M017: [{
    title: 'Underactuated Robotics：Lyapunov Analysis',
    authors: 'Russ Tedrake',
    year: '持续更新的在线讲义（访问 2026-11-03）',
    url: 'https://underactuated.mit.edu/lyapunov.html',
    locator: 'Chapter 9：Lyapunov’s Direct Method、Global Stability、LaSalle’s Invariance Principle。',
    supports: '用候选函数的正定性及沿轨道导数条件，区分稳定、渐近稳定和整体稳定问题。',
    reviewLevel: 'text',
    checked: '相关定理陈述与说明正文已核对',
    limitation: '讲义声明这里汇总定理而不提供证明；具体光滑性、定义域、轨道存在性及整体条件仍须逐项检查。'
  }],
  M018: [{
    title: 'Asymptotic Analysis and Singular Perturbation Theory',
    authors: 'John K. Hunter',
    year: '2004（2 月）',
    url: 'https://www.math.ucdavis.edu/~hunter/notes/asy.pdf',
    locator: '§1.1 Perturbation theory and asymptotic analysis；第2章 Asymptotic Expansions，p.19；第4章 Matched Asymptotic Expansions，p.49；第5章 Multiple Scales，p.73。',
    supports: '按小参数构造近似，并为边界层匹配和多尺度展开提供阅读路线。',
    reviewLevel: 'text',
    checked: '目录与§1.1正文已核对',
    limitation: '作者明确区分形式推导和严格误差分析；不能把形式展开直接登记为具有一致误差界的定理。'
  }],
  M019: [{
    title: 'Homogenization and Two-Scale Convergence',
    authors: 'Grégoire Allaire',
    year: '1992',
    url: 'https://epubs.siam.org/doi/10.1137/0523084',
    locator: 'SIAM Journal on Mathematical Analysis 23(6)，pp.1482–1518；出版社 Abstract 两段。',
    supports: '摘要明确将双尺度收敛、相应紧性与周期振荡系数的线性和非线性椭圆方程均匀化相联系。',
    reviewLevel: 'abstract',
    checked: '出版社摘要已核对',
    limitation: '本次未取得出版社全文；不据摘要断言具体收敛速度、误差界，或随机均匀化及无尺度分离情形。'
  }],
  M020: [{
    title: 'Markov Chains and Mixing Times，第2版',
    authors: 'David A. Levin、Yuval Peres；Elizabeth L. Wilmer 参与',
    year: '第2版作者在线稿（访问 2026-11-03）',
    url: 'https://pages.uoregon.edu/dlevin/MARKOV/markovmixing.pdf',
    locator: '§4.2 Coupling and Total Variation Distance，p.49；§5.2 Coupling and Bounding Distance to Stationarity，p.62；§17.2 Optional Stopping Theorem，p.244。',
    supports: '把共同概率空间的耦合用于分布距离和混合时间估计，并提供鞅与可选停止的定位入口。',
    reviewLevel: 'contents',
    checked: '目录与版本标识已核对',
    limitation: '尚未逐条核验停时定理的适用条件；这里以 Markov 链为主，不覆盖全部连续时间随机分析。'
  }],
  M021: [{
    title: 'The Probabilistic Method：Strong Concentration Around the Expectation',
    authors: 'Jiří Matoušek、Jan Vondrák',
    year: '2008（3 月修订）',
    url: 'https://www.cs.cmu.edu/afs/cs.cmu.edu/academic/class/15850-f20/www/handouts/matousek-vondrak-prob-ln.pdf',
    locator: '§7.2 Sums of Bounded Independent Random Variables；Theorem 7.2.1，书页43；随后 Randomized rounding 示例。',
    supports: '给有界独立随机变量之和的偏离概率上界，并展示随机舍入中的使用。',
    reviewLevel: 'text',
    checked: '定理陈述与相邻应用段落已核对',
    limitation: '这里要求独立且有界；不能直接用于任意重尾、强依赖序列，也不等于渐近大偏差原理。'
  }, {
    title: '6.265/15.070J Lecture 3：Large Deviations Theory, Cramér’s Theorem',
    authors: 'MIT OpenCourseWare 课程讲义',
    year: '2013（9 月 11 日）',
    url: 'https://ocw.mit.edu/courses/15-070j-advanced-stochastic-processes-fall-2013/f536bc29826255afee543b03b605bf4d_MIT15_070JF13_Lec3.pdf',
    locator: '§1 Theorem 1，pp.1–2；§2 Properties of the Rate Function；§3 Change of Measure。',
    supports: '以开集下界、闭集上界及率函数描述独立同分布样本均值的罕见偏离。',
    reviewLevel: 'text',
    checked: '定理陈述、引言与证明范围说明已核对',
    limitation: '讲义注明只证明矩母函数处处有限且分布支持无界向两侧延伸的特殊情形；本条不扩大其证明范围。'
  }],
  M022: [{
    title: 'STATS 200 Lecture 13：Maximum Likelihood Estimation',
    authors: 'Zhou Fan（Stanford STATS 200）',
    year: '2016',
    url: 'https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture13.pdf',
    locator: '§13.1 Definition，p.13-1；§13.2 Examples，pp.13-2–13-4。',
    supports: '在给定参数化观测模型下构造似然，并通过最大化似然得到参数估计。',
    reviewLevel: 'text',
    checked: '定义与示例正文已核对',
    limitation: '此讲定义估计量及计算示例；一致性、渐近正态性、边界参数和模型错设需要其他定理。'
  }, {
    title: 'STATS 200 Lecture 20：Bayesian Analysis',
    authors: 'Zhou Fan（Stanford STATS 200）',
    year: '2016',
    url: 'https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture20.pdf',
    locator: '§20.1 Prior and Posterior，式(20.1)、(20.2)；§20.2 Point Estimates and Credible Intervals，p.20-4。',
    supports: '说明先验与似然如何形成后验，并从后验获得点估计和可信区间。',
    reviewLevel: 'text',
    checked: '定义、公式与示例正文已核对',
    limitation: '可信区间的后验概率解释不自动等于频率学覆盖率；先验敏感性和计算收敛尚未在此核验。'
  }],
  M023: [{
    title: 'Lecture Notes for Statistics 311 / Electrical Engineering 377',
    authors: 'John Duchi',
    year: '2016（2 月 23 日版本）',
    url: 'https://web.stanford.edu/class/stats311/OldSyllabi/full_notes.pdf',
    locator: '第13章 Minimax Lower Bounds，pp.137–153；§13.2.1 From Estimation to Testing；第16章 Global Fano Method，p.174。',
    supports: '先指定参数类和损失，再将估计转化为检验，用 Le Cam、Fano 或 Assouad 方法建立极小极大风险下界。',
    reviewLevel: 'text',
    checked: '第13章框架、归约说明正文与第16章目录已核对',
    limitation: '正文中的下界针对具体统计实验和损失；本次未逐个重算示例的常数或证明所有下界可达。'
  }],
  M024: [{
    title: 'Convex Optimization：5. Duality（作者课程讲义）',
    authors: 'Stephen Boyd、Lieven Vandenberghe；修订讲义另署 Parth Nobel',
    year: '在线修订版（访问 2026-11-03）',
    url: 'https://stanford.edu/class/ee364a/lectures/duality.pdf',
    locator: '讲义页5.3：对偶下界；5.12–5.13：弱/强对偶与 Slater 条件；5.20–5.21：KKT 条件及凸问题。',
    supports: '区分对偶给下界、约束资格保证强对偶，以及可微凸问题中 KKT 条件的必要性和充分性。',
    reviewLevel: 'text',
    checked: '相关定义、条件与推导正文已核对',
    limitation: '核对的是作者官方讲义中的相应页，不是整本专著；非凸驻点、非光滑优化和无穷维对偶需另立条件。'
  }],
  M025: [{
    title: '6.231 Lecture 2：The Basic Problem, Principle of Optimality, The General DP Algorithm, State Augmentation',
    authors: 'Dimitri P. Bertsekas',
    year: '2015',
    url: 'https://ocw.mit.edu/courses/6-231-dynamic-programming-and-stochastic-control-fall-2015/2beec55b0de261096962e514febe3b5c_MIT6_231F15_Lec2.pdf',
    locator: '第3页 Principle of Optimality；第6–7页 DP Algorithm 与归纳步骤；第9页 State Augmentation。',
    supports: '以有限时域成本到达函数反向递推最优策略，并用状态扩充处理需要保留历史信息的模型。',
    reviewLevel: 'text',
    checked: '递推公式、归纳步骤与状态扩充正文已核对',
    limitation: '此讲聚焦有限时域基本模型；无穷时域、部分可观测、连续时间 HJB 及近似算法需额外假设。'
  }],
  M026: [{
    title: 'Structured Semidefinite Programs and Semialgebraic Geometry Methods in Robustness and Optimization',
    authors: 'Pablo A. Parrilo',
    year: '2000',
    url: 'https://thesis.caltech.edu/1647/1/Parrilo-Thesis.pdf',
    locator: '第4章；§4.2 Sums of Squares，书页39–43（含 Motzkin 反例及多项式下界）；§4.4.2 Positivstellensatz，书页51起。',
    supports: '用平方和表示构造多项式非负的充分证书，并将可计算证书用于优化下界。',
    reviewLevel: 'text',
    checked: '§4.2相关正文、反例与应用段落已核对；§4.4.2已定位',
    limitation: '原文明确非负多项式不一定是平方和，且可能有松弛间隙；本次未核验所有层级收敛或数值证书的精确性。'
  }],
  M027: [{
    title: 'Computational Optimal Transport',
    authors: 'Gabriel Peyré、Marco Cuturi',
    year: '2018；本次读取 arXiv v4（2020）HTML 版',
    url: 'https://arxiv.org/html/1803.00567v4',
    locator: '§2.3 Kantorovich Relaxation，式(2.10)；第4章 Entropic Regularization，§4.1–4.2。',
    supports: '以指定边缘分布的耦合表示质量运输，并解释熵正则化和 Sinkhorn 迭代在计算中的作用。',
    reviewLevel: 'text',
    checked: '§2.3定义与第4章引言正文已核对；§4.1–4.2目录已定位',
    limitation: '已从摘要推进到部分正文，但尚未逐证核验 Sinkhorn 收敛率或连续问题的存在唯一性；熵正则化会改变原问题。'
  }],
  M028: [{
    title: 'Discrete Inverse Problems: Insight and Algorithms：作者课程指南',
    authors: 'Per Christian Hansen',
    year: '作者在线指南（访问 2026-11-03）',
    url: 'https://people.compute.dtu.dk/pcha/DIPbook.html',
    locator: '第4章 §4.1–4.4、§4.7：Regularization Methods；第5章 §5.1–5.6：Regularization Parameters；第6章 §6.1–6.3：Iterative Regularization。',
    supports: '为病态离散反演的正则化方法、正则参数选择和迭代方法提供阅读路径。',
    reviewLevel: 'contents',
    checked: '作者课程指南与章节定位已核对',
    limitation: '本次未读取书中完整误差定理；稳定性、收敛速度与可恢复性需要指定前向模型、噪声和先验。'
  }],
  M029: [{
    title: 'Finite Element Methods for PDEs',
    authors: 'Patrick E. Farrell',
    year: '2021（Hilary Term）',
    url: 'https://people.maths.ox.ac.uk/farrellp/femvideos/notes.pdf',
    locator: '§1.2–1.3：变分形式与 Galerkin；§7.2 Galerkin Orthogonality，书页54；§7.3 Lemma 7.3.1（Céa），书页55。',
    supports: '把连续弱问题投影到离散空间，并以连续性、强制性及 Galerkin 正交性导出拟最优误差界。',
    reviewLevel: 'text',
    checked: '变分形式、Galerkin 正交性与 Céa 引理陈述及推导已核对',
    limitation: '这里核对的是相容 Galerkin 的强制型情形；混合方法、非相容离散及强对流问题需其他稳定性分析。'
  }],
  M030: [{
    title: 'Iterative Methods for Sparse Linear Systems，第2版目录',
    authors: 'Yousef Saad',
    year: '第2版；作者目录文件标注 2004-07-19',
    url: 'https://www-users.cse.umn.edu/~saad/toc.pdf',
    locator: '§6.5 GMRES，p.164；§6.7 Conjugate Gradient，p.187；§6.11 Convergence Analysis，p.198；第9章 Preconditioned Iterations，p.261。',
    supports: '定位稀疏线性系统的 Krylov 迭代、收敛分析以及预条件 CG 和 GMRES。',
    reviewLevel: 'contents',
    checked: '作者目录与页码已核对',
    limitation: '全文链接本次读取未成功，不能声称算法证明已审；矩阵结构、预条件器、停止准则和舍入误差需按具体方法核验。'
  }]
};

export const referenceAudit = {
  date: '2026-11-03',
  scope: '现有 M001–M030 共30个方法族的首轮文献定位；不是全数学方法普查或完整证明审计。',
  recordCount: 32,
  counts: { text: 21, contents: 10, abstract: 1 },
  policy: '所有条目实际检索并打开来源；逐条区分正文、目录、课程说明与摘要。目录和摘要不计为定理级核验。',
  pageConvention: '优先使用书籍印刷页码或讲义自身编号；标注 PDF 页时按阅读器从1开始计数。',
  limitations: '部分作者页面只提供目录或课程说明；Allaire 条目保留摘要粒度。网页会更新，后续引用应记录版本并复核精确假设。'
};
