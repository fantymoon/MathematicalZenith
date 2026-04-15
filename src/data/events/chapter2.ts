import type { EventDef } from '../../types/game';

export const chapter2Events: EventDef[] = [
  {
    id: 'second-crisis',
    title: '无穷小的幽灵',
    quote: '"这些消失的量的幽灵，究竟为何物？"',
    description: '贝克莱主教的质疑在学术界回荡。他的《分析学家》直指微积分的基础。你必须为这门新学科辩护，选择你的立场。',
    choices: [
      {
        id: 'newton-approach',
        label: '坚持流数术',
        description: '获得【流数术】命题，但每回合有20%概率思考时间+1（概念不严谨的风险）。',
        effect: { type: 'grant-card', cardId: 'fluxion' },
      },
      {
        id: 'cauchy-approach',
        label: '转向ε-δ定义',
        description: '获得【ε-δ定义】命题，所有命题效果-1但稳定性+1（严格但保守）。',
        effect: { type: 'grant-card', cardId: 'epsilon-delta' },
      },
      {
        id: 'ignore',
        label: '暂不回应',
        description: '获得3公理点，但后续遇到贝克莱时受到双倍质疑。',
        effect: { type: 'gain-gold', amount: 3 },
      },
    ],
  },
  {
    id: 'priority-dispute',
    title: '优先权之争',
    quote: '谁先发明了微积分？',
    description: '牛顿的追随者与莱布尼茨的拥护者争论不休。皇家学会介入调查，欧洲大陆与英国岛之间的数学交流逐渐中断。你选择站在哪一边？',
    choices: [
      {
        id: 'newton-side',
        label: '支持牛顿',
        description: '获得【牛顿迭代】，但无法获得莱布尼茨类命题。英国传统，物理直观。',
        effect: { type: 'grant-card', cardId: 'newton-method' },
      },
      {
        id: 'leibniz-side',
        label: '支持莱布尼茨',
        description: '获得【莱布尼茨记号】，但无法获得莱布尼茨类命题。欧洲大陆，符号优雅。',
        effect: { type: 'grant-card', cardId: 'leibniz-notation' },
      },
      {
        id: 'neutral',
        label: '保持中立',
        description: '获得2公理点，但双方都不愿与你分享高级命题。独立但孤立。',
        effect: { type: 'gain-gold', amount: 2 },
      },
    ],
  },
  {
    id: 'tangent-problem',
    title: '切线问题',
    quote: '如何作任意曲线的切线？',
    description: '一位年轻数学家向你请教切线作法。这个问题曾困扰费马、笛卡尔等前辈，现在轮到你给出答案。',
    choices: [
      {
        id: 'geometric',
        label: '几何方法',
        description: '获得【切线逼近】，但思考时间+1。',
        effect: { type: 'grant-card', cardId: 'tangent-line' },
      },
      {
        id: 'analytic',
        label: '分析方法',
        description: '获得【导数运算】，但需要先建立逻辑防御。',
        effect: { type: 'grant-card', cardId: 'derivative' },
      },
      {
        id: 'refuse',
        label: '拒绝回答',
        description: '获得1公理点，无事发生。',
        effect: { type: 'gain-gold', amount: 1 },
      },
    ],
  },
  // 新事件：失明后的光芒（欧拉）
  {
    id: 'euler-blindness',
    title: '失明后的光芒',
    quote: '我的眼睛看不见了，但我的心灵更明亮。',
    description: '1766年，一场疾病夺走了你的视力。但你发现，失明反而让你摆脱了视觉的束缚，能够更纯粹地在脑海中构建数学结构。你的口述速度甚至超过了从前书写的速度。',
    choices: [
      {
        id: 'mental-calculation',
        label: '依靠记忆和心算继续',
        description: '获得遗物【心算大师】：所有0费牌效果翻倍，但手牌上限-1。',
        effect: { type: 'grant-relic', relicId: 'mental-calculation' },
      },
      {
        id: 'dictation',
        label: '培养口述记录的习惯',
        description: '获得卡牌【欧拉公式】和遗物【口述传统】。',
        effect: { type: 'grant-card', cardId: 'euler-formula' },
      },
      {
        id: 'abstract',
        label: '转向更抽象的数学',
        description: '获得15公理点，但失去5点声誉（过于抽象难以被理解）。',
        effect: { type: 'gain-gold', amount: 15 },
      },
    ],
  },
  // 新事件：没有图的书（拉格朗日）
  {
    id: 'lagrange-mechanics',
    title: '没有图的书',
    quote: '我不需要图，分析就足够了。',
    description: '你正在撰写《分析力学》，决定用纯分析的方法重写整个力学体系。你的同行们质疑：没有一张图，读者如何理解？你回答：真正的理解来自思维，而非视觉。',
    choices: [
      {
        id: 'pure-analysis',
        label: '学习这种抽象方法',
        description: '获得卡牌【变分法】和【拉格朗日点】，但所有卡牌思考时间+1。',
        effect: { type: 'grant-card', cardId: 'calculus-of-variations' },
      },
      {
        id: 'geometric-intuition',
        label: '坚持几何直观',
        description: '恢复8点声誉和遗物【几何直觉】。',
        effect: { type: 'heal', amount: 8 },
      },
      {
        id: 'combine',
        label: '尝试结合两者',
        description: '获得5公理点和5定理点，平衡发展。',
        effect: { type: 'gain-gold', amount: 5 },
      },
    ],
  },
  // 新事件：约翰·伯努利的挑战（最速降线）
  {
    id: 'brachistochrone-challenge',
    title: '约翰·伯努利的挑战',
    quote: '我，约翰·伯努利，向全欧洲最敏锐的数学家发出挑战。',
    description: '1696年，约翰·伯努利在《学者学报》上公开挑战：给定两点，求使质点在最短时间内下滑的曲线。他声称自己知道答案，但想看看其他人能否解答。',
    choices: [
      {
        id: 'accept-challenge',
        label: '接受挑战并解答',
        description: '获得遗物【最速降线】，但失去10点声誉（解答过程艰辛）。',
        effect: { type: 'grant-relic', relicId: 'brachistochrone-curve' },
      },
      {
        id: 'anonymous',
        label: '匿名提交答案（如牛顿般）',
        description: '获得卡牌【变分法】和10定理点，保持匿名直到最后。',
        effect: { type: 'grant-card', cardId: 'calculus-of-variations' },
      },
      {
        id: 'learn',
        label: '学习他人的解法',
        description: '获得3公理点和3定理点，稳健但无突出成就。',
        effect: { type: 'gain-gold', amount: 3 },
      },
    ],
  },
];

export function getChapter2Event(id: string) {
  return chapter2Events.find((event) => event.id === id);
}
