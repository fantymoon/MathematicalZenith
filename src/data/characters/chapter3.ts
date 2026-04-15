import type { CharacterDef } from '../../types/game';

type CharacterDisplayDef = CharacterDef & {
  portraitLabel: string;
  portraitAccent: string;
};

export const chapter3Characters: CharacterDisplayDef[] = [
  {
    id: 'gauss',
    name: '高斯',
    title: '数学王子',
    color: '#78c091',
    portraitLabel: 'PRECISION / CURVE',
    portraitAccent: '精度谱线',
    summary: '压制随机性并把数值收益拉满的控制型学者。',
    passiveName: '正态分布',
    passiveDescription: '所有随机质疑取最大值；每回合第一个 0 思考时间的命题使用后，从知识库调取 1 个命题。',
    playstyle: '控制 / 精确 / 资源循环',
    maxHp: 70,
    chapterId: 'chapter3',
    starterDeck: ['strike', 'strike', 'guard', 'guard', 'bell-curve', 'fundamental-theorem', 'heptadecagon', 'line-axiom', 'golden-ratio'],
    lore: {
      title: '高斯：把精度与普遍性合而为一',
      summary: '高斯横跨数论、几何、天文学、误差理论等多个领域，因此常被称为“数学王子”。',
      conceptNote: '这个角色强调“压制随机、提纯结果”的感觉，对应高斯在误差、分布和严密计算中的代表性形象。',
      historyNote: '卡尔·弗里德里希·高斯（1777-1855）出生于德国不伦瑞克的一个贫苦家庭，展现出惊人的数学天赋。1796年，19岁的高斯发现了正十七边形的尺规作图方法，决定投身数学。1801年出版的《算术研究》奠定了现代数论的基础。1807年起，他担任哥廷根天文台台长达47年，在天体测量中发展了误差理论和最小二乘法。高斯对非欧几何也有深刻洞察，但因担心争议而未发表。他的座右铭“宁可少些，但要成熟”体现了他对完美的追求。',
      tags: ['数论', '误差理论', '几何', '数学王子'],
      links: [{ label: '维基百科：卡尔·弗里德里希·高斯', url: 'https://zh.wikipedia.org/wiki/%E5%8D%A1%E5%B0%94%C2%B7%E5%BC%97%E9%87%8C%E5%BE%B7%E9%87%8C%E5%B8%8C%C2%B7%E9%AB%98%E6%96%AF' }],
    },
  },
  {
    id: 'galois',
    name: '伽罗瓦',
    title: '群论奠基者',
    color: '#8b0000',
    portraitLabel: 'GROUP / REVOLUTION',
    portraitAccent: '革命火焰',
    summary: '在决斗前夜写下群论的天才，用生命的最后光芒照亮抽象代数。',
    passiveName: '群作用',
    passiveDescription: '当学术声誉降至20%以下时，所有命题效果翻倍，但下回合必须结束辩论。',
    playstyle: '爆发 / 牺牲 / 置换',
    maxHp: 65,
    chapterId: 'chapter3',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'group-action', 'radical-unsolvable', 'premonition-letter',
      'line-axiom', 'golden-ratio'
    ],
    lore: {
      title: '伽罗瓦：在决斗前夜诞生的革命',
      summary: '埃瓦里斯特·伽罗瓦是19世纪法国数学天才，创立群论，在决斗前夜写下数学遗书，年仅21岁去世。',
      conceptNote: '伽罗瓦代表的是"高风险高回报"的证明观：在绝境中爆发，用结构置换打破常规。',
      historyNote: '伽罗瓦在21岁时因政治活动和爱情纠纷卷入决斗。在决斗前夜，他通宵写下关于方程可解性的数学思想，这些手稿后来成为群论的基础。他发现的伽罗瓦理论揭示了代数方程可解性与群结构之间的深刻联系，解决了困扰数学家数百年的问题。',
      tags: ['伽罗瓦', '群论', '抽象代数', '决斗', '革命'],
      links: [
        { label: '维基百科：伽罗瓦', url: 'https://zh.wikipedia.org/wiki/%E5%9F%83%E7%93%A6%E9%87%8C%E6%96%AF%E7%89%B9%C2%B7%E4%BC%BD%E7%BD%97%E7%93%A6' },
      ],
    },
  },
  {
    id: 'cantor',
    name: '康托尔',
    title: '集合论创始人',
    color: '#4b0082',
    portraitLabel: 'INFINITY / MADNESS',
    portraitAccent: '超穷螺旋',
    summary: '探索无穷集合的深渊，在可数与不可数之间徘徊。',
    passiveName: '超穷数',
    passiveDescription: '每回合获得1点"无穷点"（上限3）。使用无穷点会累积"精神压力"。',
    playstyle: '无限 / 风险 / 突破',
    maxHp: 68,
    chapterId: 'chapter3',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'bijection', 'power-set', 'continuum-hypothesis',
      'aleph-null', 'line-axiom'
    ],
    lore: {
      title: '康托尔：无穷的大师与囚徒',
      summary: '格奥尔格·康托尔创立集合论和超穷数理论，因研究无穷集合而受到同时代数学家的排挤，最终精神崩溃。',
      conceptNote: '康托尔代表的是"突破边界"的证明观：探索被禁止的领域，承受巨大的精神压力。',
      historyNote: '康托尔在19世纪末创立了集合论，证明了实数比自然数"更多"（不可数）。这一发现震惊了数学界，也招致了克罗内克等权威学者的激烈反对。康托尔多次遭受精神崩溃，晚年一直在疗养院度过。但他的工作为20世纪数学奠定了基础。',
      tags: ['康托尔', '集合论', '无穷', '超穷数', '精神崩溃'],
      links: [
        { label: '维基百科：康托尔', url: 'https://zh.wikipedia.org/wiki/%E6%A0%BC%E5%A5%A5%E5%B0%94%E6%A0%BC%C2%B7%E5%BA%B7%E6%89%98%E5%B0%94' },
      ],
    },
  },
];

export function getChapter3Character(id: string) {
  return chapter3Characters.find((character) => character.id === id);
}
