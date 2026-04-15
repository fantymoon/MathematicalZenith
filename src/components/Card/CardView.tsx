import { motion } from 'framer-motion';
import { getCard } from '../../data/cards';
import type { CardInstance } from '../../types/game';

interface CardViewProps {
  card: CardInstance;
  selected?: boolean;
  disabled?: boolean;
  launching?: boolean;
  onClick?: () => void;
  onInspect?: () => void;
}

export function CardView({ card, selected = false, disabled = false, launching = false, onClick, onInspect }: CardViewProps) {
  const def = getCard(card.defId);

  return (
    <motion.button
      layout
      className={`card-view type-${def.type} ${selected ? 'selected' : ''} ${launching ? 'launching' : ''}`.trim()}
      whileHover={disabled || launching ? undefined : { y: -14, rotateX: -8, rotateY: 4, scale: 1.02 }}
      whileTap={disabled || launching ? undefined : { scale: 0.97, rotateZ: -1 }}
      initial={{ opacity: 0.92, y: 18, scale: 0.96 }}
      animate={launching ? { opacity: [1, 1, 0], x: [0, 110, 240], y: [0, -36, -120], rotate: [0, -4, -10], scale: [1, 1.02, 0.78] } : { opacity: 1, y: 0, scale: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -24, scale: 1.08, rotateZ: 4, filter: 'blur(10px)' }}
      transition={{ duration: launching ? 0.36 : 0.22 }}
      onClick={onClick}
      disabled={disabled}
    >
      {onInspect && (
        <button
          type="button"
          className="card-lore-button secondary-button"
          onClick={(event) => {
            event.stopPropagation();
            onInspect();
          }}
          aria-label={`查看 ${def.name} 的数学说明`}
        >
          数学说明
        </button>
      )}
      <div className="card-noise" />
      <div className="card-glow" />
      <div className="card-grid" />
      <div className="card-dissolve" />
      <div className="card-topline">
        <span className="card-cost">{card.cost}</span>
        <span className="card-type">{def.type}</span>
      </div>
      <h3>{def.name}</h3>
      <p className="card-description">{def.description}</p>
      <p className="card-flavor">{def.flavor}</p>
    </motion.button>
  );
}
