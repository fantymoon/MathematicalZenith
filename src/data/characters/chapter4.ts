import type { CharacterDef } from '../../types/game';

type CharacterDisplayDef = CharacterDef & {
  portraitLabel: string;
  portraitAccent: string;
};

export const chapter4Characters: CharacterDisplayDef[] = [
  {
    id: 'hualuogeng',
    name: '华罗庚',
    title: '实践的巨人',
    color: '#e06d5b',
    portraitLabel: 'OPTIMIZE / MOTION',
    portraitAccent: '运筹剖面',
    summary: '通过节省思考时间与优化路线，把每一点认知资源压榨到极致。',
    passiveName: '优选统筹',
    passiveDescription: '每回合剩余的每 1 点思考时间，下回合获得 2 点逻辑防御。',
    playstyle: '省费 / 优化 / 实用主义',
    maxHp: 74,
    chapterId: 'chapter4',
    starterDeck: ['strike', 'strike', 'guard', 'guard', 'optimal-method', 'overall-planning', 'zero-one', 'line-axiom', 'golden-ratio'],
    lore: {
      title: '华罗庚与"把数学带到现实里"',
      summary: '华罗庚不仅在纯数学上有重要贡献，也因推广优选法、统筹法而成为"数学服务现实生产"的代表人物。',
      conceptNote: '这个角色强调资源调度、步骤安排与低成本高效率，正对应"统筹""优化"的数学文化印象。',
      historyNote: '华罗庚（1910-1985）是中国现代数学的奠基人之一。他仅有初中学历，却凭借自学在数论领域取得突破，被熊庆来慧眼识中，进入清华大学。1936年赴英国剑桥大学深造，在解析数论方面做出重要贡献。回国后，他在多复变函数论、矩阵几何等领域都有开创性工作。1960年代起，他投身数学普及工作，走遍全国推广优选法和统筹法，使数学真正服务于生产建设。他的名言"天才在于积累，聪明在于勤奋"激励了无数后来者。',
      tags: ['中国数学史', '优化', '统筹法', '应用数学'],
      links: [{ label: '维基百科：华罗庚', url: 'https://zh.wikipedia.org/wiki/%E5%8D%8E%E7%BD%97%E5%BA%9A' }],
    },
  },
  {
    id: 'godel-turing',
    name: '不完备与可计算',
    title: '逻辑的边界',
    color: '#00ff00',
    portraitLabel: 'INCOMPLETENESS / CODE',
    portraitAccent: '代码矩阵',
    summary: '证明真理无法被完全证明，在逻辑的尽头等待着你。',
    passiveName: '自指',
    passiveDescription: '每回合可以"检视"一个命题：查看其代码实现。',
    playstyle: 'Meta / 代码 / 解构',
    maxHp: 70,
    chapterId: 'chapter4',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'incompleteness-theorem', 'halting-problem', 'self-reference',
      'code-inspect', 'source-key', 'line-axiom'
    ],
    lore: {
      title: '哥德尔与图灵：逻辑的极限',
      summary: '库尔特·哥德尔证明了数学的不完备性，艾伦·图灵证明了计算的边界。他们的工作揭示了理性本身的局限。',
      conceptNote: '哥德尔-图灵角色代表"元认知"——不仅玩游戏，还审视游戏本身。这种自我指涉的能力是第四章的核心主题。',
      historyNote: '1931年，哥德尔发表不完备定理，证明任何足够强大的形式系统都存在无法证明的真命题。1936年，图灵提出图灵机模型，证明停机问题不可判定。这两项工作深刻影响了20世纪的数学、逻辑学和计算机科学。',
      tags: ['哥德尔', '图灵', '不完备定理', '停机问题', 'Meta'],
      links: [
        { label: '维基百科：哥德尔', url: 'https://zh.wikipedia.org/wiki/%E5%BA%93%E5%B0%94%E7%89%B9%C2%B7%E5%93%A5%E5%BE%B7%E5%B0%94' },
        { label: '维基百科：图灵', url: 'https://zh.wikipedia.org/wiki/%E8%89%BE%E4%BC%A6%C2%B7%E5%9B%BE%E7%81%B5' },
      ],
    },
  },
  {
    id: 'von-neumann',
    name: '冯·诺依曼',
    title: '现代计算机之父',
    color: '#4169e1',
    portraitLabel: 'STRATEGY / COMPUTATION',
    portraitAccent: '计算矩阵',
    summary: '博弈论创始人，现代计算机架构设计者，在多个领域都有开创性贡献。',
    passiveName: '博弈策略',
    passiveDescription: '每回合开始时，预测敌人下回合意图。预测正确获得 2 层力量。',
    playstyle: '策略 / 计算 / 多面',
    maxHp: 72,
    chapterId: 'chapter4',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'game-equilibrium', 'stored-program', 'self-replication',
      'optimal-method', 'line-axiom', 'golden-ratio'
    ],
    lore: {
      title: '冯·诺依曼：最后一位全能数学家',
      summary: '约翰·冯·诺依曼是20世纪最具影响力的数学家之一，在计算机、博弈论、量子力学、核物理等领域都有开创性贡献。',
      conceptNote: '冯·诺依曼代表的是"策略计算"的数学观：通过预判和优化，在复杂系统中找到最优策略。',
      historyNote: '冯·诺依曼（1903-1957）出生于匈牙利布达佩斯，从小就展现出惊人的数学天赋。他在哥廷根大学师从希尔伯特，后来在普林斯顿高等研究院工作。他提出了现代计算机的"存储程序"架构（冯·诺依曼架构），创立了博弈论，参与了曼哈顿计划。他能够在脑海中进行复杂的计算，被誉为"最后一位全能数学家"。',
      tags: ['冯·诺依曼', '计算机', '博弈论', '策略'],
      links: [
        { label: '维基百科：冯·诺依曼', url: 'https://zh.wikipedia.org/wiki/%E7%BA%A6%E7%BF%B0%C2%B7%E5%86%AF%C2%B7%E8%AF%BA%E4%BE%9D%E6%9B%BC' },
      ],
    },
  },
  {
    id: 'noether',
    name: '诺特',
    title: '抽象代数之母',
    color: '#ff69b4',
    portraitLabel: 'SYMMETRY / ABSTRACTION',
    portraitAccent: '对称图案',
    summary: '抽象代数的创始人，用对称性连接了数学与物理，证明了守恒律与对称性的深刻联系。',
    passiveName: '诺特定理',
    passiveDescription: '每回合第一次使用某类命题（攻击/技能/能力）时，获得对应增益：攻击+2力量，技能+3逻辑防御，能力+1能量。',
    playstyle: '抽象 / 对称 / 结构',
    maxHp: 68,
    chapterId: 'chapter4',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'abstract-algebra', 'symmetry-transform', 'noether-theorem',
      'zero-one', 'line-axiom', 'golden-ratio'
    ],
    lore: {
      title: '艾米·诺特：现代数学之母',
      summary: '艾米·诺特是20世纪最伟大的数学家之一，创立了抽象代数，证明了诺特定理，深刻影响了现代物理学的发展。',
      conceptNote: '诺特代表的是"抽象结构"的数学观：通过对称性和代数结构，揭示数学与物理的本质联系。',
      historyNote: '艾米·诺特（1882-1935）出生于德国埃尔朗根，是数学家马克斯·诺特的女儿。由于当时女性难以在学术界获得正式职位，她长期在哥廷根大学无薪授课。希尔伯特和克莱因支持她的工作，她最终成为哥廷根数学研究所的核心成员。1933年，因纳粹迫害，她移居美国，在布林茅尔学院任教。爱因斯坦称她为"数学史上最重要的女性"。',
      tags: ['诺特', '抽象代数', '对称性', '女性数学家'],
      links: [
        { label: '维基百科：艾米·诺特', url: 'https://zh.wikipedia.org/wiki/%E8%89%BE%E7%B1%B3%C2%B7%E8%AF%BA%E7%89%B9' },
      ],
    },
  },
];

export function getChapter4Character(id: string) {
  return chapter4Characters.find((character) => character.id === id);
}
