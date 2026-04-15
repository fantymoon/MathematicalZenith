import { getCard, rewardPool } from '../data/cards';
import { getCharacter } from '../data/characters';
import { getEnemy } from '../data/enemies';
import { getEvent } from '../data/events';
import { createCardInstance, endPlayerTurn, playCard, resolvePendingSelection, shuffle, startBattle, startNextTurn } from '../systems/turnManager';
import { resolveEnemyAction } from '../systems/battleResolver';
import { generateChapterMap, generateChapterOneMap } from '../systems/mapGenerator';
import { getChapterConfig } from '../types/chapter';
import type { BattleState, CardId, CharacterId, ChapterId, EnemyState, EventEffect, GameState, LoreSubject, MapNodeType, OverlayState, PlayerState, Screen } from '../types/game';
import { create } from 'zustand';
import { saveGameState, clearSavedGame, loadGameState, type SavedGameState } from '../utils/saveUtils';

function createPlayer(characterId: CharacterId, inheritedRewards?: { theoremPoints: number; inheritedCards: CardId[]; inheritedRelics: string[] }): PlayerState {
  const character = getCharacter(characterId);
  const deck = character.starterDeck.map((cardId) => createCardInstance(cardId));

  // 应用继承奖励
  if (inheritedRewards) {
    // 添加继承的定理点
    const inheritedTheoremPoints = inheritedRewards.theoremPoints;

    // 过滤掉角色专属卡牌（只保留通用卡牌）
    const neutralCards = inheritedRewards.inheritedCards.filter((cardId) => {
      const cardDef = getCard(cardId);
      return !cardDef.character || cardDef.character === 'neutral';
    });

    // 添加继承的通用卡牌
    for (const cardId of neutralCards) {
      deck.push(createCardInstance(cardId));
    }

    // 添加继承的遗物（排除初始遗物 bronze-compass 避免重复）
    const inheritedRelics = inheritedRewards.inheritedRelics.filter((relicId) => relicId !== 'bronze-compass');

    return {
      characterId,
      hp: character.maxHp,
      maxHp: character.maxHp,
      energy: 3,
      maxEnergy: 3,
      block: 0,
      strength: 0,
      dexterity: 0,
      deck,
      drawPile: [],
      hand: [],
      discardPile: [],
      exhaustPile: [],
      powers: [],
      relics: ['bronze-compass', ...inheritedRelics],
      gold: 40,
      theoremPoints: inheritedTheoremPoints,
    };
  }

  return {
    characterId,
    hp: character.maxHp,
    maxHp: character.maxHp,
    energy: 3,
    maxEnergy: 3,
    block: 0,
    strength: 0,
    dexterity: 0,
    deck,
    drawPile: [],
    hand: [],
    discardPile: [],
    exhaustPile: [],
    powers: [],
    relics: ['bronze-compass'],
    gold: 40,
    theoremPoints: 0,
  };
}

function createEnemyState(enemyId: string): EnemyState {
  const enemy = getEnemy(enemyId);
  return {
    id: enemy.id,
    name: enemy.name,
    hp: enemy.maxHp,
    maxHp: enemy.maxHp,
    block: 0,
    actionIndex: 0,
    actions: structuredClone(enemy.actions),
    phase: 1,
    boss: enemy.boss,
  };
}

function nextScreenForNode(type: MapNodeType): Screen {
  switch (type) {
    case 'battle':
    case 'boss':
      return 'battle';
    case 'event':
      return 'event';
    case 'shop':
      return 'shop';
    case 'rest':
      return 'rest';
    default:
      return 'map';
  }
}

function getNodeEnemy(index: number, isBoss: boolean) {
  if (isBoss) {
    return 'hippasus';
  }
  return index % 2 === 0 ? 'polygon-soldier' : 'pythagoras-disciple';
}

function createInitialState(): GameState {
  return {
    screen: 'start',
    run: {
      map: [],
      currentNodeIndex: 0,
      pendingShopCards: ['golden-ratio', 'fifth-postulate', 'irrational-spark'],
      bossDefeated: false,
      overlay: undefined,
      currentChapterId: 'chapter1',
    },
  };
}

let overlayCounter = 0;

function makeOverlay(title: string, theme: OverlayState['theme'], subtitle?: string, kicker?: string): OverlayState {
  overlayCounter += 1;
  return {
    key: `overlay-${overlayCounter}`,
    title,
    subtitle,
    kicker,
    theme,
  };
}

