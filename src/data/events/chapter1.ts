import type { EventDef } from '../../types/game';

export const chapter1Events: EventDef[] = [
  {
    id: 'irrational-crisis',
    title: '无理数危机',
    quote: '"它不是整数。"',
    description: '希帕索斯把 √2 写在羊皮纸上。学派大厅一片死寂。你必须表态。',
    choices: [
      {
        id: 'accept',
        label: '承认无理数',
        description: '获得遗物【无理数直觉】与卡牌【无理数火花】。',
        effect: { type: 'grant-relic', relicId: 'irrational-insight' },
      },
      {
        id: 'deny',
        label: '否认它',
        description: '立即恢复 12 点声誉，但错过关键真理。',
        effect: { type: 'heal', amount: 12 },
      },
      {
        id: 'silent',
        label: '保持沉默',
        description: '获得 2 公理点，并承受 6 点声誉损失。',
        effect: { type: 'gain-gold', amount: 2 },
      },
    ],
  },
  {
    id: 'compass-dispute',
    title: '尺规争论',
    quote: '没有刻度，只有规矩。',
    description: '一位老工匠递来破损圆规，问你是想精炼牌组，还是守住眼前体力。',
    choices: [
      {
        id: 'fifth-postulate',
        label: '写下《第五公设》',
        description: '获得公理【第五公设】。',
        effect: { type: 'grant-card', cardId: 'fifth-postulate' },
      },
      {
        id: 'remove-card',
        label: '磨去一处毛刺',
        description: '从命题库中移除 1 个命题。',
        effect: { type: 'remove-card', amount: 1 },
      },
      {
        id: 'rest',
        label: '暂且修整',
        description: '恢复 10 点声誉。',
        effect: { type: 'heal', amount: 10 },
      },
    ],
  },
  {
    id: 'lost-manuscript',
    title: '遗失的手稿',
    quote: '纸页发黄，公式仍在发光。',
    description: '你在柱廊尽头发现一页被火烤过的手稿，边缘写着黄金比例。',
    choices: [
      {
        id: 'take-card',
        label: '收入命题库',
        description: '获得推导命题【黄金分割】。',
        effect: { type: 'grant-card', cardId: 'golden-ratio' },
      },
      {
        id: 'take-relic',
        label: '装入金属框',
        description: '获得遗物【遗失的手稿】。',
        effect: { type: 'grant-relic', relicId: 'lost-manuscript' },
      },
      {
        id: 'burned-edge',
        label: '强行撕下残页',
        description: '获得 3 公理点，但损失 5 点声誉。',
        effect: { type: 'gain-gold', amount: 3 },
      },
    ],
  },
  // 新事件：尤里卡时刻（阿基米德）
  {
    id: 'eureka-moment',
    title: '尤里卡时刻',
    quote: '我找到了！',
    description: '你浸泡在浴缸中，看着水位上升，突然意识到：物体的体积等于它排开的水的体积。这就是浮力定律！',
    choices: [
      {
        id: 'celebrate',
        label: '像阿基米德一样裸奔庆祝',
        description: '获得遗物【浮力直觉】，但损失 5 点声誉（毕竟没穿衣服）。',
        effect: { type: 'grant-relic', relicId: 'buoyancy-insight' },
      },
      {
        id: 'record',
        label: '冷静记录发现',
        description: '获得卡牌【排水法】和 2 公理点。',
        effect: { type: 'grant-card', cardId: 'displacement-method' },
      },
      {
        id: 'deeper',
        label: '继续思考更深入的问题',
        description: '获得 15 点公理点，但本回合无法行动。',
        effect: { type: 'gain-gold', amount: 15 },
      },
    ],
  },
  // 新事件：学派入会仪式（毕达哥拉斯）
  {
    id: 'pythagorean-initiation',
    title: '学派入会仪式',
    quote: '万物皆数，数即万物。',
    description: '毕达哥拉斯学派的成员邀请你加入他们的秘密社团。他们相信宇宙的本质是整数比例，音乐、天文、几何都遵循数的和谐。但加入需要遵守严格的戒律：禁食豆子、不触碰白公鸡、不打破面包。',
    choices: [
      {
        id: 'join',
        label: '宣誓保密并加入',
        description: '获得遗物【和谐比例】，但获得"禁食豆子"负面状态（无法使用豆类相关卡牌）。',
        effect: { type: 'grant-relic', relicId: 'harmony-ratio' },
      },
      {
        id: 'learn',
        label: '拒绝加入但学习其方法',
        description: '获得卡牌【毕达哥拉斯定理】和 3 公理点。',
        effect: { type: 'grant-card', cardId: 'pythagorean-theorem' },
      },
      {
        id: 'expose',
        label: '揭露学派的秘密',
        description: '获得 20 公理点，但遭遇学派成员的敌视（下一场战斗敌人攻击+3）。',
        effect: { type: 'gain-gold', amount: 20 },
      },
    ],
  },
  // 新事件：瑞典女王的书房（笛卡尔）
  {
    id: 'queen-christina-study',
    title: '瑞典女王的书房',
    quote: '给我一个小时，我能解释清楚一切。',
    description: '瑞典女王克里斯蒂娜邀请你前往斯德哥尔摩，每天早晨五点为她讲授哲学和数学。严寒的气候让你咳嗽不止，但女王的学习热情让你感动。你决定用数学表达某种情感。',
    choices: [
      {
        id: 'accept',
        label: '接受女王的邀请',
        description: '获得卡牌【心形曲线】和遗物【坐标系】。',
        effect: { type: 'grant-card', cardId: 'heart-function' },
      },
      {
        id: 'decline',
        label: '婉拒并继续研究',
        description: '获得 10 公理点，保持健康。',
        effect: { type: 'gain-gold', amount: 10 },
      },
      {
        id: 'love',
        label: '用数学表达爱意',
        description: '获得独特卡牌【我思故我在】，但损失 8 点声誉（女王不悦）。',
        effect: { type: 'grant-card', cardId: 'universal-doubt' },
      },
    ],
  },
];

export function getChapter1Event(id: string) {
  return chapter1Events.find((event) => event.id === id);
}
