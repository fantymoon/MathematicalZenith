import type { EnemyDef } from '../../types/game';

type EnemyDisplayDef = EnemyDef & {
  sigil: string;
  fxTheme: 'normal' | 'boss';
};

export const chapter4Enemies: EnemyDisplayDef[] = [
  {
    id: 'halting-problem',
    name: '停机问题',
    maxHp: 60,
    description: '无法判断程序是否会终止。',
    sigil: '⏹',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'special', value: 0, label: '无限循环', detail: '你的下回合无法结束（必须打出所有命题）。' },
      },
      {
        intent: { type: 'attack', value: 13, label: '不可判定', detail: '提出13点质疑。' },
      },
    ],
    lore: {
      title: '停机问题：计算的边界',
      summary: '停机问题是计算机科学中最著名的问题之一：给定一个程序和输入，判断该程序是否会在有限时间内终止。图灵证明了这个问题是不可判定的。',
      conceptNote: '停机问题的不可判定性揭示了计算的内在局限：不存在一个通用算法，可以判断任意程序是否会停机。这是哥德尔不完备定理在计算领域的对应。',
      historyNote: '1936年，艾伦·图灵在他的开创性论文《论可计算数》中提出了停机问题。他使用对角线论证（类似康托尔的方法）证明了不存在解决停机问题的算法。这一结果奠定了计算机科学的理论基础。',
      tags: ['图灵', '停机问题', '不可判定', '计算理论'],
      links: [{ label: '维基百科：停机问题', url: 'https://zh.wikipedia.org/wiki/%E5%81%9C%E6%9C%BA%E9%97%AE%E9%A2%98' }],
    },
  },
  {
    id: 'liar-paradox',
    name: '说谎者悖论',
    maxHp: 55,
    description: '这句话是假的。',
    sigil: '⊥',
    fxTheme: 'normal',
    actions: [
      {
        intent: { type: 'special', value: 0, label: '自我否定', detail: '你本回合使用的最后一个命题效果反转。' },
      },
      {
        intent: { type: 'attack', value: 14, label: '真值崩溃', detail: '提出14点质疑。' },
      },
    ],
    lore: {
      title: '说谎者悖论：自我指涉的陷阱',
      summary: '说谎者悖论是最古老的逻辑悖论之一："这句话是假的。"如果这句话是真的，那么它是假的；如果它是假的，那么它是真的。',
      conceptNote: '说谎者悖论展示了自我指涉的危险：当一个陈述涉及自身时，可能导致逻辑矛盾。这是哥德尔不完备定理证明中的关键技巧。',
      historyNote: '说谎者悖论可以追溯到古希腊哲学家埃庇米尼得斯。哥德尔在证明不完备定理时，构造了一个类似的自我指涉陈述："这个命题是不可证明的。"如果这个命题可证，则它说自己是不可证的，矛盾；如果它不可证，则它说的是真的，但无法被证明。',
      tags: ['说谎者悖论', '自我指涉', '哥德尔', '逻辑'],
      links: [{ label: '维基百科：说谎者悖论', url: 'https://zh.wikipedia.org/wiki/%E8%AF%B4%E8%B0%8E%E8%80%85%E6%82%96%E8%AE%BA' }],
    },
  },
  {
    id: 'godel-boss',
    name: '哥德尔',
    maxHp: 200,
    description: '任何足够强大的系统，都存在无法证明的真命题。',
    sigil: '⊬',
    fxTheme: 'boss',
    boss: true,
    actions: [
      {
        intent: { type: 'special', value: 0, label: '不完备护盾', detail: '无法被常规命题打破。' },
      },
      {
        intent: { type: 'special', value: 0, label: '自我指涉', detail: '读取你的操作记录，模仿你的策略。' },
      },
      {
        intent: { type: 'attack', value: 30, label: '真理不可达', detail: '提出30点质疑。' },
      },
    ],
    lore: {
      title: '哥德尔：不完备定理的化身',
      summary: '库尔特·哥德尔是20世纪最伟大的逻辑学家之一。他的不完备定理证明了任何足够强大的形式系统都存在无法证明的真命题，彻底改变了数学基础的研究。',
      conceptNote: '不完备定理的核心是自我指涉：哥德尔构造了一个陈述，它说"这个命题不可证明"。如果系统是一致的，则这个命题是真的但不可证明；如果系统是不一致的，则可以证明任何命题。',
      historyNote: '1931年，25岁的哥德尔发表了《论数学原理及其相关系统中的形式不可判定命题》，证明了两条不完备定理。这一结果粉碎了希尔伯特的形式主义计划，迫使数学家们接受数学的固有局限。',
      tags: ['哥德尔', '不完备定理', '形式系统', '自我指涉'],
      links: [{ label: '维基百科：哥德尔不完备定理', url: 'https://zh.wikipedia.org/wiki/%E5%93%A5%E5%BE%B7%E5%B0%94%E4%B8%8D%E5%AE%8C%E5%A4%87%E5%AE%9A%E7%90%86' }],
    },
  },
];

export function getChapter4Enemy(id: string) {
  return chapter4Enemies.find((enemy) => enemy.id === id);
}
