import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MetalFrameProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function MetalFrame({ title, eyebrow, children, className = '', headerAction }: MetalFrameProps) {
  return (
    <motion.section
      className={`metal-frame ${className}`.trim()}
      initial={{ opacity: 0, y: 22, scale: 0.985, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, scale: 1.015, filter: 'blur(10px)' }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="frame-transition-flare" aria-hidden="true" initial={{ opacity: 0, x: '-34%' }} animate={{ opacity: [0, 0.34, 0], x: ['-34%', '14%', '42%'] }} transition={{ duration: 0.8, ease: 'easeOut' }} />
      <div className="frame-corner corner-tl" />
      <div className="frame-corner corner-tr" />
      <div className="frame-corner corner-bl" />
      <div className="frame-corner corner-br" />
      {(eyebrow || title || headerAction) && (
        <header className="panel-header panel-header-row">
          <div>
            {eyebrow && <span className="panel-eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {headerAction && <div className="panel-header-action">{headerAction}</div>}
        </header>
      )}
      {children}
    </motion.section>
  );
}
