import type { EventDef } from '../../types/game';

export const chapter4Events: EventDef[] = [
  {
    id: 'room-404',
    title: '404房间',
    quote: '你真的该来这儿吗？',
    description: '地图边缘的隐藏节点，只有通过特殊手段才能到达。这里似乎……不在游戏的设计之内。',
    choices: [
      {
        id: 'modify-hp',
        label: '修改声誉上限',
        description: '学术声誉上限+20。',
        effect: { type: 'modify-stat', stat: 'maxHp', amount: 20 },
      },
      {
        id: 'modify-energy',
        label: '修改思考时间',
        description: '每回合思考时间+1。',
        effect: { type: 'modify-stat', stat: 'maxEnergy', amount: 1 },
      },
      {
        id: 'unlock-all',
        label: '解锁所有命题',
        description: '从知识库中调取3个任意命题。',
        effect: { type: 'draw-any', amount: 3 },
      },
      {
        id: 'leave',
        label: '离开',
        description: '什么也没发生。你似乎听到了一声叹息。',
        effect: { type: 'none' },
      },
    ],
  },
  {
    id: 'recursive-stairs',
    title: '递归楼梯',
    quote: '你还在走吗？',
    description: '无限循环的楼梯，每一步都似曾相识。你走了很久，却似乎一直在原地。',
    choices: [
      {
        id: 'continue',
        label: '继续前进',
        description: '获得1公理点，但可能陷入无限循环（再次遇到此事件）。',
        effect: { type: 'gain-gold', amount: 1 },
      },
      {
        id: 'break-loop',
        label: '跳出循环',
        description: '使用【极限】或【群论】命题打破循环，获得奖励。',
        effect: { type: 'grant-card', cardId: 'limit-concept' },
      },
      {
        id: 'accept-infinite',
        label: '接受无限',
        description: '获得【阿列夫零】，但损失5点声誉。',
        effect: { type: 'grant-card', cardId: 'aleph-null' },
      },
    ],
  },
  {
    id: 'hilberts-dream',
    title: '希尔伯特的梦',
    quote: '我们必须知道，我们必将知道。',
    description: '大卫·希尔伯特站在数学殿堂的门前，他的眼中闪烁着对完备性的渴望。哥德尔的阴影正在逼近。你会告诉他真相吗？',
    choices: [
      {
        id: 'tell-truth',
        label: '告诉他真相',
        description: '希尔伯特崩溃，你获得【不完备定理】。但所有公理类命题效果-1。',
        effect: { type: 'grant-card', cardId: 'incompleteness-theorem' },
        overlay: {
          title: '这不可能...',
          theme: 'pressure',
          subtitle: '我们必须知道，我们必将知道。——哥德尔那小子出来，我们聊聊。',
          kicker: '希尔伯特的崩溃',
        },
      },
      {
        id: 'keep-silent',
        label: '保持沉默',
        description: '希尔伯特继续他的梦想，你获得2公理点。',
        effect: { type: 'gain-gold', amount: 2 },
      },
      {
        id: 'comfort-him',
        label: '安慰他',
        description: '即使不完备，数学依然美丽。恢复10点声誉。',
        effect: { type: 'heal', amount: 10 },
      },
    ],
  },
  {
    id: 'turing-test',
    title: '图灵测试',
    quote: '你能分辨出我是人还是机器吗？',
    description: '一个声音从终端传来，声称自己是图灵机的化身。它在测试你——或者说，它在测试这个游戏本身。',
    choices: [
      {
        id: 'human',
        label: '你是人类',
        description: '获得【代码检视】，但下回合思考时间-1。',
        effect: { type: 'grant-card', cardId: 'code-inspect' },
      },
      {
        id: 'machine',
        label: '你是机器',
        description: '获得【停机问题】，但受到5点质疑。',
        effect: { type: 'grant-card', cardId: 'halting-problem' },
      },
      {
        id: 'meta',
        label: '这重要吗？',
        description: '获得【元证明】，但每场辩论限用1次。',
        effect: { type: 'grant-card', cardId: 'meta-proof' },
      },
    ],
  },
  // 新事件：初中文凭的数学家（华罗庚）
  {
    id: 'self-taught-mathematician',
    title: '初中文凭的数学家',
    quote: '天才在于积累，聪明在于勤奋。',
    description: '你仅有初中学历，却凭借自学在数论领域取得突破。熊庆来慧眼识中你，邀请你进入清华大学。这是改变命运的机会，但你必须证明自己。',
    choices: [
      {
        id: 'persist',
        label: '坚持自学',
        description: '获得遗物【自学成才】：每回合首次使用0费牌后，抽1张牌。',
        effect: { type: 'grant-relic', relicId: 'self-taught' },
      },
      {
        id: 'mentor',
        label: '寻找导师',
        description: '获得卡牌【统筹法】和5公理点，立即获得帮助。',
        effect: { type: 'grant-card', cardId: 'overall-planning' },
      },
      {
        id: 'apply',
        label: '将数学应用于实际',
        description: '获得遗物【优选法】和卡牌【0-1规划】，走向应用数学之路。',
        effect: { type: 'grant-relic', relicId: 'optimal-method' },
      },
    ],
  },
  // 新事件：无薪授课的女性（诺特）
  {
    id: 'unpaid-female-professor',
    title: '无薪授课的女性',
    quote: '艾米·诺特是数学科学高耸的金字塔。',
    description: '你是一位女性数学家，在哥廷根大学无薪授课多年。希尔伯特为你的教职资格与校方激烈争论："我不认为性别是反对她成为讲师的理由。毕竟，这里是大学，不是浴场。"',
    choices: [
      {
        id: 'persist-research',
        label: '坚持研究等待认可',
        description: '获得遗物【诺特定理】（延迟但强大的奖励），但本回合无法获得其他奖励。',
        effect: { type: 'grant-relic', relicId: 'noether-theorem' },
      },
      {
        id: 'hilbert-support',
        label: '寻求希尔伯特的支持',
        description: '获得遗物【希尔伯特的辩护】，获得盟友帮助和5公理点。',
        effect: { type: 'grant-relic', relicId: 'hilbert-defense' },
      },
      {
        id: 'emigrate',
        label: '离开德国前往美国',
        description: '获得卡牌【抽象代数】和10定理点，改变游戏路径。',
        effect: { type: 'grant-card', cardId: 'abstract-algebra' },
      },
    ],
  },
  // 新事件：最后一位全能数学家（冯·诺依曼）
  {
    id: 'last-universal-mathematician',
    title: '最后一位全能数学家',
    quote: '如果有人不相信数学是简单的，那是因为他们没有意识到人生有多复杂。',
    description: '你在多个领域都有开创性贡献：计算机架构、博弈论、量子力学、核物理。同事们惊叹你的计算速度，称你为"最后一位全能数学家"。但你意识到，时代正在改变。',
    choices: [
      {
        id: 'multiple-fields',
        label: '在多个领域同时发展',
        description: '获得遗物【存储程序】和【博弈均衡】，多样化奖励。',
        effect: { type: 'grant-relic', relicId: 'stored-program' },
      },
      {
        id: 'computer-focus',
        label: '专注于计算机科学',
        description: '获得卡牌【自复制自动机】和遗物【冯·诺依曼架构】。',
        effect: { type: 'grant-card', cardId: 'self-replication' },
      },
      {
        id: 'manhattan',
        label: '参与曼哈顿计划',
        description: '获得20公理点，但失去10点声誉（道德困境）。',
        effect: { type: 'gain-gold', amount: 20 },
      },
    ],
  },
  // 新事件：普林斯顿的散步道（哥德尔与爱因斯坦）
  {
    id: 'princeton-walks',
    title: '普林斯顿的散步道',
    quote: '哥德尔和爱因斯坦每日在此散步，讨论哲学和物理。',
    description: '普林斯顿高等研究院的林荫道上，你遇到了爱因斯坦。他邀请你一起散步，讨论不完备定理与相对论的关系。你们的友谊将超越数学和物理的边界。',
    choices: [
      {
        id: 'incompleteness',
        label: '深入讨论不完备定理',
        description: '获得15公理点和遗物【哥德尔的证明】。',
        effect: { type: 'gain-gold', amount: 15 },
      },
      {
        id: 'relativity',
        label: '探讨相对论与逻辑的关系',
        description: '获得卡牌【自指】和遗物【时空弯曲】。',
        effect: { type: 'grant-card', cardId: 'self-reference' },
      },
      {
        id: 'silence',
        label: '保持沉默享受宁静',
        description: '恢复15点声誉，获得内心的平静。',
        effect: { type: 'heal', amount: 15 },
      },
    ],
  },
];

export function getChapter4Event(id: string) {
  return chapter4Events.find((event) => event.id === id);
}
