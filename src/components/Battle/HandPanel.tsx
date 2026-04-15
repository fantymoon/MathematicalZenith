import { AnimatePresence } from 'framer-motion';
import { CardView } from '../Card/CardView';
import type { CardInstance } from '../../types/game';

interface HandPanelProps {
  cards: CardInstance[];
  selected: string[];
  disabled?: boolean;
  launchingCardId?: string;
  onCardClick: (uuid: string) => void;
  onInspectCard?: (uuid: string) => void;
}

export function HandPanel({ cards, selected, disabled = false, launchingCardId, onCardClick, onInspectCard }: HandPanelProps) {
  return (
    <div className="hand-panel">
      <AnimatePresence initial={false}>
        {cards.map((card) => (
          <CardView
            key={card.uuid}
            card={card}
            selected={selected.includes(card.uuid)}
            disabled={disabled}
            launching={launchingCardId === card.uuid}
            onClick={() => onCardClick(card.uuid)}
            onInspect={onInspectCard ? () => onInspectCard(card.uuid) : undefined}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
