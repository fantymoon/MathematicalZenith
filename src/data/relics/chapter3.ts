import type { RelicDef } from '../../types/game';

export const chapter3Relics: RelicDef[] = [
  {
    id: 'galois-manuscript',
    name: '伽罗瓦手稿',
    description: '学术声誉低于20%时，所有命题效果+50%。',
    lore: {
      title: '伽罗瓦的数学遗书',
      summary: '1832年5月29日，伽罗瓦在决斗前夜写下的数学手稿，包含了他关于群论和方程可解性的核心思想。',
      conceptNote: '这份手稿代表了"置之死地而后生"的数学精神——在绝境中爆发最强的创造力。',
      historyNote: '伽罗瓦在遗书中写道："我没有时间了。"他在短短几页纸中概述了后来被称为伽罗瓦理论的数学框架。这些思想在他去世14年后才被刘维尔发表，成为现代代数的基石。',
      tags: ['伽罗瓦', '手稿', '遗书', '群论'],
      links: [{ label: '维基百科：伽罗瓦', url: 'https://zh.wikipedia.org/wiki/%E5%9F%83%E7%93%A6%E9%87%8C%E6%96%AF%E7%89%B9%C2%B7%E4%BC%BD%E7%BD%97%E7%93%A6' }],
    },
  },
  {
    id: 'cantor-diagonal',
    name: '对角线论证',
    description: '每拥有1点"无穷点"，反驳命题+3质疑。',
    lore: {
      title: '康托尔的对角线论证',
      summary: '对角线论证是康托尔在1891年发明的证明技巧，用于证明实数集不可数。它是数学中最优雅、最有影响力的证明之一。',
      conceptNote: '对角线论证的核心思想：假设所有实数可以列出，然后构造一个新实数，其第n位小数与列表中第n个实数的第n位不同。这个新实数不在原列表中，矛盾！',
      historyNote: '对角线论证不仅证明了实数不可数，还可以推广为康托尔定理（幂集比原集合大）。哥德尔和图灵后来都使用了类似的论证技巧。',
      tags: ['康托尔', '对角线论证', '不可数', '证明技巧'],
      links: [{ label: '维基百科：对角线论证', url: 'https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument' }],
    },
  },
  {
    id: 'meta-thought',
    name: '元思考',
    description: '可以查看知识库顶的2个命题。',
    lore: {
      title: '元思考：关于思考的思考',
      summary: '元思考（Meta-thinking）是指对思考过程本身的反思。在数学中，这体现为对证明方法、公理系统和逻辑结构的审视。',
      conceptNote: '元思考代表了一种更高层次的认知能力：不仅解决问题，还审视解决问题的方法。这是哥德尔不完备定理的核心思想。',
      historyNote: '20世纪初，希尔伯特试图建立一个完备的、一致的数学公理系统。但哥德尔在1931年证明：任何足够强大的形式系统，如果是一致的，就一定是不完备的。这一发现迫使数学家们接受"元思考"的必要性。',
      tags: ['元思考', '哥德尔', '不完备定理', '元认知'],
      links: [{ label: '维基百科：元认知', url: 'https://en.wikipedia.org/wiki/Metacognition' }],
    },
  },
];

export function getChapter3Relic(id: string) {
  return chapter3Relics.find((relic) => relic.id === id);
}
