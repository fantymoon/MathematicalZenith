import type { RelicDef } from '../../types/game';

export const chapter4Relics: RelicDef[] = [
  {
    id: 'source-code',
    name: '源代码',
    description: '可以查看所有敌人的完整数据。',
    lore: {
      title: '源代码：程序的灵魂',
      summary: '源代码是计算机程序的人类可读形式，包含了程序的逻辑、算法和数据结构。',
      conceptNote: '拥有源代码意味着完全理解一个程序的行为。在Meta游戏中，源代码代表最高层次的认知能力。',
      historyNote: '开源软件运动倡导代码的开放和共享。理查德·斯托曼在1983年发起GNU项目，林纳斯·托瓦兹在1991年发布Linux内核。这些运动改变了软件开发的格局。',
      tags: ['源代码', '开源', 'Meta', '程序'],
      links: [{ label: '维基百科：源代码', url: 'https://zh.wikipedia.org/wiki/%E6%BA%90%E4%BB%A3%E7%A0%81' }],
    },
  },
  {
    id: 'recursive-loop',
    name: '递归循环',
    description: '每场辩论限1次：重复使用上一个使用的命题。',
    lore: {
      title: '递归：自我调用的艺术',
      summary: '递归是计算机科学中的核心概念，指一个函数调用自身来解决问题。',
      conceptNote: '递归体现了自我指涉的思想：用自身定义自身。这与哥德尔不完备定理中的自我指涉陈述有异曲同工之妙。',
      historyNote: '递归函数理论由哥德尔、丘奇、图灵等人在1930年代发展。他们证明了递归函数与图灵可计算函数等价，这被称为"丘奇-图灵论题"。',
      tags: ['递归', '自我指涉', '计算理论', '丘奇-图灵论题'],
      links: [{ label: '维基百科：递归', url: 'https://zh.wikipedia.org/wiki/%E9%80%92%E5%BD%92' }],
    },
  },
  {
    id: 'godel-numbering',
    name: '哥德尔编号',
    description: '所有命题的思考时间-1（最低0）。',
    lore: {
      title: '哥德尔编号：将元数学编码为算术',
      summary: '哥德尔编号是哥德尔在证明不完备定理时发明的技巧，它将数学陈述和证明编码为自然数。',
      conceptNote: '哥德尔编号的核心思想是：用数字代表符号，用数字的质因数分解代表符号序列。这样，元数学陈述就变成了算术陈述。',
      historyNote: '哥德尔编号是哥德尔证明的关键。通过将"这个命题不可证明"编码为算术陈述，哥德尔构造了一个在系统内谈论自身的命题，从而证明了不完备定理。',
      tags: ['哥德尔编号', '编码', '不完备定理', '元数学'],
      links: [{ label: '维基百科：哥德尔编号', url: 'https://en.wikipedia.org/wiki/G%C3%B6del_numbering' }],
    },
  },
];

export function getChapter4Relic(id: string) {
  return chapter4Relics.find((relic) => relic.id === id);
}
