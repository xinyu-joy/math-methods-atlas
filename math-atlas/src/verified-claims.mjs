// Each record concerns one stated mathematical result, never an entire method family.
// The derivations and small examples below are project-written checks, not peer review.
export const claimAudit = {
  date: '2026-11-03',
  scope: '5 个限定范围的结论已对照开放来源，重写推导并逐项例算；3 条跨领域联系有既有文献依据。',
  reviewLevel: '项目内来源对照与推导复核，尚未经独立同行审阅或形式化证明。',
  numericalScope: '小例子的精确计算只检查该例，不替代一般证明，也不说明大型数值算法的稳定性。'
};

const contractionSource = {
  title: 'John K. Hunter、Bruno Nachtergaele — Applied Analysis，第 3 章',
  url: 'https://www.math.ucdavis.edu/~hunter/book/ch3.pdf',
  locator: '§3.1，Definition 3.1、Theorem 3.2 及证明，书页 61–63（本章 PDF 第 1–3 页）',
  checked: '已读取原文页面，核对压缩常数、完备性、不动点唯一性及迭代证明。'
};
const lyapunovSource = {
  title: 'Stephen Boyd — EE363: Linear quadratic Lyapunov theory',
  url: 'https://ee363.stanford.edu/archive/lectures/lq-lyap.pdf',
  locator: '讲义页 13–2 至 13–4：Lyapunov equation、boundedness condition、stability condition',
  checked: '已核对 AᵀP + PA = −Q、正定条件以及 V 的指数衰减不等式。'
};
const sosSource = {
  title: 'Pablo A. Parrilo — Polynomial Optimization, Sums of Squares, and Applications',
  url: 'https://www.mit.edu/~parrilo/sdocag/SIAMBookFinalvNov12-2012.pdf',
  locator: 'Semidefinite Optimization and Convex Algebraic Geometry 作者预印本，第 3 章 §3.1.4，式 (3.11)–(3.12)、Theorem 3.39，书页 64–65',
  checked: '已核对完整单项式向量、系数匹配、半正定约束和多元 SOS 等价表述。'
};
const dualitySource = {
  title: 'Stephen Boyd — Convex Optimization I, Lecture 08（Stanford 公开课逐字稿）',
  url: 'https://see.stanford.edu/materials/lsocoee364a/transcripts/ConvexOptimizationI-Lecture08.html',
  locator: '页面中 Lagrange dual function / lower bound 的推导，以及 weak and strong duality 段落；对应教材第 5 章',
  checked: '已核对不等式乘子的非负号、可行点上的下界推导，以及弱对偶不要求原问题凸。'
};
const ceaSource = {
  title: 'Luca Heltai — Numerical Methods for Partial Differential Equations, Lecture 1',
  url: 'https://luca-heltai.github.io/nmpde/lectures/lecture-01/',
  locator: '§3 的有界性与强制性；§5 Galerkin orthogonality；§6 Theorem 2 (Céa’s lemma)，式 (15)–(17)',
  checked: '已核对相容子空间、Galerkin 正交性、M/α 常数和误差估计证明。'
};

