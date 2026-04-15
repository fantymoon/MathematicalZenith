import type { CardCategory } from './game';

export type AnimationType = 'attack' | 'skill' | 'power';

export type EasingType = 'easeOut' | 'easeInOut' | 'linear' | 'easeIn';

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  easing: EasingType;
  symbolSize: number;
  particleCount: number;
  symbols: string[];
  colors: {
    primary: string;
    secondary: string;
    glow: string;
  };
  hitTexts: string[];
}

export const MATH_SYMBOLS = {
  attack: ['?', '∴', '∵', '⊢', '⊨', '⇒', '→', '∴'],
  skill: ['→', '⇒', '⟹', '○', '△', '□', '∠', '⊥'],
  power: ['α', 'β', 'γ', 'δ', 'Σ', '∫', '∂', '∇', '∞', 'ℵ'],
};

export const HIT_TEXTS = {
  attack: ['逻辑漏洞', '矛盾点', '论证缺陷', '前提不成立', '推导错误', '质疑有效'],
  skill: ['逻辑防御+', '论证支撑+', '前提保护+', '推导强化', '公理确立'],
  power: ['定理确立', '公理生效', '推论成立', '体系完善', '证明完成'],
};

export const CARD_ANIMATION_CONFIG: Record<CardCategory, AnimationConfig> = {
  attack: {
    type: 'attack',
    duration: 450,
    easing: 'easeOut',
    symbolSize: 28,
    particleCount: 4,
    symbols: MATH_SYMBOLS.attack,
    colors: {
      primary: '#e74c3c',
      secondary: '#c0392b',
      glow: 'rgba(231, 76, 60, 0.6)',
    },
    hitTexts: HIT_TEXTS.attack,
  },
  skill: {
    type: 'skill',
    duration: 550,
    easing: 'easeInOut',
    symbolSize: 24,
    particleCount: 3,
    symbols: MATH_SYMBOLS.skill,
    colors: {
      primary: '#3498db',
      secondary: '#2980b9',
      glow: 'rgba(52, 152, 219, 0.6)',
    },
    hitTexts: HIT_TEXTS.skill,
  },
  power: {
    type: 'power',
    duration: 900,
    easing: 'easeOut',
    symbolSize: 20,
    particleCount: 6,
    symbols: MATH_SYMBOLS.power,
    colors: {
      primary: '#9b59b6',
      secondary: '#8e44ad',
      glow: 'rgba(155, 89, 182, 0.6)',
    },
    hitTexts: HIT_TEXTS.power,
  },
};

export interface Particle {
  id: number;
  symbol: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  opacity: number;
}
