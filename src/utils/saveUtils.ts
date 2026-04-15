import type { GameState, Screen, PlayerState, BattleState, RunState } from '../types/game';

const SAVE_KEY = 'math-peak-game-save';
const SAVE_VERSION = 1;

export interface SavedGameState {
  version: number;
  timestamp: number;
  screen: Screen;
  player: PlayerState;
  battle?: BattleState;
  run: RunState;
}

export function saveGameState(state: GameState): void {
  try {
    if (!state.player) return;

    // 战斗中不保存战斗状态，恢复到地图
    const screen = state.battle ? 'map' : state.screen;

    const saveData: SavedGameState = {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      screen,
      player: state.player,
      run: state.run,
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch {
    // 隐私模式或存储已满时静默处理
  }
}

export function loadGameState(): SavedGameState | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return null;

    const data = JSON.parse(saved) as SavedGameState;

    // 版本检查
    if (data.version !== SAVE_VERSION) {
      clearSavedGame();
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // 静默处理
  }
}

export function hasSavedGame(): boolean {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch {
    return false;
  }
}
