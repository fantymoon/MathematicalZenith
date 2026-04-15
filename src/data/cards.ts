import type { CardDef, CardId } from '../types/game';
import { chapter1Cards } from './cards/chapter1';
import { chapter2Cards } from './cards/chapter2';
import { chapter3Cards } from './cards/chapter3';
import { chapter4Cards } from './cards/chapter4';

// Merge all chapter cards
const chapterCards: CardDef[] = [
  ...chapter1Cards,
  ...chapter2Cards,
  ...chapter3Cards,
  ...chapter4Cards,
];

// Convert to record
const chapterCardsRecord: Record<string, CardDef> = {};
for (const card of chapterCards) {
  chapterCardsRecord[card.id] = card;
}

export const cards: Record<string, CardDef> = {
  // All chapter cards merged from chapterCardsRecord
  ...chapterCardsRecord,
  // Descartes exclusive cards
  'heart-function': {
    id: 'heart-function',
    name: '心形函数',
    cost: 2,
    type: 'skill',
    description: '对敌人施加【迷恋】；下回合该敌质疑力度减 50%且必须质疑你。',
    flavor: 'r=a(1-sinθ)，克里斯汀的曲线。没想到吧？"我思故我在"的老顽固心里也有柔软的地方。',
    character: 'descartes',
    effects: [{ type: 'block', amount: 10 }],
    lore: {
      title: '心形曲线：笛卡尔的浪漫传说',
      summary: '传说笛卡尔发明了心形曲线 r=a(1-sinθ) 作为写给瑞典公主克里斯蒂娜的情书。',
      conceptNote: '这张牌代表笛卡尔理性外表下的浪漫一面，通过"迷恋"效果改变敌人的质疑模式。',
      historyNote: '笛卡尔于1649年应瑞典女王克里斯蒂娜的邀请前往斯德哥尔摩担任宫廷哲学家。传说他爱上了公主，并用心形曲线作为情书。虽然这个故事可能是后人附会，但它已经成为数学浪漫的象征。笛卡尔于1650年因肺炎去世，葬于斯德哥尔摩，后迁葬巴黎。',
      tags: ['笛卡尔', '心形曲线', '浪漫', '解析几何'],
      links: [{ label: '维基百科：心形曲线', url: 'https://zh.wikipedia.org/wiki/%E5%BF%83%E5%BD%A2%E6%9B%B2%E7%BA%BF' }],
    },
  },
  'universal-doubt': {
    id: 'universal-doubt',
    name: '普遍怀疑',
    cost: 1,
    type: 'skill',
    description: '移除自身所有 Debuff；若成功则获得 1 层【脆弱】。',
    flavor: '除了"我在怀疑"这件事本身，其他的都可以怀疑。这个命题是真的吗？这个推论是有效的吗？',
    character: 'descartes',
    effects: [{ type: 'block', amount: 5 }],
    lore: {
      title: '普遍怀疑：笛卡尔的方法论',
      summary: '笛卡尔提出"普遍怀疑"作为寻求确定知识的方法，通过怀疑一切来找到不可怀疑的基础。',
      conceptNote: '这张牌体现笛卡尔的怀疑精神，通过移除Debuff来"怀疑掉"负面状态，但怀疑本身也有代价。',
      historyNote: '笛卡尔在《第一哲学沉思集》中系统地运用了普遍怀疑的方法。他怀疑感官、怀疑梦境、甚至怀疑数学真理（可能存在欺骗的恶魔）。最终，他发现"我在怀疑"这件事本身是不可怀疑的，因为怀疑本身证明了思考者的存在——这就是著名的"我思故我在"。',
      tags: ['笛卡尔', '怀疑论', '方法论', '我思故我在'],
      links: [{ label: '维基百科：普遍怀疑', url: 'https://zh.wikipedia.org/wiki/%E6%88%91%E6%80%9D%E6%95%85%E6%88%91%E5%9C%A8' }],
    },
  },
  'dualism': {
    id: 'dualism',
    name: '二元论',
    cost: 1,
    type: 'attack',
    description: '选"心灵"：提出 10 点质疑+抽 2 张牌；选"物质"：提出 20 点质疑+弃 2 张牌。',
    flavor: '心灵与物质像 X 轴 Y 轴，纠缠本质却分离。你在想赢（心灵），身体想躺平（物质）？',
    character: 'descartes',
    effects: [{ type: 'damage', amount: 10 }, { type: 'draw', amount: 2 }],
    lore: {
      title: '心物二元论：笛卡尔的哲学核心',
      summary: '笛卡尔提出心物二元论，认为心灵（思维实体）和物质（广延实体）是两种根本不同的实体。',
      conceptNote: '这张牌让玩家在"心灵"（抽牌/灵活）和"物质"（高质疑/弃牌）之间选择，体现二元对立统一的哲学思想。',
      historyNote: '笛卡尔的二元论对后世哲学产生了深远影响。他认为心灵没有广延（不占据空间），物质不能思考。这一理论也引发了"心身问题"：如果心灵和物质完全不同，它们如何相互作用？笛卡尔认为松果体是两者的交汇点，但这并未解决问题。后来的斯宾诺莎、莱布尼茨等人都试图解决这一难题。',
      tags: ['笛卡尔', '二元论', '心身问题', '哲学'],
      links: [{ label: '维基百科：二元论', url: 'https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%85%83%E8%AE%BA' }],
    },
  },
};

export const rewardPool: CardId[] = [
  'golden-ratio',
  'fifth-postulate',
  'point-line-plane',
  'bell-curve',
  'optimal-method',
  'irrational-spark',
];

export function getCard(id: CardId) {
  return cards[id];
}
