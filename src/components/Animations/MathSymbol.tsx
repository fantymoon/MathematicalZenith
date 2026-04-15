import { motion } from 'framer-motion';
import type { AnimationType } from '../../types/animation';
import { CARD_ANIMATION_CONFIG } from '../../types/animation';

interface MathSymbolProps {
  symbol: string;
  animationType: AnimationType;
  size?: number;
  delay?: number;
  className?: string;
}

export function MathSymbol({
  symbol,
  animationType,
  size = 24,
  delay = 0,
  className = '',
}: MathSymbolProps) {
  const config = CARD_ANIMATION_CONFIG[animationType];

  return (
    <motion.span
      className={`math-symbol ${className}`}
      style={{
        fontSize: size,
        color: config.colors.primary,
        textShadow: `0 0 10px ${config.colors.glow}`,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman, serif',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.3,
        delay,
        ease: config.easing,
      }}
    >
      {symbol}
    </motion.span>
  );
}

interface ParticleSymbolProps extends MathSymbolProps {
  vx: number;
  vy: number;
  rotation: number;
}

export function ParticleSymbol({
  symbol,
  animationType,
  size = 16,
  vx,
  vy,
  rotation,
  className = '',
}: ParticleSymbolProps) {
  const config = CARD_ANIMATION_CONFIG[animationType];

  return (
    <motion.span
      className={`particle-symbol ${className}`}
      style={{
        fontSize: size,
        color: config.colors.secondary,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman, serif',
        position: 'absolute',
      }}
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [1, 1, 0],
        x: [0, vx * 0.5, vx],
        y: [0, vy * 0.5, vy],
        rotate: [0, rotation * 0.5, rotation],
      }}
      transition={{
        duration: config.duration / 1000,
        ease: 'easeOut',
      }}
    >
      {symbol}
    </motion.span>
  );
}
