import type { RelicDef } from '../types/game';
import { chapter1Relics } from './relics/chapter1';
import { chapter2Relics } from './relics/chapter2';
import { chapter3Relics } from './relics/chapter3';
import { chapter4Relics } from './relics/chapter4';

export const relics: RelicDef[] = [
  ...chapter1Relics,
  ...chapter2Relics,
  ...chapter3Relics,
  ...chapter4Relics,
];

export function getRelic(id: string) {
  return relics.find((relic) => relic.id === id);
}
