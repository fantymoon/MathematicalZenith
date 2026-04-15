# Components

Reusable UI components organized by domain. No game logic - only presentation.

## STRUCTURE

```
components/
├── Animations/        # Visual effects
│   ├── CardEffect.tsx     # Card trajectory/effect animation
│   └── MathSymbol.tsx     # Animated math symbols
├── UI/                # Generic UI primitives
│   ├── AnnouncementOverlay.tsx  # In-game notifications
│   ├── LoreModal.tsx           # Educational lore popup
│   ├── MetalFrame.tsx          # Decorative frame wrapper
│   ├── StatCounter.tsx         # HP/Energy/Block display
│   └── ScreenFX.tsx            # Screen-level effects
├── Battle/            # Battle-specific components
│   ├── EnemyPanel.tsx    # Enemy info + intent display
│   ├── HandPanel.tsx     # Player's hand of cards
│   └── IntentBadge.tsx   # Enemy intent indicator
├── Card/              # Card rendering
│   └── CardView.tsx      # Core card component
└── Map/               # Map rendering
    └── MapNode.tsx       # Map node button
```

## WHERE TO LOOK

| Task | Component | Notes |
|------|-----------|-------|
| Modify card appearance | `Card/CardView.tsx` | Framer Motion animations |
| Add enemy UI | `Battle/EnemyPanel.tsx` | Uses `IntentBadge` |
| Add overlay/notification | `UI/AnnouncementOverlay.tsx` | `OverlayState` type |
| Add modal | `UI/LoreModal.tsx` | `LoreSubject` type |
| Modify stats display | `UI/StatCounter.tsx` | HP, energy, block |
| Add screen effect | `UI/ScreenFX.tsx` | Noise, vignette |

## REUSABLE PATTERNS

- **Overlay/Modal**: `AnnouncementOverlay`, `LoreModal` - controlled via store state
- **Frame**: `MetalFrame` - decorative wrapper with title, eyebrow, action slot
- **Counter**: `StatCounter` - label + value/max with accent color
- **Card**: `CardView` - cost, type, description, flavor, click/inspect handlers

## PROPS PATTERN

Components receive:
- Data objects (e.g., `card: CardInstance`, `enemy: EnemyState`)
- Event handlers (e.g., `onClick`, `onInspect`)
- UI state (e.g., `selected?: boolean`, `disabled?: boolean`)
