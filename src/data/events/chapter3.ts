import type { EventDef } from '../../types/game';

export const chapter3Events: EventDef[] = [
  {
    id: 'third-crisis',
    title: '罗素的信',
    quote: '亲爱的弗雷格，你的体系崩了。',
    description: '罗素悖论如同炸弹，摧毁了集合论的基础。弗雷格《算术基础》的第二卷即将出版，却发现整个体系建立在矛盾之上。你必须做出选择：如何回应这场危机？',
    choices: [
      {
        id: 'type-theory',
        label: '修改公理系统（类型论）',
        description: '获得"类型化"机制，命题库更复杂但稳定。',
        effect: { type: 'grant-card', cardId: 'group-action' },
      },
      {
        id: 'intuitionism',
        label: '否定无穷（直觉主义）',
        description: '失去所有"无穷"类命题，但免疫悖论质疑。',
        effect: { type: 'remove-card-tag', tag: 'infinity' },
      },
      {
        id: 'accept-incompleteness',
        label: '接受不完备性',
        description: '总有命题你无法打出，但获得"元思考"能力。',
        effect: { type: 'grant-relic', relicId: 'meta-thought' },
      },
    ],
  },
  {
    id: 'duel-night',
    title: '决斗之夜',
    quote: '我没有时间了。',
    description: '1832年5月29日，巴黎。伽罗瓦在决斗前夜写下最后的数学。你能否帮助他完成遗作，还是只能眼睁睁看着天才陨落？',
    choices: [
      {
        id: 'help-galois',
        label: '协助完成群论',
        description: '获得【群作用】命题，但损失10点声誉（熬夜）。',
        effect: { type: 'grant-card', cardId: 'group-action' },
      },
      {
        id: 'stop-duel',
        label: '阻止决斗',
        description: '伽罗瓦存活，获得他的遗物。但错过群论核心命题。',
        effect: { type: 'grant-relic', relicId: 'galois-legacy' },
      },
      {
        id: 'observe',
        label: '旁观历史',
        description: '获得2公理点，但无任何特殊奖励。',
        effect: { type: 'gain-gold', amount: 2 },
      },
    ],
  },
  {
    id: 'cantors-madness',
    title: '康托尔的疗养院',
    quote: '我看到了无穷……它就在窗外。',
    description: '康托尔再次精神崩溃，被送入疗养院。他的超穷数理论被学术界排斥，克罗内克公开攻击他是"科学的骗子"。你能安慰这位孤独的天才吗？',
    choices: [
      {
        id: 'support-cantor',
        label: '支持他的研究',
        description: '获得【连续统假设】，但累积2层精神压力。',
        effect: { type: 'grant-card', cardId: 'continuum-hypothesis' },
      },
      {
        id: 'caution-cantor',
        label: '劝他放弃无穷',
        description: '恢复15点声誉，但失去所有"无穷"类命题。',
        effect: { type: 'heal', amount: 15 },
      },
      {
        id: 'ignore',
        label: '默默离开',
        description: '获得1公理点。',
        effect: { type: 'gain-gold', amount: 1 },
      },
    ],
  },
  // 新事件：19岁的发现（高斯）
  {
    id: 'gauss-heptadecagon',
    title: '19岁的发现',
    quote: '我找到了！正十七边形可以用尺规作图！',
    description: '1796年3月30日，19岁的高斯在哥廷根的宿舍里发现了正十七边形的尺规作图法。这个发现困扰了数学家两千年的问题，让他决定放弃语言学，投身数学。',
    choices: [
      {
        id: 'number-theory',
        label: '像高斯一样专注数论',
        description: '获得卡牌【基本定理】和遗物【高斯分布】，但失去所有几何类卡牌。',
        effect: { type: 'grant-card', cardId: 'fundamental-theorem' },
      },
      {
        id: 'applied',
        label: '转向应用领域',
        description: '获得遗物【最小二乘法】和5公理点。',
        effect: { type: 'grant-relic', relicId: 'least-squares' },
      },
      {
        id: 'broad',
        label: '保持广泛的兴趣',
        description: '获得3公理点和3定理点，多样化发展。',
        effect: { type: 'gain-gold', amount: 3 },
      },
    ],
  },
  // 新事件：决斗前夜（伽罗瓦遗书）
  {
    id: 'galois-testament',
    title: '决斗前夜',
    quote: '我没有时间了。这些想法在我的脑海中已经成熟太久。',
    description: '1832年5月29日，伽罗瓦在决斗前夜通宵工作。他知道这可能是生命的最后一晚，必须将关于方程可解性的思想记录下来。他的笔在纸上飞舞，群论的雏形逐渐成形。',
    choices: [
      {
        id: 'all-night',
        label: '通宵工作留下遗产',
        description: '获得遗物【群论奠基】，但失去20点声誉（生命垂危）。',
        effect: { type: 'grant-relic', relicId: 'group-theory-foundation' },
      },
      {
        id: 'avoid',
        label: '试图避免决斗',
        description: '获得10点声誉和5公理点，但错过独特奖励。',
        effect: { type: 'heal', amount: 10 },
      },
      {
        id: 'entrust',
        label: '将数学思想托付给朋友',
        description: '获得卡牌【根式不可解】，延迟获得遗物。',
        effect: { type: 'grant-card', cardId: 'radical-unsolvable' },
      },
    ],
  },
  // 新事件：无穷的代价（康托尔精神崩溃）
  {
    id: 'price-of-infinity',
    title: '无穷的代价',
    quote: '我看到了超限数……它们比无穷还要无穷。',
    description: '康托尔的研究让他成为数学界的异端。克罗内克公开宣称他是"科学的骗子"，他的论文被拒绝发表，他的理论被嘲笑为"数学的堕落"。这种压力最终摧毁了他的精神。',
    choices: [
      {
        id: 'continue',
        label: '继续探索无穷',
        description: '获得卡牌【幂集】和【阿列夫零】，但获得"精神崩溃"负面状态。',
        effect: { type: 'grant-card', cardId: 'power-set' },
      },
      {
        id: 'rest',
        label: '暂时休息恢复',
        description: '恢复20点声誉，失去所有"无穷"类卡牌。',
        effect: { type: 'heal', amount: 20 },
      },
      {
        id: 'supporters',
        label: '寻找支持者',
        description: '获得遗物【希尔伯特的支持】，获得定理点奖励。',
        effect: { type: 'grant-relic', relicId: 'hilbert-support' },
      },
    ],
  },
];

export function getChapter3Event(id: string) {
  return chapter3Events.find((event) => event.id === id);
}
