export const problemSlugs=['logic-structure','existence-construction','counting-bounds','stability-evolution','optimization-decisions','inference-computation'];
export const problemDescriptions=[
 '理解对象的结构、证明的可能性与计算的难度。',
 '判断一个对象或一个解是否存在，以及怎样找到它。',
 '研究有多少、偏差多大、概率多高，以及极限在哪里。',
 '研究系统会怎样变化，小扰动会带来什么后果。',
 '在约束下选择方案、匹配分布或控制系统。',
 '从观测恢复未知信息，并获得可靠的计算结果。'
];
export const aliases=[
 ['模型论','forcing','model theory'],['数学归纳法','induction','recursion','invariant'],['complexity','reduction','NP'],['群论','representation','symmetry'],['格罗布纳基','groebner','grobner','elimination'],['homology','cohomology','拓扑'],['descent','local global','局部整体'],['generating functions','combinatorics'],['probabilistic method','随机构造'],['polynomial method','Kakeya','卡凯亚'],['傅里叶','fourier','harmonic analysis','频谱'],['spectral','eigenvalue','特征值'],['variational','direct method','能量最小'],['fixed point','Banach','Brouwer','压缩映射'],['compactness','concentration compactness','紧致性'],['energy estimate','maximum principle','PDE'],['李雅普诺夫','Lyapunov','稳定性'],['perturbation','asymptotics','multiscale'],['homogenization','有效介质'],['martingale','coupling','随机过程'],['concentration','large deviation','尾概率'],['likelihood','Bayesian','参数估计'],['minimax','information bound','样本复杂度'],['convex duality','KKT','凸优化'],['dynamic programming','optimal control','Bellman'],['SOS','sum of squares','SDP','平方和','半定规划'],['optimal transport','Wasserstein','最优输运'],['regularization','inverse problem','噪声','反演'],['FEM','finite element','Galerkin','有限元'],['Krylov','preconditioning','预条件','共轭梯度']
];
export const intuitions=[
 '换一个满足相同规则的数学世界，看看某个命题的真假是否随之改变。这帮助我们理解规则本身能决定多少事情。',
 '先证明第一块积木站得住，再证明每多加一块都能保持稳定。归纳法把无限多个命题组织成有限的证明步骤。',
 '如果能把一个已知很难的问题快速改写成另一个问题，后者就至少承受了前者的那一部分困难。关键是改写的方向和成本。',
 '一个对象在旋转、交换或其他变换后可能保留某些性质。把这些对称性找出来，常能把一个大问题拆成较小的部分。',
 '面对一组多项式方程，先按照统一规则改写它们。某些变量可以被消去，剩下的关系更容易检查。',
 '把复杂形状转成代数记录，例如记录洞的结构。这样的记录便于比较，但可能无法分辨所有不同的形状。',
 '把很多局部拼图拼成一个整体。每一块单独可行还不够，接缝必须兼容，也可能存在整体障碍。',
 '把每种规模的对象数量放进一个函数的系数里。对这个函数进行运算，就能一次性处理一整串计数问题。',
 '不一定先把目标对象造出来。只要证明随机选择时成功概率大于零，就知道至少有一个成功的对象存在。',
 '把“点和直线怎样排列”转写成“某个多项式在哪里为零”。代数对次数的限制，可能反过来限制几何结构。',
 '像把声音拆成不同音高一样，把函数拆成不同频率的成分。各成分的行为可以帮助我们理解整体变化。',
 '寻找一个系统最自然的变化模式，例如琴弦的振动模态。特征值描述这些模式的重要性质，但并非所有系统都能同样处理。',
 '先寻找一串越来越接近最低能量的候选，再证明这些候选能收敛到一个允许的对象。难点是极限不能跑出问题的范围。',
 '把问题写成“经过一次操作后仍保持原样”。例如不断修正一个猜测，若修正过程满足足够强的条件，就会收敛到唯一答案。',
 '一串越来越好的候选可能不断远离、分裂或集中。紧性方法研究能否抓住一个有效极限，以及失去极限的原因。',
 '不必先写出解的完整公式。通过能量上限或大小比较，可以约束解会怎样变化，并排除某些行为。',
 '给系统找一个类似“高度”的函数。如果运动时它持续下降，就可能据此证明系统靠近平衡。这个函数要满足严格条件。',
 '当某个影响很小，或变化有快慢之分，可以先抓住主导行为，再分析修正项。还要检查近似在多长时间内可靠。',
 '材料内部细节可能极其复杂，但在较大尺度上呈现简单规律。均匀化尝试严格连接微观结构与宏观方程。',
 '鞅方法用不断更新的信息分析随机变化；耦合方法把两个随机对象放在同一个概率空间里比较。两种工具各有成立条件。',
 '平均结果之外，我们还关心出现大偏差的可能性。这些方法估计“离通常情况很远”的事件有多罕见。',
 '看到新数据后，哪些参数更符合观测？似然衡量模型与数据的匹配，贝叶斯方法进一步把先验与观测结合。',
 '在寻找更好算法之前，先问任何方法最多能做到什么程度。下界帮助区分算法不足与观测本身的信息限制。',
 '除了提出一个可行方案，也寻找一个证明它有多好的证书。对偶问题可以给界，额外条件成立时能验证最优性。',
 '把连续决策拆成“现在怎么选”和“之后怎样继续”。用未来的最优价值帮助当前决策，但状态维数可能使计算非常困难。',
 '平方的和一定非负。尝试把一个多项式写成平方和，就得到一类可检查的证明证书，还能借助优化寻找这种证书。',
 '把一堆沙搬成另一种形状，怎样花费最少？把沙堆换成概率分布，就得到比较和匹配分布的一种数学方式。',
 '带噪声的观测可能对应许多很不稳定的答案。正则化加入明确的结构约束，寻找在数据与结构之间合理的近似。',
 '把连续空间的问题放进有限个基础形状组成的空间里求近似解，再估计这种替代带来的误差。',
 '大型矩阵往往难以直接求解。利用反复的矩阵作用构造较小的搜索空间，并用预条件改善迭代的数值性质。'
];
export const sourceTitles={
 M010:'Zeev Dvir — On the size of Kakeya sets in finite fields (2008)',
 M024:'Stephen Boyd & Lieven Vandenberghe — Convex Optimization (2004)',
 M026:'Pablo A. Parrilo — Structured semidefinite programs and semialgebraic geometry methods in robustness and optimization (2000)',
 M027:'Gabriel Peyré & Marco Cuturi — Computational Optimal Transport (2018 / 2019)'
};
