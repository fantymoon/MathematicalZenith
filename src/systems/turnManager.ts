import type { BattleState, CardId, CardInstance, EnemyState, PendingSelection, PlayerState, PowerId } from '../types/game';
import { getCard } from '../data/cards';

let idCounter = 0;

function uid(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export function createCardInstance(defId: CardId): CardInstance {
  const def = getCard(defId);
  return {
    uuid: uid(defId),
    defId,
    cost: def.cost,
  };
}

export function shuffle<T>(items: T[]) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function getPowerStacks(player: PlayerState, powerId: PowerId) {
  return player.powers.find((power) => power.id === powerId)?.stacks ?? 0;
}

function setPower(player: PlayerState, powerId: PowerId, amount: number) {
  const existing = player.powers.find((power) => power.id === powerId);
  if (existing) {
    existing.stacks += amount;
    return;
  }
  player.powers.push({ id: powerId, stacks: amount });
}

function drawCards(player: PlayerState, amount: number, battle: BattleState) {
  if (battle.noDraw) {
    return;
  }

  for (let i = 0; i < amount; i += 1) {
    if (player.drawPile.length === 0) {
      player.drawPile = shuffle(player.discardPile);
      player.discardPile = [];
    }

    const next = player.drawPile.shift();
    if (!next) {
      return;
    }
    player.hand.push(next);
  }
}

function spendBlockAtTurnStart(player: PlayerState) {
  const keepBlock = getPowerStacks(player, 'fifth-postulate') > 0;
  if (!keepBlock) {
    player.block = 0;
  }
}

function applyTurnStartPowers(player: PlayerState, battle: BattleState) {
  if (getPowerStacks(player, 'triangle-stability') > 0 && player.hand.length > 0 && player.hand.length % 3 === 0) {
    player.block += 6;
    battle.log.unshift('三角形稳定性生效：你获得了 6 点格挡。');
  }

  if (battle.queuedStrengthNextTurn > 0) {
    player.strength += battle.queuedStrengthNextTurn;
    battle.log.unshift(`保留能量转化为 ${battle.queuedStrengthNextTurn} 点力量。`);
    battle.queuedStrengthNextTurn = 0;
  }

  if (battle.queuedBlockNextTurn > 0) {
    player.block += battle.queuedBlockNextTurn;
    battle.log.unshift(`优选统筹生效：你获得了 ${battle.queuedBlockNextTurn} 点起始格挡。`);
    battle.queuedBlockNextTurn = 0;
  }
}

function applyPassiveOnCardPlayed(player: PlayerState, battle: BattleState) {
  if (player.characterId === 'euclid' && battle.cardsPlayedThisTurn === 3) {
    player.block += 5;
    battle.log.unshift('几何直观：第 3 张牌触发，获得 5 点格挡。');
  }
}

function clearTemporaryCosts(player: PlayerState) {
  player.hand = player.hand.map((card) => {
    const def = getCard(card.defId);
    return { ...card, cost: def.cost, temporaryCost: undefined, retain: false };
  });
}

export function startBattle(player: PlayerState, enemy: EnemyState): BattleState {
  const battle: BattleState = {
    enemy,
    turn: 1,
    cardsPlayedThisTurn: 0,
    attacksPlayedThisTurn: 0,
    skillsPlayedThisTurn: 0,
    noDraw: false,
    randomMaxThisTurn: false,
    queuedStrengthNextTurn: 0,
    queuedBlockNextTurn: 0,
    zeroCostDrawUsed: false,
    lastPlayedCardId: undefined,
    log: [`${enemy.name} 出现了。`],
    rewardCardChoices: [],
  };

  player.drawPile = shuffle([...player.deck]);
  player.hand = [];
  player.discardPile = [];
  player.exhaustPile = [];
  player.block = 0;
  player.energy = player.maxEnergy;
  player.strength = 0;
  player.dexterity = 0;
  player.powers = [];
  drawCards(player, 5 + (player.relics.includes('lost-manuscript') ? 1 : 0), battle);
  applyTurnStartPowers(player, battle);
  return battle;
}

export function startNextTurn(player: PlayerState, battle: BattleState) {
  spendBlockAtTurnStart(player);
  clearTemporaryCosts(player);
  player.energy = player.maxEnergy;
  battle.cardsPlayedThisTurn = 0;
  battle.attacksPlayedThisTurn = 0;
  battle.skillsPlayedThisTurn = 0;
  battle.noDraw = false;
  battle.randomMaxThisTurn = false;
  battle.zeroCostDrawUsed = false;
  // Clear no-skill restriction at turn start
  const noSkillPower = player.powers.find((p) => p.id === 'no-skill-this-turn');
  if (noSkillPower) {
    noSkillPower.stacks = 0;
  }
  drawCards(player, 5, battle);
  applyTurnStartPowers(player, battle);
  battle.turn += 1;
}

function applyDamage(enemy: EnemyState, amount: number, player: PlayerState, battle: BattleState) {
  // Check for lever-charge power (double first card effect)
  const leverChargeStacks = getPowerStacks(player, 'lever-charge');
  let finalAmount = amount;
  if (leverChargeStacks > 0 && battle.cardsPlayedThisTurn === 1) {
    finalAmount *= 2;
    setPower(player, 'lever-charge', -1);
    battle.log.unshift('杠杆原理生效：第一张牌效果翻倍！');
  }

  const finalDamage = Math.max(0, finalAmount + player.strength);
  const absorbed = Math.min(enemy.block, finalDamage);
  enemy.block -= absorbed;
  enemy.hp -= Math.max(0, finalDamage - absorbed);
  battle.log.unshift(`造成 ${finalDamage} 点伤害。`);

  // Check for line-axiom-draw power (draw after dealing damage)
  const lineAxiomStacks = getPowerStacks(player, 'line-axiom-draw');
  if (lineAxiomStacks > 0) {
    drawCards(player, 1, battle);
    setPower(player, 'line-axiom-draw', -lineAxiomStacks);
    battle.log.unshift('线段公理生效：攻击后抽 1 张牌。');
  }
}

function applyBlock(player: PlayerState, amount: number) {
  player.block += Math.max(0, amount + player.dexterity);
}

function removeCardByUuid(cards: CardInstance[], uuid: string) {
  return cards.filter((card) => card.uuid !== uuid);
}

export function playCard(player: PlayerState, battle: BattleState, cardUuid: string) {
  const card = player.hand.find((item) => item.uuid === cardUuid);
  if (!card) {
    return { ok: false, message: '找不到这张牌。' };
  }

  const def = getCard(card.defId);
  const cost = card.temporaryCost ?? card.cost;

  if (battle.pendingSelection) {
    return { ok: false, message: '请先完成当前的选择操作。' };
  }

  if (player.energy < cost) {
    return { ok: false, message: '公理点不足。' };
  }

  player.energy -= cost;
  player.hand = removeCardByUuid(player.hand, cardUuid);
  battle.lastPlayedCardId = def.id;
  battle.cardsPlayedThisTurn += 1;
  if (def.type === 'attack') {
    battle.attacksPlayedThisTurn += 1;
  }
  if (def.type === 'skill') {
    battle.skillsPlayedThisTurn += 1;
  }

  if (player.characterId === 'gauss' && cost === 0 && !battle.zeroCostDrawUsed) {
    drawCards(player, 1, battle);
    battle.zeroCostDrawUsed = true;
    battle.log.unshift('正态分布：本回合首张 0 费牌触发额外抽牌。');
  }

  // Check for no-skill restriction from calculus-of-variations
  if (getPowerStacks(player, 'no-skill-this-turn') > 0 && def.type === 'skill') {
    return { ok: false, message: '变分法生效：本回合不能再使用技能牌。' };
  }

  // Check for leibniz-zero-cost power
  const leibnizStacks = getPowerStacks(player, 'leibniz-zero-cost');
  if (leibnizStacks > 0 && battle.cardsPlayedThisTurn === 1) {
    // First card this turn gets 0 cost
    player.energy += cost; // Refund the energy
    battle.log.unshift('莱布尼茨记号生效：第一张牌 0 费。');
    setPower(player, 'leibniz-zero-cost', -leibnizStacks);
  }

  if (def.id === 'sas-congruence') {
    battle.pendingSelection = { cardId: def.id, mode: 'combine-2', selected: [] };
  }

  for (const effect of def.effects) {
    switch (effect.type) {
      case 'damage':
        applyDamage(battle.enemy, effect.amount ?? 0, player, battle);
        break;
      case 'block':
        applyBlock(player, effect.amount ?? 0);
        if (player.relics.includes('bronze-compass') && def.type === 'skill' && battle.skillsPlayedThisTurn === 1) {
          applyBlock(player, 4);
          battle.log.unshift('青铜圆规：第一张技能牌额外获得 4 点格挡。');
        }
        break;
      case 'draw':
        drawCards(player, effect.amount ?? 0, battle);
        break;
      case 'discard-select': {
        const mode: PendingSelection['mode'] = effect.count === 2 ? 'discard-2' : 'discard-1';
        battle.pendingSelection = { cardId: def.id, mode, selected: [] };
        break;
      }
      case 'power':
        if (effect.powerId) {
          setPower(player, effect.powerId, effect.amount ?? 1);
        }
        break;
      case 'cost-reduce-hand':
        player.hand = player.hand.map((handCard) => ({
          ...handCard,
          cost: Math.max(0, handCard.cost - (effect.amount ?? 0)),
        }));
        break;
      case 'set-no-draw':
        battle.noDraw = true;
        break;
      case 'conditional-bonus-damage':
        // Fixed: check cardsPlayedThisTurn instead of attacksPlayedThisTurn
        if (battle.cardsPlayedThisTurn === 1) {
          applyDamage(battle.enemy, effect.amount ?? 0, player, battle);
        }
        break;
      case 'create-card':
        if (effect.cardId) {
          player.hand.push(createCardInstance(effect.cardId));
        }
        break;
      case 'turn-random-max':
        battle.randomMaxThisTurn = true;
        break;
      case 'next-turn-strength-from-unspent':
        battle.queuedStrengthNextTurn += (effect.amount ?? 0) * player.energy;
        break;
      case 'bonus-if-no-skill-played':
        if (battle.skillsPlayedThisTurn === 0) {
          applyDamage(battle.enemy, effect.amount ?? 0, player, battle);
        }
        break;
      case 'grant-irrational-guard':
        setPower(player, 'irrational-guard', 1);
        break;
      case 'heal': {
        // Heal: restore HP, with bonus if below 50%
        const baseHeal = effect.amount ?? 0;
        const bonusHeal = player.hp < player.maxHp * 0.5 ? 10 : 0;
        const totalHeal = baseHeal + bonusHeal;
        player.hp = Math.min(player.maxHp, player.hp + totalHeal);
        if (bonusHeal > 0) {
          battle.log.unshift(`排水法生效：恢复 ${totalHeal} 点声誉（危急时刻额外恢复 ${bonusHeal} 点）。`);
        } else {
          battle.log.unshift(`恢复 ${totalHeal} 点声誉。`);
        }
        break;
      }
      case 'shuffle-hand-to-draw': {
        // Group-action: shuffle hand into draw pile and draw same amount
        const handCount = player.hand.length;
        if (handCount > 0) {
          player.drawPile = shuffle([...player.drawPile, ...player.hand]);
          player.hand = [];
          drawCards(player, handCount, battle);
          battle.log.unshift(`群作用生效：将 ${handCount} 张手牌洗入牌库并重新抽取。`);
        }
        break;
      }
      case 'next-card-zero-cost': {
        // Leibniz-notation: next card costs 0
        setPower(player, 'leibniz-zero-cost', 1);
        battle.log.unshift('莱布尼茨记号生效：下一张牌 0 费。');
        break;
      }
      case 'reduce-attack-cost': {
        // Calculus-of-variations: reduce attack cards cost
        player.hand = player.hand.map((handCard) => {
          const cardDef = getCard(handCard.defId);
          if (cardDef.type === 'attack') {
            return { ...handCard, cost: Math.max(0, handCard.cost - (effect.amount ?? 2)) };
          }
          return handCard;
        });
        battle.log.unshift('变分法生效：攻击牌费用降低。');
        break;
      }
      case 'transform-cards':
        // Symmetry-transform: placeholder for transform logic
        battle.log.unshift('对称变换：选择一种类型将所有手牌变为该类型（效果待实现）。');
        break;
      default:
        break;
    }
  }

  if (def.id === 'heptadecagon') {
    battle.log.unshift('正十七边形启动：你可以开始为下一回合蓄势。');
  }

  if (def.id === 'overall-planning') {
    battle.log.unshift('统筹法启动：保留能量将转化为下回合格挡。');
  }

  applyPassiveOnCardPlayed(player, battle);

  if (def.exhaust) {
    player.exhaustPile.push(card);
  } else if (def.type === 'power') {
    player.exhaustPile.push(card);
  } else {
    player.discardPile.push(card);
  }

  return { ok: true, message: `${def.name} 已打出。` };
}

export function resolvePendingSelection(player: PlayerState, battle: BattleState, selectedUuids: string[]) {
  if (!battle.pendingSelection) {
    return { ok: false, message: '当前没有待处理选择。' };
  }

  const pending = battle.pendingSelection;
  const selectedCards = player.hand.filter((card) => selectedUuids.includes(card.uuid));

  if (pending.mode === 'discard-2' && selectedCards.length !== 2) {
    return { ok: false, message: '请选择 2 张牌。' };
  }
  if (pending.mode === 'combine-2' && selectedCards.length !== 2) {
    return { ok: false, message: '请选择 2 张牌进行合成。' };
  }
  if (pending.mode === 'discard-1' && selectedCards.length !== 1) {
    return { ok: false, message: '请选择 1 张牌。' };
  }

  selectedCards.forEach((card) => {
    player.hand = removeCardByUuid(player.hand, card.uuid);
    player.discardPile.push(card);
  });

  if (pending.cardId === 'point-line-plane') {
    const sameCost = selectedCards[0]?.cost === selectedCards[1]?.cost;
    if (sameCost) {
      drawCards(player, 3, battle);
      battle.log.unshift('点线面构造命中：弃牌费用相同，抽 3。');
    } else {
      battle.log.unshift('点线面构造未成形：你只完成了弃牌。');
    }
  }

  if (pending.cardId === 'sas-congruence') {
    const sameType = getCard(selectedCards[0].defId).type === getCard(selectedCards[1].defId).type;
    if (sameType) {
      battle.pendingSelection = undefined;
      return { ok: false, message: 'SAS 需要两张不同类别的牌。' };
    }
    player.hand.push(createCardInstance('congruent-assault'));
    battle.log.unshift('SAS 全等判定完成：你构造出了一张【全等攻击】。');
  }

  if (pending.cardId === 'optimal-method') {
    battle.log.unshift('优选法生效：手牌费用已整体降低。');
  }

  battle.pendingSelection = undefined;
  return { ok: true, message: '选择已完成。' };
}

export function endPlayerTurn(player: PlayerState, battle: BattleState) {
  const unspentEnergy = player.energy;
  if (getPowerStacks(player, 'heptadecagon') > 0 && unspentEnergy > 0) {
    battle.queuedStrengthNextTurn += unspentEnergy * 2;
  }
  if (getPowerStacks(player, 'overall-planning') > 0 && unspentEnergy > 0) {
    battle.queuedBlockNextTurn += unspentEnergy * 2;
  }
  if (player.characterId === 'hualuogeng' && unspentEnergy > 0) {
    battle.queuedBlockNextTurn += unspentEnergy * 2;
  }

  player.discardPile.push(...player.hand.filter((card) => !card.retain));
  player.hand = player.hand.filter((card) => card.retain);
}
