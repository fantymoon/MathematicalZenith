import type { CharacterDef } from '../../types/game';

type CharacterDisplayDef = CharacterDef & {
  portraitLabel: string;
  portraitAccent: string;
};

export const chapter2Characters: CharacterDisplayDef[] = [
  {
    id: 'newton-leibniz',
    name: '流数之争',
    title: '微积分的双子',
    color: '#4a90d9',
    portraitLabel: 'FLUXION / CALCULUS',
    portraitAccent: '流动曲线',
    summary: '在无穷小的幽灵中捕捉变化，用极限思想重构世界。',
    passiveName: '无穷小量',
    passiveDescription: '每回合开始时获得1层"流变"：下回合第一个命题的思考时间-1。',
    playstyle: '变化 / 累积 / 极限',
    maxHp: 72,
    chapterId: 'chapter2',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'fluxion', 'limit-concept', 'tangent-line', 
      'derivative', 'integral', 'line-axiom'
    ],
    lore: {
      title: '牛顿与莱布尼茨：微积分的双子星',
      summary: '牛顿从物理运动出发发明"流数术"，莱布尼茨从符号逻辑出发创立"微积分"。两人独立发现同一数学工具，却引发了科学史上最激烈的优先权之争。',
      conceptNote: '这个角色融合了两种微积分传统：牛顿的物理直观与莱布尼茨的符号优雅。玩家可以在两种形态间切换，体验不同的证明风格。',
      historyNote: '17世纪末，牛顿和莱布尼茨几乎同时发明了微积分。牛顿侧重于运动和变化率，莱布尼茨侧重于符号系统和面积计算。1665-1666年，牛顿因瘟疫回到乡下，在这段时间里发明了流数术，但直到1704年才正式发表。莱布尼茨则在1675年左右独立发明了微积分，并于1684年发表了第一篇论文。1711年，英国皇家学会介入调查优先权之争，但最终偏袒牛顿。这场争论不仅涉及个人荣誉，更反映了英国与欧洲大陆数学传统的分歧——英国坚持使用牛顿的流数术，而欧洲大陆采用莱布尼茨更优雅的记号。这一分歧导致英国数学在18世纪相对落后，直到19世纪初才接受莱布尼茨的体系。',
      tags: ['微积分', '牛顿', '莱布尼茨', '数学史', '优先权之争'],
      links: [
        { label: '维基百科：牛顿', url: 'https://zh.wikipedia.org/wiki/%E8%89%BE%E8%90%A8%E5%85%8B%C2%B7%E7%89%9B%E9%A1%BF' },
        { label: '维基百科：莱布尼茨', url: 'https://zh.wikipedia.org/wiki/%E6%88%88%E7%89%B9%E5%BC%97%E9%87%8C%E5%BE%B7%C2%B7%E8%8E%B1%E5%B8%83%E5%B0%BC%E8%8C%A8' },
      ],
    },
  },
  {
    id: 'euler',
    name: '欧拉',
    title: '分析学集大成者',
    color: '#f4a460',
    portraitLabel: 'PRODUCTIVITY / CONNECTION',
    portraitAccent: '连接网络',
    summary: '数学史上最高产的数学家，几乎涉足所有领域，将微积分系统化。',
    passiveName: '欧拉公式',
    passiveDescription: '每回合使用第 3 张命题时，该命题效果翻倍。',
    playstyle: '高产 / 系统 / 连接',
    maxHp: 70,
    chapterId: 'chapter2',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'euler-formula', 'seven-bridges', 'infinite-series',
      'derivative', 'line-axiom', 'golden-ratio'
    ],
    lore: {
      title: '欧拉：数学界的莎士比亚',
      summary: '莱昂哈德·欧拉是18世纪最伟大的数学家，也是数学史上最高产的学者。他在失明后仍然保持着惊人的创造力。',
      conceptNote: '欧拉代表的是"连接一切"的数学观：看似不相关的领域在他手中被统一起来。',
      historyNote: '欧拉（1707-1783）出生于瑞士巴塞尔，师从约翰·伯努利。他在圣彼得堡和柏林度过了大部分学术生涯，发表了超过800篇论文，涵盖了数学的几乎所有分支。即使在1766年双目失明后，他仍然通过口述继续研究，在生命的最后17年里产出了近一半的成果。欧拉公式 e^(iπ)+1=0 被誉为"数学中最美的公式"，它将五个最重要的数学常数联系在一起。',
      tags: ['欧拉', '分析学', '高产', '数学之美'],
      links: [
        { label: '维基百科：欧拉', url: 'https://zh.wikipedia.org/wiki/%E8%8E%B1%E6%98%82%E5%93%88%E5%BE%B7%C2%B7%E6%AC%A7%E6%8B%89' },
      ],
    },
  },
  {
    id: 'lagrange',
    name: '拉格朗日',
    title: '分析力学之父',
    color: '#9370db',
    portraitLabel: 'OPTIMIZATION / ELEGANCE',
    portraitAccent: '优雅曲线',
    summary: '变分法的创始人，用最小作用量原理重构了经典力学。',
    passiveName: '最小作用量',
    passiveDescription: '每回合开始时选择：减少 1 点思考时间消耗 或 增加 3 点质疑力度。',
    playstyle: '优化 / 变分 / 优雅',
    maxHp: 74,
    chapterId: 'chapter2',
    starterDeck: [
      'strike', 'strike', 'guard', 'guard',
      'calculus-of-variations', 'lagrange-point', 'analytical-mechanics',
      'integral', 'line-axiom', 'golden-ratio'
    ],
    lore: {
      title: '拉格朗日：数学的优雅化身',
      summary: '约瑟夫·路易·拉格朗日是18世纪法国数学家，创立了变分法和拉格朗日力学，以数学的优雅和严谨著称。',
      conceptNote: '拉格朗日代表的是"优雅优化"的数学观：在约束条件下寻找最优解，用最简洁的方式描述复杂的物理现象。',
      historyNote: '拉格朗日（1736-1813）出生于意大利都灵，19岁时就担任了都灵皇家炮兵学校的数学教授。他在变分法、代数方程理论、天体力学等领域做出了开创性贡献。1788年出版的《分析力学》是他最重要的著作，全书没有一张图，完全用分析的方法处理了力学的所有问题。拿破仑称赞他是"数学科学高耸的金字塔"。',
      tags: ['拉格朗日', '变分法', '分析力学', '优化'],
      links: [
        { label: '维基百科：拉格朗日', url: 'https://zh.wikipedia.org/wiki/%E7%BA%A6%E7%91%9F%E5%A4%AB%C2%B7%E8%B7%AF%E6%98%93%C2%B7%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5' },
      ],
    },
  },
];

export function getChapter2Character(id: string) {
  return chapter2Characters.find((character) => character.id === id);
}
