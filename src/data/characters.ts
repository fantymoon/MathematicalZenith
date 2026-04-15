import type { CharacterDef, ChapterId } from '../types/game';
import { chapter1Characters } from './characters/chapter1';
import { chapter2Characters } from './characters/chapter2';
import { chapter3Characters } from './characters/chapter3';
import { chapter4Characters } from './characters/chapter4';

type CharacterDisplayDef = CharacterDef & {
  portraitLabel: string;
  portraitAccent: string;
};

export const characters: CharacterDisplayDef[] = [
  ...chapter1Characters,
  ...chapter2Characters,
  ...chapter3Characters,
  ...chapter4Characters,
];

export function getCharacter(id: CharacterDef['id']) {
  return characters.find((character) => character.id === id)!;
}

export function getCharactersByChapter(chapterId: ChapterId): CharacterDisplayDef[] {
  return characters.filter((character) => character.chapterId === chapterId);
}
