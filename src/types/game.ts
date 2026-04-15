export type Screen = 'start' | 'character-select' | 'map' | 'event' | 'shop' | 'rest' | 'battle' | 'victory';

export type CharacterId = 'euclid' | 'gauss' | 'hualuogeng' | 'newton-leibniz' | 'galois' | 'cantor' | 'godel-turing' | 'descartes' | 'archimedes' | 'pythagoras' | 'euler' | 'lagrange' | 'von-neumann' | 'noether';
export type CardId =
  | 'strike'
  | 'guard'
  | 'point-line-plane'
  | 'triangle-stability'
  | 'line-axiom'
  | 'perpendicular-shortest'
  | 'sas-congruence'
  | 'congruent-assault'
  | 'bell-curve'
  | 'fundamental-theorem'
  | 'heptadecagon'
  | 'optimal-method'
  | 'overall-planning'
  | 'zero-one'
  | 'fifth-postulate'
  | 'golden-ratio'
  | 'irrational-spark'
  // Chapter 2: Fluxion
  | 'fluxion'
  | 'limit-concept'
  | 'tangent-line'
  | 'derivative'
  | 'integral'
  | 'epsilon-delta'
  | 'newton-method'
  | 'leibniz-notation'
  // Chapter 3: Paradox
  | 'group-action'
  | 'radical-unsolvable'
  | 'premonition-letter'
  | 'bijection'
  | 'power-set'
  | 'continuum-hypothesis'
  | 'aleph-null'
  | 'non-euclidean'
  | 'russell-paradox'
  | 'diagonal-argument'
  | 'resolve'
  // Chapter 4: Meta
  | 'incompleteness-theorem'
  | 'halting-problem'
  | 'self-reference'
  | 'code-inspect'
  | 'source-key'
  | 'meta-proof'
  // Descartes exclusive
  | 'heart-function'
  | 'universal-doubt'
  | 'dualism'
  // Archimedes exclusive
  | 'lever-principle'
  | 'displacement-method'
  | 'spiral-attack'
  // Pythagoras exclusive
  | 'pythagorean-theorem'
  | 'harmony-of-spheres'
  | 'tetraktys'
  // Euler exclusive
  | 'euler-formula'
  | 'seven-bridges'
  | 'infinite-series'
  // Lagrange exclusive
  | 'calculus-of-variations'
  | 'lagrange-point'
  | 'analytical-mechanics'
  // Von Neumann exclusive
  | 'game-equilibrium'
  | 'stored-program'
  | 'self-replication'
  // Noether exclusive
  | 'abstract-algebra'
  | 'symmetry-transform'
  | 'noether-theorem';

export type CardCategory = 'attack' | 'skill' | 'power';
export type EffectType =
  | 'damage'
  | 'block'
  | 'draw'
  | 'discard-select'
  | 'power'
  | 'cost-reduce-hand'
  | 'set-no-draw'
  | 'conditional-bonus-damage'
  | 'create-card'
  | 'turn-random-max'
  | 'next-turn-strength-from-unspent'
  | 'bonus-if-no-skill-played'
  | 'grant-irrational-guard'
  // Chapter 3 effects
  | 'retain-cards'
  | 'reflect-damage'
  | 'duplicate-if-infinity'
  | 'infinite-energy'
  | 'hp-cost-per-card'
  | 'block-to-damage'
  | 'destroy-self-replicating'
  | 'damage-ignore-block'
  // Chapter 4 effects
  | 'skip-next-attack'
  | 'damage-self-referential'
  | 'reveal-enemy'
  | 'open-console'
  | 'damage-meta'
  // New effects for card fixes
  | 'heal'
  | 'shuffle-hand-to-draw'
  | 'next-card-zero-cost'
  | 'reduce-attack-cost'
  | 'transform-cards';

export interface Effect {
  type: EffectType;
  amount?: number;
  count?: number;
  powerId?: PowerId;
  cardId?: CardId;
}

export interface LoreLink {
  label: string;
  url: string;
}

export interface LoreEntry {
  title: string;
  summary: string;
  conceptNote: string;
  historyNote?: string;
  tags?: string[];
  links?: LoreLink[];
}

export type LoreSubjectType = 'card' | 'character' | 'enemy';

export interface LoreSubject {
  type: LoreSubjectType;
  name: string;
  subtitle?: string;
  lore: LoreEntry;
}

export interface CardDef {
  id: CardId;
  name: string;
  cost: number;
  type: CardCategory;
  description: string;
  flavor: string;
  character?: CharacterId | 'neutral';
  exhaust?: boolean;
  upgraded?: boolean;
  effects: Effect[];
  lore?: LoreEntry;
}

export interface CardInstance {
  uuid: string;
  defId: CardId;
  cost: number;
  temporaryCost?: number;
  upgraded?: boolean;
  retain?: boolean;
}

