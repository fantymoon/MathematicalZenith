import type { RelicDef } from '../../types/game';

export const chapter1Relics: RelicDef[] = [
  {
    id: 'irrational-insight',
    name: '无理数直觉',
    description: '希帕索斯二阶段时，你的逻辑防御不会被无理数风暴穿透。',
  },
  {
    id: 'lost-manuscript',
    name: '遗失的手稿',
    description: '辩论开始时从知识库调取 +1 个命题。',
  },
  {
    id: 'bronze-compass',
    name: '青铜圆规',
    description: '每场辩论的第一个推导命题额外建立 4 点逻辑防御。',
  },
];

export function getChapter1Relic(id: string) {
  return chapter1Relics.find((relic) => relic.id === id);
}
