import type { EnemyAction, EnemyState, PlayerState, PowerId } from '../types/game';
import { getRelic } from '../data/relics';

function hasPower(player: PlayerState, powerId: PowerId) {
  return player.powers.some((power) => power.id === powerId);
}

function clamp(value: number, min = 0) {
  return value < min ? min : value;
}

export function nextEnemyIntent(enemy: EnemyState): EnemyAction {
  return enemy.actions[enemy.actionIndex % enemy.actions.length];
}

export function resolveEnemyAction(player: PlayerState, enemy: EnemyState) {
  const action = nextEnemyIntent(enemy);
  let log = `${enemy.name} 使用了【${action.intent.label}】。`;
  let playerHp = player.hp;
  let playerBlock = player.block;
  let enemyBlock = enemy.block;

  if (action.onAct === 'gain-block') {
    enemyBlock += action.intent.value;
  }

  if (action.intent.type === 'attack') {
    const damage = Math.max(0, action.intent.value - player.dexterity);
    const absorbed = Math.min(playerBlock, damage);
    playerBlock -= absorbed;
    playerHp -= Math.max(0, damage - absorbed);
  }

  if (action.onAct === 'irrational-storm') {
    const protectedByIrrational =
      player.relics.includes('irrational-insight') || hasPower(player, 'irrational-guard');
    const totalDamage = action.intent.value;
    const effectiveBlock = protectedByIrrational ? playerBlock : Math.floor(playerBlock / 2);
    const absorbed = Math.min(effectiveBlock, totalDamage);
    playerBlock = Math.max(0, playerBlock - absorbed * (protectedByIrrational ? 1 : 2));
    playerHp -= Math.max(0, totalDamage - absorbed);
    log = protectedByIrrational
      ? `${enemy.name} 引发了无理数风暴，但你凭借无理数直觉守住了结构。`
      : `${enemy.name} 引发了无理数风暴，你的整数格挡被穿透了一半。`;
  }

  if (action.intent.type === 'buff' && enemy.actions.length > 0) {
    enemy.actions = enemy.actions.map((item, index) =>
      index === ((enemy.actionIndex + 1) % enemy.actions.length) && item.intent.type === 'attack'
        ? {
            ...item,
            intent: {
              ...item.intent,
              value: item.intent.value + 4,
              detail: `${item.intent.detail}（已被整数礼赞强化）`,
            },
          }
        : item,
    );
  }

  const shouldPhaseShift = enemy.name === '希帕索斯' && enemy.phase === 1 && enemy.hp <= Math.floor(enemy.maxHp / 2);
  const shouldGodelPressure = enemy.name === '哥德尔' && enemy.phase === 1 && enemy.hp <= Math.floor(enemy.maxHp * 0.6);
  let phaseShifted = false;
  if (shouldPhaseShift) {
    enemy.phase = 2;
    enemy.block = 0;
    enemy.actionIndex = 2;
    log = '希帕索斯怒吼：“它不是整数！”战斗进入第二阶段。';
    phaseShifted = true;
  } else if (shouldGodelPressure) {
    enemy.phase = 2;
    enemy.block = 0;
    enemy.actionIndex = 2;
    log = '哥德尔露出了神秘的微笑：“这个命题不可证明，但它为真。”战斗进入第二阶段。';
    phaseShifted = true;
  } else {
    enemy.block = enemyBlock;
    enemy.actionIndex += 1;
  }

  return {
    player: { ...player, hp: clamp(playerHp), block: clamp(playerBlock) },
    enemy: { ...enemy },
    log,
    phaseShifted,
    relicNote: player.relics.map((id) => getRelic(id)?.name).filter(Boolean),
  };
}
