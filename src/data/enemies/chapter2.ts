import type { EnemyDef } from '../../types/game';

type EnemyDisplayDef = EnemyDef & {
  sigil: string;
  fxTheme: 'normal' | 'boss';
};

export const chapter2Enemies: EnemyDisplayDef[] = [
  {
    id: 'infinitesimal',
    name: '无穷小量',
    maxHp: 25,
    description: '比任何正数都小，但不为零的存在。贝克莱主教称之为"已死量的幽灵"。',
    sigil: 'ε',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'attack', value: 1, label: '无限细分', detail: '提出1点质疑，但连续质疑3次。' },
      },
      {
        intent: { type: 'buff', value: 0, label: '趋近零', detail: '下次质疑次数+2。' },
      },
    ],
    lore: {
      title: '无穷小量：微积分的基础谜题',
      summary: '无穷小量是微积分中的核心概念，指比任何正数都小但不为零的量。它既是微积分强大威力的来源，也是其理论基础最受争议的部分。',
      conceptNote: '无穷小量代表了"变化"的瞬时状态——在某一瞬间，它既存在（不为零）又不存在（无限小）。这种矛盾性正是微积分能够描述连续变化的数学基础。',
      historyNote: '无穷小量的概念可以追溯到古希腊的"不可分量"和17世纪的卡瓦列里原理。牛顿和莱布尼茨都使用了这一概念，但未能给出严格定义。1734年，爱尔兰哲学家贝克莱主教在《分析学家》中猛烈抨击无穷小量，称其为"已死量的幽灵"（ghosts of departed quantities）。他指出：无穷小量在被当作除数时不是零，在之后又被当作零舍弃，这在逻辑上是矛盾的。这一批评促使19世纪的数学家们发展出极限理论来严格化微积分。',
      tags: ['微积分', '无穷小', '贝克莱', '数学基础'],
      links: [{ label: '维基百科：无穷小', url: 'https://en.wikipedia.org/wiki/Infinitesimal' }],
    },
  },
  {
    id: 'function-curve',
    name: '函数曲线',
    maxHp: 56,
    description: '正弦波与指数函数的化身，变化莫测。',
    sigil: '∿',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'attack', value: 6, label: '正弦震荡', detail: '提出6点质疑，下回合质疑-3。' },
      },
      {
        intent: { type: 'attack', value: 12, label: '指数爆发', detail: '提出12点质疑，每回合+2。' },
      },
    ],
    lore: {
      title: '函数：变量之间的精确关系',
      summary: '函数是数学中描述变量之间依赖关系的核心工具。从简单的线性函数到复杂的超越函数，它们构成了现代数学和科学的基础语言。',
      conceptNote: '正弦函数代表周期性变化，指数函数代表快速增长或衰减。这两种函数在自然界中无处不在——从声波传播到人口增长，从放射性衰变到复利计算。',
      historyNote: '函数概念的发展经历了漫长历程。14世纪，奥雷姆用图形表示变量关系。17世纪，笛卡尔和费马用代数方程描述曲线。莱布尼茨在1673年首次使用"函数"（functio）一词，指代与曲线上的点相关的量。1734年，欧拉在《无穷分析引论》中给出了更一般的定义：函数是变量之间的任意解析表达式。现代函数定义则要归功于狄利克雷（1837年），他首次将函数定义为任意对应关系，而不必局限于解析表达式。',
      tags: ['函数', '正弦', '指数', '变量'],
      links: [{ label: '维基百科：函数', url: 'https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0' }],
    },
  },
  {
    id: 'bishop-berkeley',
    name: '贝克莱主教',
    maxHp: 78,
    description: '"无穷小量是已死量的幽灵。"——《分析学家》，1734年',
    sigil: '✝',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'special', value: 0, label: '死量幽灵', detail: '你的"流变"类命题本回合失效。' },
      },
      {
        intent: { type: 'attack', value: 15, label: '神学质疑', detail: '提出15点质疑。' },
      },
    ],
    lore: {
      title: '贝克莱主教：微积分的神学批判者',
      summary: '乔治·贝克莱是18世纪爱尔兰哲学家、神学家。他在《分析学家》中对微积分的基础提出了尖锐批评，促使数学家们后来发展出更严格的极限理论。',
      conceptNote: '贝克莱的批评揭示了微积分早期理论中的逻辑漏洞：无穷小量既被当作零又被当作非零使用，这在严格逻辑上是矛盾的。',
      historyNote: '乔治·贝克莱（1685-1753）是爱尔兰著名的哲学家，主观唯心主义的代表人物，提出"存在即被感知"的著名命题。1734年，贝克莱发表《分析学家》（The Analyst），副标题是"致一位不信神的数学家"。他讽刺微积分建立在"双重错误"之上，却得出了正确的结论。虽然贝克莱的动机部分是出于神学（他试图证明数学并不比宗教更可靠），但他的批评击中了微积分的软肋，迫使数学家们认真对待基础问题。19世纪柯西和魏尔斯特拉斯的严格化工作，可以看作是对贝克莱挑战的回应。',
      tags: ['贝克莱', '微积分', '神学', '数学基础', '分析学家'],
      links: [{ label: '维基百科：乔治·贝克莱', url: 'https://zh.wikipedia.org/wiki/%E4%B9%94%E6%B2%BB%C2%B7%E8%B4%9D%E5%85%8B%E8%8E%B1' }],
    },
  },
  {
    id: 'zeno',
    name: '芝诺',
    maxHp: 120,
    description: '阿喀琉斯永远追不上乌龟。运动只是幻觉。',
    sigil: '∞',
    fxTheme: 'boss',
    boss: true,
    actions: [
      {
        intent: { type: 'special', value: 0, label: '二分悖论', detail: '你本回合只能使用一半思考时间。' },
      },
      {
        intent: { type: 'special', value: 0, label: '飞矢不动', detail: '你的反驳命题本回合失效。' },
      },
      {
        intent: { type: 'attack', value: 20, label: '无限分割', detail: '提出20点质疑，无视逻辑防御。' },
      },
    ],
    lore: {
      title: '芝诺悖论：对运动和无限的哲学挑战',
      summary: '芝诺是古希腊哲学家，以提出一系列关于运动和无限的悖论而闻名。他的悖论挑战了人们对空间、时间和运动的基本理解。',
      conceptNote: '芝诺悖论的核心在于揭示无限分割带来的反直觉后果。如果空间和时间可以无限细分，那么运动似乎是不可能的——因为在到达终点之前，必须先到达中点，而到达中点之前又必须先到达四分之一点，如此无限循环。',
      historyNote: '芝诺约公元前490年出生于意大利南部的埃利亚，是巴门尼德的学生。他提出悖论的目的是捍卫其师的存在论：如果变化和运动会导致悖论，那么它们就不是真实的，只有永恒不变的存在才是真实的。亚里士多德在《物理学》中详细讨论了芝诺悖论，并试图用"潜在无限"与"实际无限"的区分来回应。19世纪，魏尔斯特拉斯、康托尔等人发展了严格的极限理论和无穷集合论，才从数学上完全解决了这些悖论。微积分中的极限概念正是对芝诺挑战的数学回应。',
      tags: ['芝诺', '悖论', '无限', '运动', '古希腊哲学'],
      links: [{ label: '维基百科：芝诺悖论', url: 'https://zh.wikipedia.org/wiki/%E8%8A%9D%E8%AF%BA%E6%82%96%E8%AE%BA' }],
    },
  },
];

export function getChapter2Enemy(id: string) {
  return chapter2Enemies.find((enemy) => enemy.id === id);
}