export const claims = [
  {
    id: 'C001',
    title: '压缩映射：唯一不动点与可计算的迭代误差界',
    methodIds: ['M014'],
    question: '反复执行一个修正步骤，何时保证收敛到唯一答案？',
    assumptions: [
      '(X, d) 是非空完备度量空间；T 是从 X 到 X 的映射。',
      '存在对全部 x、y 都适用的常数 0 ≤ q < 1，使 d(Tx, Ty) ≤ q d(x, y)。',
      '任取 x₀ ∈ X，使用精确迭代 xₙ₊₁ = T(xₙ)；这里没有加入舍入误差或随机扰动。'
    ],
    statement: 'T 存在唯一不动点 x*。每个初值的迭代都收敛到 x*；对 n ≥ 1，有 d(xₙ, x*) ≤ qⁿ d(x₁, x₀)/(1 − q)。',
    proof: [
      '逐次使用压缩条件，得 d(xₖ₊₁, xₖ) ≤ qᵏ d(x₁, x₀)。',
      '对 m > n，三角不等式与几何级数给出 d(xₘ, xₙ) ≤ Σₖ₌ₙᵐ⁻¹ qᵏ d(x₁, x₀) ≤ qⁿ d(x₁, x₀)/(1 − q)。右端随 n 趋于无穷而趋于 0，所以迭代是 Cauchy 序列。',
      '由完备性存在 x* ∈ X 使 xₙ → x*。压缩条件保证 T 连续，因此 Tx* = lim T(xₙ) = lim xₙ₊₁ = x*。令 m → ∞ 即得所述误差界。',
      '若 y* 也是不动点，则 d(x*, y*) ≤ q d(x*, y*)。因 q < 1，距离只能为 0，故唯一。'
    ],
    example: {
      problem: '在实数上取 T(x) = (x + 2)/3，初值 x₀ = 0。',
      calculation: 'q = 1/3，x* = 1。递推给 x₁ = 2/3、x₂ = 8/9、x₃ = 26/27，并由归纳得 xₙ = 1 − 3⁻ⁿ。误差上界为 (1/3)ⁿ × (2/3)/(1 − 1/3) = 3⁻ⁿ。',
      result: '第三步的真实误差和理论上界均为 1/27；此例恰好取等号。'
    },
    failure: '完备性不可随意删去：在 X = (0, 1) 上，T(x) = x/2 仍是压缩自映射，却没有属于 X 的不动点。q < 1 也不能改成 q ≤ 1：实数上的 T(x) = x + 1 是非扩张映射，却没有不动点。',
    sources: [contractionSource],
    review: {status: '已对照来源并复核推导与例算', scope: '仅上述完备度量空间上的严格压缩映射版本及一个精确标量迭代。', notCovered: '不覆盖 Brouwer、Schauder、随机不动点、非精确迭代或舍入误差分析；未经独立同行审阅。'}
  },
  {
    id: 'C002',
    title: '正定二次 Lyapunov 证书给出线性系统指数稳定性',
    methodIds: ['M017'],
    question: '怎样用一个矩阵恒等式证明所有初值的状态都衰减？',
    assumptions: [
      '考虑有限维实自治连续时间系统 ẋ = Ax，其中 A 是常矩阵，t ≥ 0。',
      '存在实对称正定矩阵 P、Q，满足 AᵀP + PA = −Q。',
      '使用欧氏范数；λmin、λmax 分别表示实对称矩阵的最小、最大特征值。'
    ],
    statement: '令 c = λmin(Q)/λmax(P) > 0，则 ‖x(t)‖ ≤ √(λmax(P)/λmin(P)) exp(−ct/2) ‖x(0)‖。因此原点全局指数稳定。',
    proof: [
      '取 V(x) = xᵀPx。正定性给 λmin(P)‖x‖² ≤ V(x) ≤ λmax(P)‖x‖²。',
      '沿任意轨道，V̇ = xᵀ(AᵀP + PA)x = −xᵀQx ≤ −λmin(Q)‖x‖² ≤ −cV。',
      '因此 d(exp(ct)V(t))/dt ≤ 0，积分得 V(t) ≤ exp(−ct)V(0)。',
      '把 V 两侧的特征值界代回，再开平方，即得状态范数的全局指数界。常系数线性系统的解对全部 t ≥ 0 存在。'
    ],
    example: {
      problem: '取 A = diag(−1, −2)、P = I₂、Q = diag(2, 4)，初值 x(0) = (1, 1)。',
      calculation: 'AᵀP + PA + Q = 0；V = x₁² + x₂²，V̇ = −2x₁² − 4x₂² ≤ −2V。显式解是 x(t) = (exp(−t), exp(−2t))。',
      result: 'c = 2，故 ‖x(t)‖ ≤ √2 exp(−t)；平方后的界 exp(−2t) + exp(−4t) ≤ 2 exp(−2t) 对 t ≥ 0 成立。'
    },
    failure: '若只得到 Q 半正定，本结论不能直接使用。例如 A = [[0, −1], [1, 0]]、P = I₂、Q = 0 满足矩阵等式，但轨道沿圆周旋转，不趋于原点。此时需要额外条件或另用不变集原理。',
    sources: [lyapunovSource],
    review: {status: '已对照来源并复核推导与例算', scope: '仅常系数实线性系统、正定 P 与 Q 的充分条件及显式衰减界。', notCovered: '不覆盖半正定 Q 的可观测性推广、非线性系统全局结论、时变系统或离散时间版本；未经独立同行审阅。'}
  },
  {
    id: 'C003',
    title: '有界次数平方和与半正定 Gram 矩阵的等价性',
    methodIds: ['M026'],
    question: '怎样把一个可检查的多项式非负证书转成矩阵约束？',
    assumptions: [
      'p 是 n 个实变量的实系数多项式，次数不超过 2d，d 为非负整数。',
      'z(x) 按固定顺序包含全部次数不超过 d 的单项式，长度为二项式系数 C(n + d, d)。',
      '多项式恒等式按精确系数匹配理解；Q ⪰ 0 表示实对称半正定，不能仅凭数值容差认定。'
    ],
    statement: 'p 可以写成有限个次数不超过 d 的实多项式平方之和，当且仅当存在 Q ⪰ 0 使 p(x) = z(x)ᵀQz(x) 恒等成立。系数匹配对 Q 是线性条件。',
    proof: [
      '若 p = Σᵢ qᵢ² 且 deg(qᵢ) ≤ d，把 qᵢ 写为 cᵢᵀz。则 Q = Σᵢ cᵢcᵢᵀ 为半正定，且 zᵀQz = p。',
      '反之，实对称半正定 Q 可由谱分解写成 Q = BᵀB。于是 zᵀQz = ‖Bz‖²，各行与 z 的乘积都是次数不超过 d 的多项式，得到平方和。',
      '若从任意有限 SOS 表达出发，平方因子的最高次数 r 不会在求和后全部抵消：最高次齐次部分是若干非零齐次多项式的平方和，不能恒为 0。因此 deg(p) ≤ 2d 时可取 r ≤ d（p = 0 的情形直接取 Q = 0）。',
      '展开 zᵀQz，每个单项式系数是若干 Q 元素之和；与 p 逐项相等，得到线性等式以及 Q ⪰ 0 的可行性问题。'
    ],
    example: {
      problem: '证明 p(x, y) = x⁴ + 2x²y² + y⁴ 非负。取 z = (1, x, y, x², xy, y²)ᵀ。',
      calculation: '令 c = (0, 0, 0, 1, 0, 1)ᵀ，Q = ccᵀ。Q 的非零元素是 Q₄₄ = Q₄₆ = Q₆₄ = Q₆₆ = 1（下标从 1 开始），特征值为 2、0、0、0、0、0。',
      result: 'zᵀQz = (x² + y²)² = p。Q 的秩为 1，证书只需一个平方因子；这是精确系数恒等式。'
    },
    failure: '这给出 SOS 的判据，不意味着所有非负多项式都是 SOS。固定次数或限制基底后的搜索失败不能推出系统不稳定，也不能自动推出 p 在某处为负。浮点求解返回的近似 Q 仍须复核系数残差和半正定性。',
    sources: [sosSource],
    review: {status: '已对照来源并复核推导与例算', scope: '仅实交换多项式、完整次数基底与精确 Gram 等价关系；示例用秩 1 矩阵直接验证。', notCovered: '不覆盖带约束 Positivstellensatz 证书、松弛层级收敛、有理证书恢复或一般 SDP 求解器可靠性；未经独立同行审阅。'}
  },
  {
    id: 'C004',
    title: '拉格朗日弱对偶：可行乘子给出目标值下界',
    methodIds: ['M024'],
    question: '即使尚未找到最优解，怎样证明任何可行方案都不能优于某个界？',
    assumptions: [
      '原问题是在非空定义域 D 上最小化 f₀(x)，满足 fᵢ(x) ≤ 0 和 hⱼ(x) = 0；各函数在 D 上为实值。',
      '取 λᵢ ≥ 0，等式乘子 νⱼ 可为任意实数。定义 L(x, λ, ν) = f₀(x) + Σᵢ λᵢfᵢ(x) + Σⱼ νⱼhⱼ(x)。',
      '定义 g(λ, ν) = infₓ∈D L(x, λ, ν)，允许其值为 −∞；原问题有可行点，最优值按下确界理解。'
    ],
    statement: '对任意原问题可行点 x 和任意 λ ≥ 0、ν，都有 g(λ, ν) ≤ f₀(x)。因此 d* = supλ≥0,ν g(λ, ν) ≤ p*。这个结论不要求原问题凸，也不要求最优点存在。',
    proof: [
      '若 x 可行，则 λᵢfᵢ(x) ≤ 0，且 νⱼhⱼ(x) = 0，所以 L(x, λ, ν) ≤ f₀(x)。',
      '下确界不大于任一点取值，因此 g(λ, ν) ≤ L(x, λ, ν) ≤ f₀(x)。',
      '固定乘子，对全部原问题可行 x 取下确界，得 g(λ, ν) ≤ p*；再对全部 λ ≥ 0、ν 取上确界，得 d* ≤ p*。'
    ],
    example: {
      problem: '求 min x²，约束 x ≥ 1。把约束写成 f₁(x) = 1 − x ≤ 0。',
      calculation: 'L = x² + λ(1 − x) = (x − λ/2)² + λ − λ²/4，因此 g(λ) = λ − λ²/4。取 λ = 2 得 g(2) = 1；可行点 x = 1 的目标值也为 1。',
      result: '下界与可行上界相等，直接证明 p* = 1。该例同时有零对偶间隙，但弱对偶本身并不保证所有问题都如此。'
    },
    failure: '结论只比较原问题可行点。例中 x = 0 虽有更小目标值 0，却违反 x ≥ 1，不能用于否定下界 1。弱对偶不自动带来强对偶、最优解存在或 KKT 条件的充分性。',
    sources: [dualitySource],
    review: {status: '已对照来源并复核推导与例算', scope: '仅实值约束函数在共同定义域上的拉格朗日弱对偶及一维证书。', notCovered: '不覆盖 Slater 条件、强对偶定理、KKT 必要性或无限维对偶；未经独立同行审阅。'}
  },
  {
    id: 'C005',
    title: 'Céa 引理：Galerkin 误差由最佳逼近误差控制',
    methodIds: ['M029'],
    question: '有限维近似空间选定以后，计算解能否接近该空间里最好的近似？',
    assumptions: [
      'V 是实 Hilbert 空间，a: V × V → ℝ 是双线性型；存在 M、α > 0，使 |a(w, v)| ≤ M‖w‖V‖v‖V，a(v, v) ≥ α‖v‖V²。',
      'ℓ 是 V 上有界线性泛函；Vₕ 是 V 的有限维子空间，因而为闭子空间。',
      '连续解 u 满足 a(u, v) = ℓ(v) 对所有 v ∈ V；离散解 uₕ 满足 a(uₕ, vₕ) = ℓ(vₕ) 对所有 vₕ ∈ Vₕ。两者的存在唯一性由 Lax–Milgram 定理保证，此处将其作为前置结果。'
    ],
    statement: '‖u − uₕ‖V ≤ (M/α) infvₕ∈Vₕ ‖u − vₕ‖V。该形式不要求 a 对称；需要相容离散 Vₕ ⊂ V。',
    proof: [
      '令 e = u − uₕ。连续与离散方程相减，得到 Galerkin 正交性 a(e, wₕ) = 0，对所有 wₕ ∈ Vₕ 成立。',
      '任取 vₕ ∈ Vₕ。因为 vₕ − uₕ ∈ Vₕ，有 a(e, e) = a(e, u − vₕ) + a(e, vₕ − uₕ) = a(e, u − vₕ)。',
      '强制性与有界性给出 α‖e‖V² ≤ a(e, e) ≤ M‖e‖V‖u − vₕ‖V。若 e = 0，结论直接成立；否则约去 ‖e‖V。',
      '最后对任意 vₕ 取下确界，得到误差估计。若 a 还对称，则可在能量范数 ‖v‖a = √a(v, v) 下得到最佳逼近等式，但它是额外结构带来的结论。'
    ],
    example: {
      problem: '在 (0, 1) 解 −u″ = 1，u(0) = u(1) = 0。取 V = H₀¹(0, 1)、‖v‖V = ‖v′‖L²，以及节点 0、1/2、1 上的连续分段线性空间。',
      calculation: '精确解 u = x(1 − x)/2。令中点帽函数 φ 在左半段为 2x、右半段为 2(1 − x)。刚度 a(φ, φ) = 4，载荷 ℓ(φ) = 1/2，所以 uₕ = φ/8，中点值为 1/8。误差导数在左半段为 1/4 − x，在右半段为 3/4 − x；两段平方积分各为 1/96。',
      result: 'M = α = 1；‖u − uₕ‖V² = 1/48，故 ‖u − uₕ‖V = 1/(4√3)。对任意系数 c，‖u − cφ‖V² = 1/12 − c + 4c²，在 c = 1/8 处取得同一最小值 1/48。'
    },
    failure: '若 a 缺乏强制性、离散空间不相容，或积分/离散方程被另外近似，不能直接套用此式。固定一个 Vₕ 的估计不等于网格加密必然收敛；还需最佳逼近误差随空间改进趋于 0。',
    sources: [ceaSource],
    review: {status: '已对照来源并复核推导与例算', scope: '仅有界强制实双线性型、相容 Galerkin 近似的 Céa 估计；一维 Poisson 小例采用精确积分。', notCovered: '不重证 Lax–Milgram；不覆盖非相容元、混合元、非强制波动问题、数值积分误差或完整网格收敛率；未经独立同行审阅。'}
  }
];

