import type { EnemyDef } from '../../types/game';

type EnemyDisplayDef = EnemyDef & {
  sigil: string;
  fxTheme: 'normal' | 'boss';
};

export const chapter1Enemies: EnemyDisplayDef[] = [
  {
    id: 'polygon-soldier',
    name: '多边形',
    maxHp: 42,
    description: '边数越多，防线越硬。第一章的标准练习题。',
    sigil: '△',
    fxTheme: 'normal',
    lore: {
      title: '多边形与"结构越多越稳定"的直觉',
      summary: '多边形不是对应某一位真实数学家，而是把古典几何中的"图形秩序"人格化后的关卡敌人。',
      conceptNote: '从三角形到多边形，边与角的增加意味着结构关系不断增多，因此它很适合作为"基础几何防线"的象征。',
      historyNote: '多边形的研究可以追溯到古埃及和巴比伦时期，但系统的理论始于古希腊。毕达哥拉斯学派已经知道正多边形的作图问题，而欧几里得在《几何原本》第四卷中系统讨论了正多边形的构造。正五边形的构造与黄金分割密切相关，这一发现被认为是毕达哥拉斯学派的重大成就。高斯在19世纪解决了哪些正多边形可以用尺规作图的问题，这是代数与几何联系的早期范例。',
      tags: ['几何', '多边形', '基础概念'],
      links: [{ label: '维基百科：多边形', url: 'https://zh.wikipedia.org/wiki/%E5%A4%9A%E8%BE%B9%E5%BD%A2' }],
    },
    actions: [
      {
        intent: { type: 'attack', value: 8, label: '边锋突刺', detail: '提出 8 点质疑。' },
      },
      {
        intent: { type: 'block', value: 8, label: '棱角固守', detail: '建立 8 点逻辑防御。' },
        onAct: 'gain-block',
      },
      {
        intent: { type: 'attack', value: 11, label: '多边切割', detail: '提出 11 点质疑。' },
      },
    ],
  },
  {
    id: 'pythagoras-disciple',
    name: '毕达哥拉斯信徒',
    maxHp: 48,
    description: '试图把一切都约束为整数秩序。',
    sigil: '□',
    fxTheme: 'normal',
    lore: {
      title: '毕达哥拉斯学派与整数秩序',
      summary: '这个敌人借用了毕达哥拉斯学派崇尚整数比例与和谐秩序的历史形象。',
      conceptNote: '在游戏叙事里，它代表一种强硬信念：世界应当可以被整数关系完整描述。',
      historyNote: '毕达哥拉斯（约前570-前495年）是古希腊最重要的数学家和哲学家之一。他创立的学派是一个宗教-哲学团体，相信"万物皆数"，即一切事物都可以用整数或整数比来描述。他们发现了音乐和声与整数比的联系，以及直角三角形三边关系的毕达哥拉斯定理。学派成员对数学知识的严格保密和共同归属，使得个人贡献难以考证。公元前5世纪，希帕索斯发现无理数的存在，动摇了学派的哲学基础，传说他因此被溺死。',
      tags: ['毕达哥拉斯学派', '整数', '比例', '数学史'],
      links: [{ label: '维基百科：毕达哥拉斯学派', url: 'https://zh.wikipedia.org/wiki/%E7%95%A2%E9%81%94%E5%93%A5%E6%8B%89%E6%96%AF%E5%AD%B8%E6%B4%BE' }],
    },
    actions: [
      {
        intent: { type: 'attack', value: 7, label: '勾股震荡', detail: '提出 7 点质疑。' },
      },
      {
        intent: { type: 'buff', value: 0, label: '整数礼赞', detail: '建立 5 点逻辑防御并下次质疑 +4。' },
        onAct: 'gain-block',
      },
      {
        intent: { type: 'attack', value: 13, label: '直角坠击', detail: '提出 13 点质疑。' },
      },
    ],
  },
  {
    id: 'hippasus',
    name: '希帕索斯',
    maxHp: 96,
    description: '发现无理数后被秩序放逐的证明者。',
    sigil: '∴',
    fxTheme: 'boss',
    boss: true,
    lore: {
      title: '希帕索斯与无理数的裂缝',
      summary: '希帕索斯常被后世叙事为"揭开无理数秘密的人"，象征数学史上秩序首次被不可通约性撕开。',
      conceptNote: '无理数意味着并非所有长度都能写成两个整数之比，这对"万物皆整数比例"的观念是一次根本冲击。',
      historyNote: '关于希帕索斯的历史记载非常稀少，他可能生活在公元前5世纪。古代文献中，普罗克鲁斯和亚里士多德提到过他的发现，但没有详细说明。后世传说（主要来自新柏拉图主义者扬布利柯）描述了他发现正五边形对角线与边不可通约，或因泄露无理数秘密而被毕达哥拉斯学派溺死。虽然这些故事的真实性存疑，但它们象征了数学史上的重大转折：从具体的算术量转向抽象的比例关系。欧多克索斯后来建立了严谨的比例理论，挽救了希腊数学。',
      tags: ['无理数', '希帕索斯', '不可通约', '数学史'],
      links: [{ label: '维基百科：希帕索斯', url: 'https://zh.wikipedia.org/wiki/%E5%B8%8C%E5%B8%95%E7%B4%A2%E6%96%AF' }, { label: '维基百科：无理数', url: 'https://zh.wikipedia.org/wiki/%E7%84%A1%E7%90%86%E6%95%B8' }],
    },
    actions: [
      {
        intent: { type: 'attack', value: 12, label: '有理之矛', detail: '提出 12 点质疑。' },
      },
      {
        intent: { type: 'block', value: 12, label: '整数护壁', detail: '建立 12 点逻辑防御。' },
        onAct: 'gain-block',
      },
      {
        intent: { type: 'special', value: 17, label: '无理数风暴', detail: '若你没有无理数直觉，逻辑防御只生效 50%。' },
        onAct: 'irrational-storm',
      },
    ],
  },
];
