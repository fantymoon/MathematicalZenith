# Screens

Top-level screen components. Each screen is a route-like view controlled by `App.tsx` switch.

## STRUCTURE

```
screens/
├── StartScreen.tsx           # Title screen, "开始游戏"
├── CharacterSelectScreen.tsx # Character picker
├── MapScreen.tsx             # Map navigation
├── EventScreen.tsx           # Random event choices
├── ShopScreen.tsx            # Card shop
├── RestScreen.tsx            # Rest site (heal/upgrade)
├── BattleScreen.tsx          # Main battle UI
└── VictoryScreen.tsx         # Chapter complete
```

## WHERE TO LOOK

| Task | Screen | Notes |
|------|--------|-------|
| Add new screen | Create `XxxScreen.tsx` | Register in `App.tsx` switch |
| Modify battle UI | `BattleScreen.tsx` | Uses HandPanel, EnemyPanel |
| Change transitions | `App.tsx` | `screenTransitions` object |
| Add screen state | `gameStore.ts` | `Screen` type in `types/game.ts` |

## PATTERNS

All screens:
- Import from `useGameStore` for state/actions
- Use `motion` from Framer Motion for animations
- Render inside `<MetalFrame>` for consistent styling
- Access `player`, `battle`, `run` from store

## STORE USAGE

Common store hooks per screen:
- `StartScreen`: `enterCharacterSelect`, `loadGame`
- `CharacterSelectScreen`: `selectCharacter`, `goBack`
- `MapScreen`: `enterCurrentNode`, `player`, `run.map`
- `EventScreen`: `chooseEventOption`, `run.currentEventId`
- `ShopScreen`: `chooseShopCard`, `run.pendingShopCards`
- `RestScreen`: `leaveRestSite`
- `BattleScreen`: `playCardById`, `endTurn`, `claimBattleReward`
- `VictoryScreen`: `goBack`, `resetRun`
