import type { CardId, CharacterId, MapNodeType } from './game';

export type Chapter = 'chapter1' | 'chapter2' | 'chapter3' | 'chapter4';

export interface MapGenerationConfig {
  totalNodes: number;
  minBattles: number;
  maxBattles: number;
  minEvents: number;
  maxEvents: number;
  restSites: number;
  shops: number;
  firstNodeFixed?: MapNodeType;
  bossProtection?: boolean;
}

export interface ChapterConfig {
  id: Chapter;
  title: string;
  subtitle: string;
  description: string;
  historicalBackground: string;
  theme: ChapterTheme;
  globalModifier: GlobalModifier;
  mapConfig: MapGenerationConfig;
  unlockRequirement?: UnlockRequirement;
}

export type ChapterTheme =
  | { type: 'order'; description: '古希腊大理石柱、尺规作图网格' }
  | { type: 'flux'; description: '流动水波纹、消失墨迹、切线动态' }
  | { type: 'paradox'; description: '扭曲空间、埃舍尔楼梯、分形几何' }
  | { type: 'glitch'; description: '故障艺术、代码编辑器、电子噪音' };

export type GlobalModifier =
  | { type: 'order-era'; randomPenalty: number }
  | { type: 'fluxion'; fluxEnabled: true }
  | { type: 'paradox'; paradoxCardsEnabled: true; healReduction: number }
  | { type: 'glitch'; rulesUndefined: true };

export interface UnlockRequirement {
  type: 'complete-chapter' | 'defeat-boss' | 'special-event';
  target: string;
}

export interface ChapterReward {
  retainedCards: CardId[];
  retainedRelics: string[];
  theoremPoints: number;
  narrativeFlags: string[];
}

export interface ChapterState {
  currentChapter: Chapter;
  chapterProgress: number;
  unlockedCharacters: CharacterId[];
  completedChapters: Chapter[];
  narrativeFlags: string[];
}

export const CHAPTER_CONFIGS: Record<Chapter, ChapterConfig> = {
  chapter1: {
    id: 'chapter1',
    title: '秩序的时代',
    subtitle: '几何、确定性、整数',
    description: '探索古希腊几何与公理体系，见证数学从直觉走向严密推理的历程。',
    historicalBackground:
      '公元前5-4世纪，古希腊学派围绕"是否一切都可用整数关系描述"展开了长期争论，几何与公理体系开始成为数学知识组织的核心框架。毕达哥拉斯传统对"秩序""度量""和谐比例"的强调，以及欧几里得《几何原本》中公设—定义—定理的表达方式，共同奠定了近代数学"可验证严密推理"的基本姿态。',
    theme: { type: 'order', description: '古希腊大理石柱、尺规作图网格' },
    globalModifier: { type: 'order-era', randomPenalty: 0.2 },
    mapConfig: {
      totalNodes: 7,
      minBattles: 3,
      maxBattles: 4,
      minEvents: 1,
      maxEvents: 2,
      restSites: 1,
      shops: 1,
      firstNodeFixed: 'battle',
      bossProtection: true,
    },
  },
  chapter2: {
    id: 'chapter2',
    title: '流变的海洋',
    subtitle: '微积分、无穷小、变量',
    description: '进入微积分的世界，体验从静态几何到动态过程的数学革命。',
    historicalBackground:
      '17世纪，牛顿和莱布尼茨围绕速率、变化和面积问题独立发展了微积分框架，推动数学从静态几何对象走向动态过程表达。围绕"无穷小"概念的争论使"证明的严谨性"成为现实问题，也出现了不同记号体系与方法上的分流。这一阶段在数学史上常被视为现代分析之潮的起点。',
    theme: { type: 'flux', description: '流动水波纹、消失墨迹、切线动态' },
    globalModifier: { type: 'fluxion', fluxEnabled: true },
    mapConfig: {
      totalNodes: 8,
      minBattles: 3,
      maxBattles: 4,
      minEvents: 2,
      maxEvents: 3,
      restSites: 1,
      shops: 1,
      bossProtection: true,
    },
    unlockRequirement: { type: 'complete-chapter', target: 'chapter1' },
  },
  chapter3: {
    id: 'chapter3',
    title: '崩塌的高塔',
    subtitle: '非欧几何、群论、集合论',
    description: '挑战传统几何观念，探索群论与集合论带来的数学基础革命。',
    historicalBackground:
      '19到20世纪前后，经典欧几里得世界观被持续冲击：非欧几何证明空间并非唯一，群论重构了对"结构与对称"的理解，集合论把"无限"和"基数"从直觉提升为严格对象。数学家逐步认识到"既有公理体系之外仍有未触及领域"，理论边界被持续推开。',
    theme: { type: 'paradox', description: '扭曲空间、埃舍尔楼梯、分形几何' },
    globalModifier: { type: 'paradox', paradoxCardsEnabled: true, healReduction: 0.5 },
    mapConfig: {
      totalNodes: 9,
      minBattles: 4,
      maxBattles: 5,
      minEvents: 2,
      maxEvents: 3,
      restSites: 1,
      shops: 1,
      bossProtection: true,
    },
    unlockRequirement: { type: 'complete-chapter', target: 'chapter2' },
  },
  chapter4: {
    id: 'chapter4',
    title: '不完备的边界',
    subtitle: '哥德尔、计算机、Meta',
    description: '面对数学系统的内在局限，探索可计算性与元数学的深邃边界。',
    historicalBackground:
      '20世纪数学与逻辑并未走向收束，而是走向"自指、可计算性与复杂性"。哥德尔不完备定理、计算理论与程序视角揭示：系统越强大，越必须处理自身表达能力的边界。形式证明的能力边界由哲学问题转为可执行性问题，数学文化也因此进入反身性与元层面的时代。',
    theme: { type: 'glitch', description: '故障艺术、代码编辑器、电子噪音' },
    globalModifier: { type: 'glitch', rulesUndefined: true },
    mapConfig: {
      totalNodes: 10,
      minBattles: 4,
      maxBattles: 5,
      minEvents: 3,
      maxEvents: 4,
      restSites: 1,
      shops: 1,
      bossProtection: true,
    },
    unlockRequirement: { type: 'defeat-boss', target: 'cantor-shadow' },
  },
};

export function getChapterConfig(chapterId: Chapter): ChapterConfig {
  return CHAPTER_CONFIGS[chapterId];
}

export const UNLOCK_CONDITIONS: Record<string, UnlockRequirement> = {
  'newton-leibniz': { type: 'complete-chapter', target: 'chapter1' },
  'galois': { type: 'complete-chapter', target: 'chapter2' },
  'cantor': { type: 'complete-chapter', target: 'chapter2' },
  'godel-turing': { type: 'defeat-boss', target: 'cantor-shadow' },
};