export type PowerId =
  | 'triangle-stability'
  | 'heptadecagon'
  | 'fifth-postulate'
  | 'irrational-guard'
  | 'bell-curve'
  | 'overall-planning'
  | 'derivative'
  | 'aleph-null'
  | 'incompleteness'
  | 'harmony-of-spheres'
  | 'infinite-series'
  | 'lagrange-point'
  | 'stored-program'
  | 'abstract-algebra'
  // New powers for card fixes
  | 'lever-charge'
  | 'line-axiom-draw'
  | 'leibniz-zero-cost'
  | 'calculus-variations-active'
  | 'no-skill-this-turn';

export interface PowerState {
  id: PowerId;
  stacks: number;
}

export type ChapterId = 'chapter1' | 'chapter2' | 'chapter3' | 'chapter4';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  title: string;
  color: string;
  portraitLabel?: string;
  portraitAccent?: string;
  summary: string;
  passiveName: string;
  passiveDescription: string;
  playstyle: string;
  starterDeck: CardId[];
  maxHp: number;
  chapterId: ChapterId;
  lore?: LoreEntry;
}

export type EnemyIntentType = 'attack' | 'block' | 'buff' | 'special';

export interface EnemyIntent {
  type: EnemyIntentType;
  value: number;
  label: string;
  detail: string;
}

export interface EnemyAction {
  intent: EnemyIntent;
  onAct?: 'gain-block' | 'irrational-storm';
}

export interface EnemyDef {
  id: string;
  name: string;
  maxHp: number;
  description: string;
  sigil?: string;
  fxTheme?: 'normal' | 'boss';
  actions: EnemyAction[];
  boss?: boolean;
  lore?: LoreEntry;
}

export interface EnemyState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  block: number;
  actionIndex: number;
  actions: EnemyAction[];
  phase: number;
  boss?: boolean;
}

export type MapNodeType = 'battle' | 'event' | 'rest' | 'shop' | 'boss';

export interface MapNode {
  id: string;
  type: MapNodeType;
  title: string;
  subtitle: string;
  completed?: boolean;
}

export interface EventChoice {
  id: string;
  label: string;
  description: string;
  effect: EventEffect;
  overlay?: EventOverlayConfig;
}

export interface EventOverlayConfig {
  title: string;
  theme: OverlayState['theme'];
  subtitle?: string;
  kicker?: string;
}

export type EventEffect =
  | { type: 'grant-relic'; relicId: string; amount?: number }
  | { type: 'grant-card'; cardId: CardId }
  | { type: 'heal'; amount: number }
  | { type: 'damage'; amount: number }
  | { type: 'gain-gold'; amount: number }
  | { type: 'remove-card'; amount: number }
  | { type: 'remove-card-tag'; tag: string }
  | { type: 'modify-stat'; stat: string; amount: number }
  | { type: 'draw-any'; amount: number }
  | { type: 'none' };

export interface EventDef {
  id: string;
  title: string;
  quote: string;
  description: string;
  choices: EventChoice[];
}

export interface RelicDef {
  id: string;
  name: string;
  description: string;
  lore?: LoreEntry;
}

export interface PlayerState {
  characterId: CharacterId;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  block: number;
  strength: number;
  dexterity: number;
  deck: CardInstance[];
  drawPile: CardInstance[];
  hand: CardInstance[];
  discardPile: CardInstance[];
  exhaustPile: CardInstance[];
  powers: PowerState[];
  relics: string[];
  gold: number;
  theoremPoints: number;
}

export interface PendingSelection {
  cardId: CardId;
  mode: 'discard-2' | 'combine-2' | 'discard-1';
  selected: string[];
}

export interface BattleState {
  enemy: EnemyState;
  turn: number;
  cardsPlayedThisTurn: number;
  attacksPlayedThisTurn: number;
  skillsPlayedThisTurn: number;
  noDraw: boolean;
  randomMaxThisTurn: boolean;
  queuedStrengthNextTurn: number;
  queuedBlockNextTurn: number;
  zeroCostDrawUsed: boolean;
  pendingSelection?: PendingSelection;
  lastPlayedCardId?: CardId;
  log: string[];
  rewardCardChoices: CardId[];
}

export type OverlayTheme = 'normal' | 'warning' | 'boss' | 'truth' | 'glitch' | 'pressure' | 'danger';

export interface OverlayState {
  key: string;
  title: string;
  subtitle?: string;
  kicker?: string;
  theme: OverlayTheme;
}

export interface ChapterReward {
  theoremPoints: number;
  inheritedCards: CardId[];
  inheritedRelics: string[];
}

export interface RunState {
  map: MapNode[];
  currentNodeIndex: number;
  currentEventId?: string;
  pendingShopCards: CardId[];
  lastMessage?: string;
  bossDefeated: boolean;
  overlay?: OverlayState;
  currentChapterId: ChapterId;
  inheritedRewards?: ChapterReward;
}

export interface GameState {
  screen: Screen;
  player?: PlayerState;
  battle?: BattleState;
  run: RunState;
  activeLore?: LoreSubject;
}
