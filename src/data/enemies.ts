import type { EnemyDef } from '../types/game';
import { chapter1Enemies } from './enemies/chapter1';
import { chapter2Enemies } from './enemies/chapter2';
import { chapter3Enemies } from './enemies/chapter3';
import { chapter4Enemies } from './enemies/chapter4';

type EnemyDisplayDef = EnemyDef & {
  sigil: string;
  fxTheme: 'normal' | 'boss';
};

export const enemies: EnemyDisplayDef[] = [
  ...chapter1Enemies,
  ...chapter2Enemies,
  ...chapter3Enemies,
  ...chapter4Enemies,
];

export function getEnemy(id: string) {
  return enemies.find((enemy) => enemy.id === id)!;
}
