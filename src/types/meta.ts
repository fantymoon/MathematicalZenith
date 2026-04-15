// Meta System Types for Chapter 4
// This module defines the types for the "code console" meta-gameplay

export interface CodeConsole {
  isOpen: boolean;
  history: string[];
  availableCommands: CodeCommand[];
  lastOutput?: string;
}

export type CodeCommandType = 'set' | 'get' | 'invoke' | 'comment';

export interface CodeCommand {
  type: CodeCommandType;
  target: string;
  description: string;
  example: string;
  execute: (args: string[], gameState: unknown) => CommandResult;
}

export interface CommandResult {
  success: boolean;
  output: string;
  sideEffects?: MetaSideEffect[];
}

export type MetaSideEffect =
  | { type: 'modify-enemy-hp'; enemyId: string; value: number }
  | { type: 'modify-enemy-attack'; enemyId: string; value: number }
  | { type: 'modify-player-hp'; value: number }
  | { type: 'modify-player-energy'; value: number }
  | { type: 'skip-battle' }
  | { type: 'grant-card'; cardId: string }
  | { type: 'unlock-chapter'; chapterId: string };

// Predefined commands for the fake console
export const PREDEFINED_COMMANDS: CodeCommand[] = [
  {
    type: 'set',
    target: 'enemy.attack',
    description: '修改敌人的攻击力',
    example: 'enemy.attack = 0',
    execute: (args) => ({
      success: true,
      output: '✓ 敌人攻击力已修改为 0',
      sideEffects: [{ type: 'modify-enemy-attack', enemyId: 'current', value: 0 }],
    }),
  },
  {
    type: 'set',
    target: 'enemy.hp',
    description: '修改敌人的生命值',
    example: 'enemy.hp = 1',
    execute: (args) => ({
      success: true,
      output: '✓ 敌人生命值已修改为 1',
      sideEffects: [{ type: 'modify-enemy-hp', enemyId: 'current', value: 1 }],
    }),
  },
  {
    type: 'set',
    target: 'player.hp',
    description: '修改玩家的生命值',
    example: 'player.hp = 999',
    execute: (args) => ({
      success: true,
      output: '✓ 玩家生命值已恢复为满',
      sideEffects: [{ type: 'modify-player-hp', value: 999 }],
    }),
  },
  {
    type: 'set',
    target: 'player.energy',
    description: '修改玩家的能量',
    example: 'player.energy = 99',
    execute: (args) => ({
      success: true,
      output: '✓ 玩家能量已设置为 99',
      sideEffects: [{ type: 'modify-player-energy', value: 99 }],
    }),
  },
  {
    type: 'invoke',
    target: 'Godel.Proof',
    description: '跳过哥德尔Boss战',
    example: 'Godel.Proof = false',
    execute: (args) => ({
      success: true,
      output: '✓ 哥德尔不完备定理已禁用，Boss战跳过',
      sideEffects: [{ type: 'skip-battle' }],
    }),
  },
  {
    type: 'comment',
    target: 'system',
    description: '注释，无实际效果',
    example: '// 这是一个注释',
    execute: (args) => ({
      success: true,
      output: '// 注释已记录',
    }),
  },
];

// Easter egg responses for invalid commands
export const EASTER_EGG_RESPONSES: Record<string, string> = {
  'help': '帮助？这里没有帮助。只有你自己。',
  'exit': '你无法退出。你一直都在这里。',
  'quit': '退出？游戏才刚刚开始。',
  'sudo': '检测到权限提升请求……拒绝。你以为这是Linux吗？',
  'rm -rf': '危险命令已拦截。想删库跑路？没门。',
  'hello': '你好。我是这个系统的……守护者？创造者？也许只是另一个bug。',
  'whoami': '你？你是玩家。但真的是这样吗？',
  'ls': '当前目录：/dev/null。内容：空。',
  'cd': '你想去哪里？这里没有其他地方。',
  'cat': '喵？哦，你想看文件内容。可惜，文件不存在。',
};

// Glitch text effects
export const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function generateGlitchText(original: string, intensity: number = 0.3): string {
  return original
    .split('')
    .map((char) => {
      if (Math.random() < intensity && char !== ' ') {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      return char;
    })
    .join('');
}
