import type { CharacterDef } from '../../types/game';

type CharacterDisplayDef = CharacterDef & {
  portraitLabel: string;
  portraitAccent: string;
};

export const chapter1Characters: CharacterDisplayDef[] = [
  {
    id: 'euclid',
    name: '欧几里得',
    title: '几何奠基者',
    color: '#e9d28a',
    portraitLabel: 'GEOMETRY / ORDER',
    portraitAccent: '几何线稿',
    summary: '以稳健构筑和结构化组合推进论证的基础型学者。',
    passiveName: '几何直观',
    passiveDescription: '每回合使用第 3 个命题时，获得 5 点逻辑防御。',
    playstyle: '稳健 / 防御 / 组合',
    maxHp: 76,
    chapterId: 'chapter1',
    starterDeck: ['strike', 'strike', 'guard', 'guard', 'point-line-plane', 'triangle-stability', 'line-axiom', 'perpendicular-shortest', 'sas-congruence'],
    lore: {
      title: '欧几里得与《几何原本》',
      summary: '欧几里得通常被视为古典几何体系的整理者，《几何原本》定义了后世“从公设出发逐步证明”的标准范式。',
      conceptNote: '在这套角色设计里，欧几里得代表的是“结构先于灵感”的证明观：先立公理，再分层推出结论。',
      historyNote: '关于欧几里得的生平，历史记载甚少，只知道他活跃于公元前300年左右的亚历山大里亚。但他的《几何原本》（Στοιχεῖα）却成为西方文明史上最具影响力的著作之一。全书十三卷，从五条公设出发，系统建立了平面几何、数论和立体几何的理论体系。中世纪，《几何原本》成为大学教育的核心教材。文艺复兴时期，它被翻译成各国语言，深刻影响了科学革命时期的思维方式。直到19世纪非欧几何的发现，才动摇了欧氏几何的独尊地位。',
      tags: ['古希腊', '几何', '公理体系', '数学史'],
      links: [{ label: '维基百科：欧几里得', url: 'https://zh.wikipedia.org/wiki/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97' }],
    },
  },

  {
    id: 'archimedes',
    name: '阿基米德',
    title: '力学先驱',
    color: '#c9a227',
    portraitLabel: 'LEVER / DISPLACEMENT',
    portraitAccent: '杠杆原理',
    summary: '给我一个支点，我就能撬动整个战场。用杠杆原理和几何直觉征服对手。',
    passiveName: '杠杆原理',
    passiveDescription: '每回合第3个命题效果翻倍（质疑或逻辑防御）。',
    playstyle: '累积 / 爆发 / 几何力学',
    maxHp: 78,
    chapterId: 'chapter1',
    starterDeck: ['strike', 'strike', 'guard', 'guard', 'lever-principle', 'displacement-method', 'spiral-attack', 'line-axiom', 'golden-ratio'],
    lore: {
      title: '阿基米德：古希腊最伟大的数学家',
      summary: '阿基米德是古希腊数学家、物理学家、工程师，以杠杆原理、浮力定律和穷竭法闻名于世。',
      conceptNote: '这个角色强调"以小博大"的杠杆思维，通过累积资源在关键时刻爆发。',
      historyNote: '阿基米德（公元前287-212年）出生于西西里岛的叙拉古。他在亚历山大里亚学习后回到故乡，为国王希伦二世服务。他发现了杠杆原理（"给我一个支点，我就能撬动地球"）、浮力定律（"尤里卡！"），并用穷竭法计算圆周率、球体积等。在罗马围攻叙拉古时，他设计了许多战争机械保卫城市，最终在被罗马士兵杀害时还在研究几何图形。',
      tags: ['古希腊', '力学', '几何', '阿基米德'],
      links: [{ label: '维基百科：阿基米德', url: 'https://zh.wikipedia.org/wiki/%E9%98%BF%E5%9F%BA%E7%B1%B3%E5%BE%B7' }],
    },
  },
  {
    id: 'pythagoras',
    name: '毕达哥拉斯',
    title: '数的先知',
    color: '#8b4513',
    portraitLabel: 'HARMONY / RATIO',
    portraitAccent: '和谐比例',
    summary: '万物皆数。用整数比例和音乐和谐来揭示宇宙的隐秘秩序。',
    passiveName: '万物皆数',
    passiveDescription: '手牌数为整数平方（1,4,9...）时，本回合所有命题效果+50%。',
    playstyle: '节奏 / 数学 / 和谐',
    maxHp: 72,
    chapterId: 'chapter1',
    starterDeck: ['strike', 'strike', 'guard', 'guard', 'pythagorean-theorem', 'harmony-of-spheres', 'tetraktys', 'line-axiom', 'golden-ratio'],
    lore: {
      title: '毕达哥拉斯：数学作为宗教',
      summary: '毕达哥拉斯是古希腊哲学家、数学家，创立了毕达哥拉斯学派，主张"万物皆数"。',
      conceptNote: '这个角色强调"数的和谐"，通过控制手牌数量来触发强大的数学效果。',
      historyNote: '毕达哥拉斯（公元前570-495年）出生于萨摩斯岛，后移居意大利南部的克罗顿，创立了著名的毕达哥拉斯学派。这是一个集宗教、哲学、科学于一体的秘密社团。他们发现了勾股定理（在西方称为毕达哥拉斯定理）、无理数（虽然这动摇了他们的信仰）、音乐中的数学比例等。毕达哥拉斯学派相信数是万物的本原，宇宙的和谐可以用整数比来描述。',
      tags: ['古希腊', '毕达哥拉斯', '数的哲学', '和谐'],
      links: [{ label: '维基百科：毕达哥拉斯', url: 'https://zh.wikipedia.org/wiki/%E6%AF%95%E8%BE%BE%E5%93%A5%E6%8B%89%E6%96%AF' }],
    },
  },
  {
    id: 'descartes',
    name: '笛卡尔',
    title: '怀疑论者',
    color: '#3498db',
    portraitLabel: 'COORDINATE / LOGIC',
    portraitAccent: '坐标网格',
    summary: '通过坐标转换和哲学思考，在虚实之间游走的策略型学者。',
    passiveName: '普遍怀疑',
    passiveDescription: '受到无意图伤害时防止该伤害并获得等量力量；所有0费牌打出时随机获得一个Buff或Debuff。',
    playstyle: '控制 / 反制 / 哲学',
    maxHp: 72,
    chapterId: 'chapter1',
    starterDeck: ['strike', 'strike', 'guard', 'guard', 'heart-function', 'universal-doubt', 'dualism', 'line-axiom', 'golden-ratio'],
    lore: {
      title: '笛卡尔：解析几何与普遍怀疑的哲学家',
      summary: '勒内·笛卡尔，法国哲学家、数学家，解析几何创始人，著有《方法论》，提出"我思故我在"。',
      conceptNote: '这个角色强调"坐标转换"和"二元论"，通过控制战场和哲学思考来获得优势。',
      historyNote: '笛卡尔（1596-1650）是法国哲学家、数学家、科学家，被誉为"近代哲学之父"。他创立了解析几何，将代数与几何统一起来。他的哲学以"普遍怀疑"为方法，最终得出"我思故我在"的结论。他还提出了心物二元论，对后世哲学产生了深远影响。1649年，他应瑞典女王克里斯蒂娜的邀请前往斯德哥尔摩，次年因肺炎去世。传说他发明的心形曲线 r=a(1-sinθ) 是写给克里斯蒂娜的情书。',
      tags: ['解析几何', '笛卡尔', '哲学', '我思故我在'],
      links: [{ label: '维基百科：笛卡尔', url: 'https://zh.wikipedia.org/wiki/%E5%8B%92%E5%86%85%C2%B7%E7%AC%9B%E5%8D%A1%E5%B0%94' }],
    },
  },
];

export function getChapter1Character(id: string) {
  return chapter1Characters.find((character) => character.id === id);
}