export function makeChapterLore(chapterId: 'chapter1' | 'chapter2' | 'chapter3' | 'chapter4') {
  const chapterConfig = getChapterConfig(chapterId);
  return {
    type: 'card' as const,
    name: chapterConfig.title,
    subtitle: chapterConfig.subtitle,
    lore: {
      title: chapterConfig.title,
      summary: chapterConfig.historicalBackground,
      conceptNote: chapterConfig.subtitle,
      historyNote: chapterConfig.historicalBackground,
      tags: ['章节背景'],
    },
  };
}

type GameActions = {
  enterCharacterSelect: (chapterId?: ChapterId) => void;
  goBack: () => void;
  selectCharacter: (characterId: CharacterId) => void;
  enterCurrentNode: () => void;
  chooseEventOption: (choiceIndex: number) => void;
  chooseShopCard: (cardId: CardId) => void;
  leaveRestSite: (mode: 'heal' | 'upgrade') => void;
  playCardById: (cardUuid: string) => void;
  resolveSelection: (selectedUuids: string[]) => void;
  endTurn: () => void;
  claimBattleReward: (cardId?: CardId) => void;
  returnToMap: () => void;
  clearOverlay: () => void;
  openLore: (subject: LoreSubject) => void;
  closeLore: () => void;
  resetRun: () => void;
  loadGame: () => boolean;
  enterNextChapter: () => void;
  calculateChapterReward: () => { theoremPoints: number; inheritedCards: CardId[]; inheritedRelics: string[] };
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...createInitialState(),

  enterCharacterSelect: (chapterId?: ChapterId) => {
    const state = get();
    const newChapterId = chapterId ?? state.run.currentChapterId ?? 'chapter1';
    set({ 
      screen: 'character-select', 
      run: { ...state.run, currentChapterId: newChapterId, overlay: makeOverlay('数学巴别塔', 'normal', '选择你的证明视角。', '开始章节') } 
    });
  },

  goBack: () => {
    const state = get();
    if (state.screen === 'character-select') {
      set({ screen: 'start', run: { ...state.run, overlay: undefined } });
      return;
    }

    if (state.screen === 'map') {
      set({ screen: 'start', run: { ...state.run, overlay: undefined } });
      return;
    }

    if (state.screen === 'event' || state.screen === 'shop' || state.screen === 'rest' || state.screen === 'battle') {
      set({ screen: 'map', run: { ...state.run, overlay: undefined } });
      return;
    }

    if (state.screen === 'victory') {
      set(createInitialState());
    }
  },

  selectCharacter: (characterId) => {
    const state = get();
    const currentChapterId = state.run.currentChapterId ?? 'chapter1';
    const map = generateChapterOneMap(characterId);
    const character = getCharacter(characterId);
    const chapterConfig = getChapterConfig(currentChapterId);

    // 获取继承奖励（如果存在）
    const inheritedRewards = state.run.inheritedRewards;

    const newState: GameState = {
      player: createPlayer(characterId, inheritedRewards),
      screen: 'map',
      run: {
        map,
        currentNodeIndex: 0,
        currentEventId: undefined,
        pendingShopCards: ['golden-ratio', 'fifth-postulate', 'irrational-spark'],
        lastMessage: `${character.name} 已进入"${chapterConfig.title}"。`,
        bossDefeated: false,
        overlay: makeOverlay(character.name, 'normal', character.passiveDescription, '角色进入'),
        currentChapterId,
        // 清除继承奖励，避免重复应用
        inheritedRewards: undefined,
      },
      battle: undefined,
      activeLore: makeChapterLore(currentChapterId),
    };
    set(newState);
    saveGameState(newState);
  },

  enterCurrentNode: () => {
    const state = get();
    const { player, run } = state;
    if (!player || run.currentNodeIndex >= run.map.length) {
      return;
    }

    const node = run.map[run.currentNodeIndex];
    const screen = nextScreenForNode(node.type);
    const nodeOverlay =
      node.type === 'boss'
        ? makeOverlay(node.title, 'boss', node.subtitle, '终极证明')
        : node.type === 'event'
          ? makeOverlay(node.title, 'truth', node.subtitle, '未解之谜')
          : node.type === 'battle'
            ? makeOverlay(node.title, 'warning', node.subtitle, '练习题')
            : makeOverlay(node.title, 'normal', node.subtitle, '章节节点');

    if (node.type === 'battle' || node.type === 'boss') {
      const enemyId = getNodeEnemy(run.currentNodeIndex, node.type === 'boss');
      const enemy = createEnemyState(enemyId);
      const nextPlayer = structuredClone(player);
      const battle = startBattle(nextPlayer, enemy);
      set({
        screen,
        player: nextPlayer,
        battle,
        run: { ...run, overlay: nodeOverlay },
      });
      return;
    }

    if (node.type === 'event') {
      const eventIds = ['irrational-crisis', 'compass-dispute', 'lost-manuscript'] as const;
      const currentEventId = eventIds[run.currentNodeIndex % eventIds.length];
      set({ screen, run: { ...run, currentEventId, overlay: nodeOverlay } });
      return;
    }

    set({ screen, run: { ...run, overlay: nodeOverlay } });
  },

  chooseEventOption: (choiceIndex) => {
    const state = get();
    const { player, run } = state;
    if (!player || !run.currentEventId) {
      return;
    }

    const event = getEvent(run.currentEventId);
    const choice = event.choices[choiceIndex];
    const nextPlayer = structuredClone(player);
    let message = `${event.title}：${choice.label}`;

    const applyEffect = (effect: EventEffect) => {
      switch (effect.type) {
        case 'grant-relic':
          if (!nextPlayer.relics.includes(effect.relicId)) {
            nextPlayer.relics.push(effect.relicId);
          }
          if (run.currentEventId === 'irrational-crisis' && effect.relicId === 'irrational-insight') {
            nextPlayer.deck.push(createCardInstance('irrational-spark'));
          }
          break;
        case 'grant-card':
          nextPlayer.deck.push(createCardInstance(effect.cardId));
          break;
        case 'heal':
          nextPlayer.hp = Math.min(nextPlayer.maxHp, nextPlayer.hp + effect.amount);
          break;
        case 'damage':
          nextPlayer.hp = Math.max(1, nextPlayer.hp - effect.amount);
          break;
        case 'gain-gold':
          nextPlayer.gold += effect.amount;
          nextPlayer.theoremPoints += effect.amount;
          if (choice.id === 'silent') {
            nextPlayer.hp = Math.max(1, nextPlayer.hp - 6);
          }
          if (choice.id === 'burned-edge') {
            nextPlayer.hp = Math.max(1, nextPlayer.hp - 5);
          }
          break;
        case 'remove-card': {
          const removableIndex = nextPlayer.deck.findIndex((card) => card.defId === 'strike' || card.defId === 'guard');
          if (removableIndex >= 0) {
            nextPlayer.deck.splice(removableIndex, 1);
          }
          break;
        }
        default:
          break;
      }
    };

    applyEffect(choice.effect);

    const nextMap = run.map.map((node, index) =>
      index === run.currentNodeIndex ? { ...node, completed: true } : node,
    );

    // 事件大字效果：优先使用 choice 中配置的 overlay，否则使用默认效果
    let eventOverlay: OverlayState | undefined;
    if (choice.overlay) {
      eventOverlay = makeOverlay(
        choice.overlay.title,
        choice.overlay.theme,
        choice.overlay.subtitle,
        choice.overlay.kicker
      );
    } else {
      eventOverlay = makeOverlay(choice.label, 'truth', choice.description, event.title);
    }

    const newState: GameState = {
      player: nextPlayer,
      screen: 'map',
      run: {
        ...run,
        map: nextMap,
        currentNodeIndex: run.currentNodeIndex + 1,
        currentEventId: undefined,
        lastMessage: message,
        overlay: eventOverlay,
      },
    };
    set(newState);
    saveGameState(newState);
  },

  chooseShopCard: (cardId) => {
    const state = get();
    const { player, run } = state;
    if (!player) {
      return;
    }

    const cost = cardId === 'fifth-postulate' ? 24 : 18;
    if (player.gold < cost) {
      set({ run: { ...run, lastMessage: '公点不足，无法购买。' } });
      return;
    }

    const nextPlayer = structuredClone(player);
    nextPlayer.gold -= cost;
    nextPlayer.deck.push(createCardInstance(cardId));

    const nextMap = run.map.map((node, index) =>
      index === run.currentNodeIndex ? { ...node, completed: true } : node,
    );

    const newState: GameState = {
      player: nextPlayer,
      screen: 'map',
      run: {
        ...run,
        map: nextMap,
        currentNodeIndex: run.currentNodeIndex + 1,
        pendingShopCards: run.pendingShopCards.filter((id) => id !== cardId),
        lastMessage: `你在工具交换所购入了【${getCard(cardId).name}】。`,
        overlay: makeOverlay(getCard(cardId).name, 'normal', '新的工具已收入你的牌组。', '交易完成'),
      },
    };
    set(newState);
    saveGameState(newState);
  },

  leaveRestSite: (mode) => {
    const state = get();
    const { player, run } = state;
    if (!player) {
      return;
    }
    const nextPlayer = structuredClone(player);

    if (mode === 'heal') {
      nextPlayer.hp = Math.min(nextPlayer.maxHp, nextPlayer.hp + 18);
    }

    if (mode === 'upgrade') {
      const target = nextPlayer.deck.find((card) => card.defId === 'strike' || card.defId === 'guard');
      if (target) {
        if (target.defId === 'strike') {
          target.defId = 'golden-ratio';
        } else {
          target.defId = 'guard';
        }
      }
    }

    const nextMap = run.map.map((node, index) =>
      index === run.currentNodeIndex ? { ...node, completed: true } : node,
    );

    const newState: GameState = {
      player: nextPlayer,
      screen: 'map',
      run: {
        ...run,
        map: nextMap,
        currentNodeIndex: run.currentNodeIndex + 1,
        lastMessage: mode === 'heal' ? '你在公理推演中恢复了状态。' : '你在公理推演中精炼了牌组。',
        overlay: makeOverlay(
          mode === 'heal' ? '静修完成' : '牌组精炼',
          'normal',
          mode === 'heal' ? '旧日疲惫从体系中剥离。' : '基础证明被重铸为更锋利的工具。',
          '公理推演',
        ),
      },
    };
    set(newState);
    saveGameState(newState);
  },

  playCardById: (cardUuid) => {
    const state = get();
    if (!state.player || !state.battle) {
      return;
    }

    const player = structuredClone(state.player);
    const battle = structuredClone(state.battle);
    const result = playCard(player, battle, cardUuid);

    if (!result.ok) {
      set({ run: { ...state.run, lastMessage: result.message } });
      return;
    }

    if (battle.enemy.hp <= 0) {
      battle.rewardCardChoices = shuffle(rewardPool).slice(0, 3);
    }

    set({ player, battle, run: { ...state.run, lastMessage: result.message } });
  },

  resolveSelection: (selectedUuids) => {
    const state = get();
    if (!state.player || !state.battle) {
      return;
    }

    const player = structuredClone(state.player);
    const battle = structuredClone(state.battle);
    const result = resolvePendingSelection(player, battle, selectedUuids);
    set({ player, battle, run: { ...state.run, lastMessage: result.message } });
  },

  endTurn: () => {
    const state = get();
    if (!state.player || !state.battle || state.battle.pendingSelection) {
      return;
    }

    const player = structuredClone(state.player);
    const battle = structuredClone(state.battle);
    endPlayerTurn(player, battle);

    const enemyResolution = resolveEnemyAction(player, battle.enemy);
    const nextPlayer = enemyResolution.player;
    const nextBattle: BattleState = {
      ...battle,
      enemy: enemyResolution.enemy,
      log: [enemyResolution.log, ...battle.log].slice(0, 8),
    };

    let phaseOverlay: OverlayState | undefined;
    if (enemyResolution.phaseShifted) {
      if (state.battle?.enemy.name === '哥德尔') {
        phaseOverlay = makeOverlay(
          '这个命题不可证明',
          'pressure',
          '但它为真。——哥德尔的微笑',
          '不完备的觉醒'
        );
      } else {
        phaseOverlay = makeOverlay('它不是整数！', 'boss', '希帕索斯撕开了秩序的外壳。', '终极证明');
      }
    }

    if (nextPlayer.hp <= 0) {
      set({
        ...createInitialState(),
        run: {
          map: [],
          currentNodeIndex: 0,
          pendingShopCards: ['golden-ratio', 'fifth-postulate', 'irrational-spark'],
          lastMessage: '你的证明失败了，数学巴别塔重新归于沉默。',
          bossDefeated: false,
          overlay: makeOverlay('证明失败', 'warning', '数学巴别塔暂时关闭了你的路径。', '系统回退'),
          currentChapterId: 'chapter1',
        },
      });
      return;
    }

    if (nextBattle.enemy.hp <= 0) {
      nextBattle.rewardCardChoices = shuffle(rewardPool).slice(0, 3);
      set({ player: nextPlayer, battle: nextBattle });
      return;
    }

    startNextTurn(nextPlayer, nextBattle);
    set({ player: nextPlayer, battle: nextBattle, run: { ...state.run, overlay: phaseOverlay } });
  },

  claimBattleReward: (cardId) => {
    const state = get();
    const { player, battle, run } = state;
    if (!player || !battle) {
      return;
    }

    const nextPlayer = structuredClone(player);
    if (cardId) {
      nextPlayer.deck.push(createCardInstance(cardId));
    }
    nextPlayer.gold += battle.enemy.boss ? 20 : 12;
    nextPlayer.theoremPoints += battle.enemy.boss ? 3 : 1;

    const nextMap = run.map.map((node, index) =>
      index === run.currentNodeIndex ? { ...node, completed: true } : node,
    );

    const nextIndex = run.currentNodeIndex + 1;
    const bossDefeated = battle.enemy.boss === true;

    if (bossDefeated) {
      clearSavedGame();
    }

    const newState: GameState = {
      player: nextPlayer,
      battle: undefined,
      screen: bossDefeated ? 'victory' : 'map',
      run: {
        ...run,
        map: nextMap,
        currentNodeIndex: nextIndex,
        lastMessage: bossDefeated ? '第一章完成：你穿过了秩序，并承认了裂缝。' : '战斗胜利，继续向下一道证明前进。',
        bossDefeated,
        overlay: bossDefeated
          ? makeOverlay('第一章完成', 'truth', '你承认了裂缝，秩序因此更真实。', 'Chapter Clear')
          : makeOverlay('练习题解决', 'normal', '新的证明被收入你的牌组。', '战斗胜利'),
      },
    };
    set(newState);
    if (!bossDefeated) {
      saveGameState(newState);
    }
  },

  returnToMap: () => {
    const state = get();
    set({ screen: state.run.bossDefeated ? 'victory' : 'map' });
  },

  clearOverlay: () => {
    const state = get();
    set({ run: { ...state.run, overlay: undefined } });
  },

  openLore: (subject) => {
    set({ activeLore: subject });
  },

  closeLore: () => {
    set({ activeLore: undefined });
  },

  resetRun: () => {
    clearSavedGame();
    set(createInitialState());
  },

  loadGame: () => {
    const saved = loadGameState();
    if (!saved) return false;

    set({
      screen: saved.screen,
      player: saved.player,
      run: saved.run,
      battle: undefined,
    });
    return true;
  },

  calculateChapterReward: () => {
    const state = get();
    const { player, run } = state;
    if (!player) {
      return { theoremPoints: 0, inheritedCards: [], inheritedRelics: [] };
    }

    const chapterConfig = getChapterConfig(run.currentChapterId);
    const baseTheoremPoints = chapterConfig.id === 'chapter1' ? 2 : chapterConfig.id === 'chapter2' ? 3 : chapterConfig.id === 'chapter3' ? 4 : 5;
    const bonusPoints = Math.floor(player.theoremPoints / 10);

    const rewardCards: CardId[] = [];
    const rareCards = player.deck.filter((card) => {
      const cardDef = getCard(card.defId);
      return cardDef.character && cardDef.character !== 'neutral';
    });
    if (rareCards.length > 0) {
      const selectedRare = rareCards.slice(0, 2);
      rewardCards.push(...selectedRare.map((c) => c.defId));
    }

    const rewardRelics = player.relics.filter((relicId) => relicId !== 'bronze-compass').slice(0, 2);

    return {
      theoremPoints: baseTheoremPoints + bonusPoints,
      inheritedCards: rewardCards,
      inheritedRelics: rewardRelics,
    };
  },

  enterNextChapter: () => {
    const state = get();
    const { run } = state;

    const chapterOrder: ChapterId[] = ['chapter1', 'chapter2', 'chapter3', 'chapter4'];
    const currentIndex = chapterOrder.indexOf(run.currentChapterId);
    const nextChapterId = chapterOrder[currentIndex + 1];

    if (!nextChapterId) {
      set({
        run: {
          ...run,
          overlay: makeOverlay('游戏通关', 'truth', '你已穿越数学巴别塔的所有层级。', 'The End'),
        },
      });
      return;
    }

    const reward = get().calculateChapterReward();

    set({
      screen: 'character-select',
      run: {
        ...run,
        currentChapterId: nextChapterId,
        inheritedRewards: reward,
        map: [],
        currentNodeIndex: 0,
        bossDefeated: false,
        overlay: makeOverlay('数学巴别塔', 'normal', `准备进入下一章：${getChapterConfig(nextChapterId).title}`, '章节完成'),
      },
    });
  },
}));
