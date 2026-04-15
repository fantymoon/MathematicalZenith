import type { EnemyDef } from '../../types/game';

type EnemyDisplayDef = EnemyDef & {
  sigil: string;
  fxTheme: 'normal' | 'boss';
};

export const chapter3Enemies: EnemyDisplayDef[] = [
  {
    id: 'russell-barber',
    name: '罗素理发师',
    maxHp: 48,
    description: '给所有不给自己理发的人理发。那么，他给不给自己理发？',
    sigil: '∈',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'special', value: 0, label: '理发悖论', detail: '若你本回合未质疑自己，受到10点质疑。' },
      },
      {
        intent: { type: 'attack', value: 9, label: '集合切割', detail: '提出9点质疑。' },
      },
    ],
    lore: {
      title: '罗素悖论：集合论的危机',
      summary: '罗素理发师悖论是20世纪初发现的一个逻辑悖论，它揭示了朴素集合论中的矛盾，直接导致了第三次数学危机。',
      conceptNote: '悖论的核心在于自我指涉：如果理发师给所有不给自己理发的人理发，那么他给不给自己理发？无论回答是或否，都会导致矛盾。',
      historyNote: '1901年，英国哲学家和数学家伯特兰·罗素发现了这一悖论。1902年，他写信给德国数学家弗雷格，告知这一发现。弗雷格正在完成《算术基础》第二卷，罗素悖论使他的工作受到根本性的挑战。这一发现促使数学家们发展出公理化集合论（如ZFC系统）来避免悖论。',
      tags: ['罗素', '悖论', '集合论', '自我指涉', '第三次数学危机'],
      links: [{ label: '维基百科：罗素悖论', url: 'https://zh.wikipedia.org/wiki/%E7%BD%97%E7%B4%A0%E6%82%96%E8%AE%BA' }],
    },
  },
  {
    id: 'parallel-rebel',
    name: '平行线反叛者',
    maxHp: 52,
    description: '在非欧空间里，平行线相交了。',
    sigil: '∥',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'special', value: 0, label: '空间扭曲', detail: '交换你的当前命题集与已证命题集。' },
      },
      {
        intent: { type: 'attack', value: 11, label: '相交冲击', detail: '提出11点质疑。' },
      },
    ],
    lore: {
      title: '非欧几何：平行公设的反叛',
      summary: '非欧几何是19世纪数学的重大突破，它否定了欧几里得第五公设（平行公设），创造了全新的几何体系。',
      conceptNote: '在欧几里得几何中，过直线外一点有且只有一条平行线。但在非欧几何中，这条"常识"被推翻：在双曲几何中，有无数条平行线；在椭圆几何中，没有平行线。',
      historyNote: '高斯最早意识到非欧几何的可能性，但没有发表。19世纪20-30年代，匈牙利数学家鲍耶和俄国数学家罗巴切夫斯基独立发表了双曲几何的成果。黎曼在1854年创立了更一般的黎曼几何，为爱因斯坦的广义相对论奠定了数学基础。',
      tags: ['非欧几何', '平行公设', '罗巴切夫斯基', '黎曼', '空间'],
      links: [{ label: '维基百科：非欧几里得几何', url: 'https://zh.wikipedia.org/wiki/%E9%9D%9E%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E5%87%A0%E4%BD%95' }],
    },
  },
  {
    id: 'continuum-elite',
    name: '连续统假设',
    maxHp: 85,
    description: 'ℵ₁与2^ℵ₀之间，是否存在中间值？',
    sigil: 'ℵ',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'special', value: 0, label: '无穷吞噬', detail: '吞噬你1点思考时间。' },
      },
      {
        intent: { type: 'attack', value: 16, label: '不可达基数', detail: '提出16点质疑。' },
      },
    ],
    lore: {
      title: '连续统假设：无穷之间的深渊',
      summary: '连续统假设是康托尔提出的关于无穷集合大小的著名问题，它问：在可数无穷和实数无穷之间，是否存在中间大小的无穷？',
      conceptNote: '康托尔证明了实数比自然数"多"（不可数），但无法确定是否存在中间大小的集合。他相信不存在（连续统假设），但无法证明。',
      historyNote: '连续统假设是希尔伯特23个问题中的第一个。1940年，哥德尔证明了连续统假设与ZFC公理系统相容；1963年，科恩证明了连续统假设的否定也与ZFC相容。这意味着连续统假设在ZFC中是不可判定的——既不能被证明，也不能被否定。',
      tags: ['连续统假设', '康托尔', '无穷', '不可判定', '科恩'],
      links: [{ label: '维基百科：连续统假设', url: 'https://zh.wikipedia.org/wiki/%E8%BF%9E%E7%BB%AD%E7%BB%9F%E5%81%87%E8%AE%BE' }],
    },
  },
  {
    id: 'cantor-shadow',
    name: '康托尔的心魔',
    maxHp: 140,
    description: '超穷数的代价，是理智的崩塌。',
    sigil: 'ℵ∞',
    fxTheme: 'boss',
    boss: true,
    actions: [
      {
        intent: { type: 'special', value: 0, label: '对角线封印', detail: '封印你思考时间最高的命题。' },
      },
      {
        intent: { type: 'special', value: 0, label: '超穷天梯', detail: '恢复ℵ₀、ℵ₁、ℵ₂三层声誉。' },
      },
      {
        intent: { type: 'attack', value: 25, label: '无穷风暴', detail: '提出25点质疑。' },
      },
    ],
    lore: {
      title: '康托尔的心魔：无穷与疯狂的边界',
      summary: '康托尔晚年饱受精神疾病折磨，有人认为是研究无穷的压力所致，也有人认为是先天遗传。无论如何，无穷与疯狂在他的生命中交织。',
      conceptNote: '康托尔发现无穷也有"大小"之分：自然数集是可数无穷（ℵ₀），实数集是不可数无穷（2^ℵ₀）。他创造了超穷数理论，但这也使他成为学术界的"异端"。',
      historyNote: '1884年，康托尔首次精神崩溃。此后他多次入院治疗，但仍坚持研究。他在疗养院度过了生命的最后几年，于1918年去世。尽管生前饱受争议，康托尔如今被公认为现代数学最重要的奠基人之一。',
      tags: ['康托尔', '心魔', '无穷', '精神崩溃', '超穷数'],
      links: [{ label: '维基百科：康托尔', url: 'https://zh.wikipedia.org/wiki/%E6%A0%BC%E5%A5%A5%E5%B0%94%E6%A0%BC%C2%B7%E5%BA%B7%E6%89%98%E5%B0%94' }],
    },
  },
];

export function getChapter3Enemy(id: string) {
  return chapter3Enemies.find((enemy) => enemy.id === id);
}
