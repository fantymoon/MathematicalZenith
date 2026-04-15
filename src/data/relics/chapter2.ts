import type { RelicDef } from '../../types/game';

export const chapter2Relics: RelicDef[] = [
  {
    id: 'fluxion-manuscript',
    name: '流数术手稿',
    description: '每回合第一个"流变"类命题的思考时间 -1。',
  },
  {
    id: 'berkeley-rosary',
    name: '贝克莱的念珠',
    description: '敌人的"流变"类命题对你造成的质疑 -3。',
  },
  {
    id: 'leibniz-calculating-machine',
    name: '莱布尼茨计算器',
    description: '每回合可以额外从知识库调取1个命题，但思考时间上限 -1。',
  },
];

export function getChapter2Relic(id: string) {
  return chapter2Relics.find((relic) => relic.id === id);
}
