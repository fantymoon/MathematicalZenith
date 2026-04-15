import { motion, AnimatePresence } from 'framer-motion';
import { getEnemy } from '../../data/enemies';
import { nextEnemyIntent } from '../../systems/battleResolver';
import type { EnemyState, LoreSubject } from '../../types/game';
import { IntentBadge } from './IntentBadge';

interface EnemyPanelProps {
  enemy: EnemyState;
  hitKey?: number;
  damagePop?: number;
  onInspect?: (subject: LoreSubject) => void;
}

export function EnemyPanel({ enemy, hitKey = 0, damagePop, onInspect }: EnemyPanelProps) {
  const intent = nextEnemyIntent(enemy).intent;
  const enemyDef = getEnemy(enemy.id);
  const loreSubject = enemyDef.lore
    ? {
        type: 'enemy' as const,
        name: enemyDef.name,
        subtitle: enemyDef.description,
        lore: enemyDef.lore,
      }
    : undefined;

  return (
    <motion.div
      className={`enemy-panel ${enemy.boss ? 'boss' : ''}`.trim()}
      animate={hitKey > 0 ? { x: [0, -7, 7, -4, 4, 0], y: [0, 1, -1, 0] } : undefined}
      transition={{ duration: 0.28 }}
    >
      <AnimatePresence>
        {typeof damagePop === 'number' && damagePop > 0 && (
          <motion.div
            key={`${enemy.id}-${hitKey}`}
            className={`damage-pop ${enemy.boss ? 'boss' : ''}`.trim()}
            initial={{ opacity: 0, y: 18, scale: 0.82 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -42, scale: 1.14 }}
            transition={{ duration: 0.42 }}
          >
            -{damagePop}
          </motion.div>
        )}
      </AnimatePresence>
      {loreSubject && onInspect && (
        <button type="button" className="enemy-lore-button secondary-button" onClick={() => onInspect(loreSubject)}>
          数学说明
        </button>
      )}
      <div className="enemy-portrait-shell">
        <div className={`enemy-sigil ${enemy.boss ? 'boss' : ''}`.trim()}>
          <span className="enemy-sigil-core" />
          <span className="enemy-sigil-ring" />
          <span className="enemy-sigil-glyph">{enemyDef.sigil}</span>
        </div>
      </div>
      <div>
        <p className="enemy-label">{enemy.boss ? '终极证明' : '练习题'}</p>
        <h3 className="display-face">{enemy.name}</h3>
        <p className="enemy-phase">Phase {enemy.phase}</p>
      </div>
      <div className="enemy-stats">
        <span>声誉 {enemy.hp}/{enemy.maxHp}</span>
        <span>逻辑防御 {enemy.block}</span>
      </div>
      <IntentBadge intent={intent} />
    </motion.div>
  );
}
