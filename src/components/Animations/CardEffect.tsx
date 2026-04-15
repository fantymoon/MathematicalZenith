import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import type { CardCategory } from '../../types/game';
import { CARD_ANIMATION_CONFIG, HIT_TEXTS } from '../../types/animation';
import { ParticleSymbol } from './MathSymbol';

interface CardEffectProps {
  cardType: CardCategory;
  isActive: boolean;
  onComplete?: () => void;
}

export function CardEffect({ cardType, isActive, onComplete }: CardEffectProps) {
  const config = CARD_ANIMATION_CONFIG[cardType];

  const mainSymbol = useMemo(() => {
    const symbols = config.symbols;
    return symbols[Math.floor(Math.random() * symbols.length)];
  }, [config.symbols, isActive]);

  const hitText = useMemo(() => {
    const texts = config.hitTexts;
    return texts[Math.floor(Math.random() * texts.length)];
  }, [config.hitTexts, isActive]);

  const particles = useMemo(() => {
    return Array.from({ length: config.particleCount }, (_, i) => ({
      id: i,
      symbol: config.symbols[i % config.symbols.length],
      vx: (Math.random() - 0.5) * 100,
      vy: (Math.random() - 0.5) * 100,
      rotation: (Math.random() - 0.5) * 180,
    }));
  }, [config, isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={`card-effect ${cardType}-effect`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
        >
          {/* Main trajectory animation */}
          <motion.div
            className="effect-trajectory"
            initial={getInitialPosition(cardType)}
            animate={getAnimatePosition(cardType)}
            transition={{
              duration: config.duration / 1000,
              ease: config.easing,
            }}
          >
            <motion.span
              className="effect-symbol"
              style={{
                fontSize: config.symbolSize,
                color: config.colors.primary,
                textShadow: `0 0 15px ${config.colors.glow}`,
                fontWeight: 'bold',
                fontFamily: 'Times New Roman, serif',
              }}
              animate={getSymbolAnimation(cardType)}
              transition={{
                duration: config.duration / 1000,
                ease: config.easing,
              }}
            >
              {mainSymbol}
            </motion.span>
          </motion.div>

          {/* Hit effect */}
          <motion.div
            className="hit-effect"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
            transition={{
              duration: 0.6,
              delay: (config.duration - 150) / 1000,
              ease: 'easeOut',
            }}
          >
            <span
              className="hit-text"
              style={{
                color: config.colors.primary,
                textShadow: `0 0 10px ${config.colors.glow}`,
              }}
            >
              {hitText}
            </span>
          </motion.div>

          {/* Particles */}
          <div className="particle-container">
            {particles.map((particle) => (
              <ParticleSymbol
                key={particle.id}
                symbol={particle.symbol}
                animationType={config.type}
                size={config.symbolSize * 0.6}
                vx={particle.vx}
                vy={particle.vy}
                rotation={particle.rotation}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getInitialPosition(cardType: CardCategory) {
  switch (cardType) {
    case 'attack':
      return { x: -200, y: 100, opacity: 0, scale: 0.5 };
    case 'skill':
      return { x: 0, y: 150, opacity: 0, scale: 0.5 };
    case 'power':
      return { x: 0, y: 100, opacity: 0, scale: 0.3 };
    default:
      return { x: -200, y: 100, opacity: 0 };
  }
}

function getAnimatePosition(cardType: CardCategory) {
  switch (cardType) {
    case 'attack':
      return { x: 180, y: -30, opacity: 1, scale: 1 };
    case 'skill':
      return { x: 0, y: -50, opacity: 1, scale: 1 };
    case 'power':
      return { x: 0, y: -150, opacity: 1, scale: 1 };
    default:
      return { x: 0, y: 0, opacity: 1 };
  }
}

function getSymbolAnimation(cardType: CardCategory) {
  switch (cardType) {
    case 'attack':
      return { rotate: [0, -10, 0], scale: [1, 1.2, 1] };
    case 'skill':
      return { rotate: [0, 360, 720], scale: [1, 1.1, 1] };
    case 'power':
      return { rotate: [0, 0, 0], scale: [1, 1.3, 1.5, 1] };
    default:
      return {};
  }
}
