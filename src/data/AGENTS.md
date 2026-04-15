# Data Layer

Game definitions organized by chapter. All data is static configuration - no runtime logic.

## STRUCTURE

```
data/
├── cards.ts           # Card registry + rewardPool + getCard()
├── enemies.ts         # Enemy registry + getEnemy()
├── characters.ts      # Character registry + getCharacter()
├── events.ts          # Event registry + getEvent()
├── relics.ts          # Relic registry
├── cards/             # Chapter-specific cards
│   ├── chapter1.ts    # Euclidean geometry
│   ├── chapter2.ts    # Calculus/Fluxion
│   ├── chapter3.ts    # Paradox/Set theory
│   └── chapter4.ts    # Meta/Incompleteness
├── enemies/           # Chapter-specific enemies
├── characters/        # Chapter-specific characters
├── events/            # Chapter-specific events
└── relics/            # Chapter-specific relics
```

## WHERE TO LOOK

| Task | File | Pattern |
|------|------|---------|
| Add card | `cards/chapterN.ts` | Export array, merge in `cards.ts` |
| Add enemy | `enemies/chapterN.ts` | Define `EnemyDef`, set `boss: true` for bosses |
| Add character | `characters/chapterN.ts` | Define `CharacterDef` with `starterDeck`, `maxHp` |
| Get by ID | `getCard()`, `getEnemy()`, `getCharacter()` | Registry lookup functions |

## CONVENTIONS

- **Chapter organization**: Each chapter has its own file per data type
- **Registry pattern**: Main file merges chapter arrays, exports `Record<string, Def>`
- **Lore field**: Optional `lore: LoreEntry` for educational content
- **Barrel exports**: Main files re-export chapter data via spread

## DATA TYPES

All definitions use types from `src/types/game.ts`:
- `CardDef` - Cards with `id`, `cost`, `type`, `effects[]`
- `EnemyDef` - Enemies with `actions[]`, `boss?: boolean`
- `CharacterDef` - Characters with `starterDeck[]`, `maxHp`, `passiveName`
- `EventDef` - Events with `choices[]`
- `RelicDef` - Relics with `description`