export const bridges = [
  {
    id: 'B001',
    title: '从不动点到常微分方程：Picard 迭代',
    methodIds: ['M014'],
    sourceProblem: '证明一个映射存在唯一不动点，并得到迭代收敛。',
    sharedStructure: '把解视为函数空间中的一个点，把积分改写视为这个空间上的自映射。',
    targetProblem: '给初值问题 ẋ = f(t, x)、x(t₀) = x₀ 建立局部存在唯一性。',
    conditions: [
      '在包含初值的闭时间—状态邻域内，f 连续，并对状态变量一致 Lipschitz，常数记为 L；在此邻域内 ‖f‖ ≤ M。',
      '取半径 R 的状态球与足够短的时间半宽 h，使 Mh ≤ R 且 Lh < 1，时间区间仍包含在 f 的定义域内。',
      '在取值于该闭球的连续函数空间上使用一致范数。积分算子 (Tx)(t) = x₀ + ∫ₜ₀ᵗ f(s, x(s)) ds 保持该闭集，压缩常数不超过 Lh。'
    ],
    evidence: 'Hunter 与 Nachtergaele 的 §3.5 明确把 ODE 改写为积分不动点问题。Theorem 3.10 及证明处理局部存在，Theorem 3.7 处理更强的全局 Lipschitz 假设。这里采用一个足够短区间上的保守版本，不声称局部 Lipschitz 自动给出全局解。',
    status: '已有文献联系；本项目已核对改写和成立条件',
    sources: [{title: contractionSource.title, url: contractionSource.url, locator: '§3.5，式 (3.25)–(3.30)，Theorem 3.7、Theorem 3.10 及证明，书页 73–76（本章 PDF 第 13–16 页）'}],
    openQuestion: '编辑提出、待文献查新：针对一个具体刚性或多尺度模型，改变函数空间的范数或积分重写能否扩大可证明收敛的时间区间？这是研究问题模板，不是已确认的新问题。'
  },
  {
    id: 'B002',
    title: '从平方和证书到多项式系统的稳定性分析',
    methodIds: ['M026', 'M017'],
    sourceProblem: '用半正定 Gram 矩阵寻找多项式非负性的可检查证书。',
    sharedStructure: 'Lyapunov 条件要求函数及其负轨道导数具有正性；多项式动力学把这些要求变成多项式不等式。',
    targetProblem: '为 ẋ = f(x)、f(0) = 0 的多项式系统搜索 Lyapunov 函数。',
    conditions: [
      '固定多项式动力学 f 和候选 V 的最高次数，要求 V(0) = 0。对固定 ε > 0，可尝试约束 V − ε‖x‖² 和 −∇V·f − ε‖x‖² 都是 SOS。',
      '上述全空间证书保证 V 正定、径向无界和严格下降；结合光滑动力学，可得到全局渐近稳定性。只在区域内验证时，必须另查区域正向不变性和适用的局部定理。',
      'f 固定时，两个 SOS 表达对 V 的系数为仿射；若同时设计反馈与 V，可能出现双线性约束，不能笼统称为一个凸 SDP。',
      '浮点搜索得到候选以后仍需检查精确恒等式、严格裕量和矩阵半正定性。固定次数失败不能判定系统不稳定。'
    ],
    evidence: 'Parrilo 的 §3.6.2 直接展示由 SOS 搜索 Lyapunov 函数的联系。本项目把常被简写的严格正定、径向无界与区域条件显式列出。作为自编小例，ẋ = −x − x³、V = x² 时，取 ε = 1，有 V − x² = 0、−V̇ − x² = x² + 2x⁴，均有显式 SOS 证书。',
    status: '已有文献联系；附本项目的可直接复核示例',
    sources: [
      {title: sosSource.title, url: sosSource.url, locator: '§3.6.2 Lyapunov Functions，书页 136–138，式 (3.45) 及后续 SOS 条件；§3.1.4 提供 Gram 表达。'},
      {title: 'Stephen Boyd — EE363: Basic Lyapunov theory', url: 'https://ee363.stanford.edu/archive/lectures/lyap.pdf', locator: '已核对讲义页 12–5 的函数正定定义（该讲义把径向无界纳入定义）、12–7 至 12–10 的有界性和全局渐近稳定条件。'}
    ],
    openQuestion: '编辑提出、待文献查新：对一个给定模型，稀疏性、对称性或基底选择能否降低证书搜索规模，同时保持严格验证能力？需要先界定模型并检索既有稀疏 SOS 与对称化研究。'
  },
  {
    id: 'B003',
    title: '从能量极小化到 Ritz–Galerkin 有限元',
    methodIds: ['M013', 'M029', 'M030'],
    sourceProblem: '在函数空间内寻找使能量泛函最小的对象。',
    sharedStructure: '对称强制双线性型定义能量，变分最优性产生弱方程；把允许函数限制到有限维子空间，便得到离散线性系统。',
    targetProblem: '求解椭圆边值问题，并把连续误差分析连接到数值线性代数。',
    conditions: [
      'a 必须对称、有界且强制，ℓ 为有界线性泛函。定义 J(v) = a(v, v)/2 − ℓ(v)。',
      '相容空间 Vₕ ⊂ V 上的极小化给 a(uₕ, vₕ) = ℓ(vₕ)。选取线性无关基底后，刚度矩阵为对称正定。',
      '有了对称正定矩阵才能直接进入共轭梯度等相应算法的适用范围；迭代误差还要与有限元离散误差分别控制。',
      '若 a 不对称，Galerkin 方程仍可能满足 Céa 引理，但不能沿用同一个二次能量最小化解释。'
    ],
    evidence: 'Heltai Lecture 1 §4 明确给出弱方程、刚度矩阵与 Ritz 能量的对应。对任意 w，利用弱方程可自行展开 J(u + w) − J(u) = a(w, w)/2 ≥ 0；限制 w 到 Vₕ 就得到离散的同类关系。C005 的一维 Poisson 例子把这条联系算到一个 1×1 线性系统。',
    status: '已有文献联系；已核对变分与离散方程的对应',
    sources: [{title: ceaSource.title, url: ceaSource.url, locator: '§4 The Ritz–Galerkin approximation / The Ritz interpretation，式 (9)–(14)；§5–6 的正交性与 Céa 估计。'}],
    openQuestion: '编辑提出、待文献查新：对具体材料或控制模型，怎样联合选择离散空间、预条件器与求解停止准则，使总误差满足给定目标？尚未指定模型或证明新颖性。'
  }
];
