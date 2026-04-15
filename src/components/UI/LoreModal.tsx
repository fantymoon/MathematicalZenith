import { AnimatePresence, motion } from 'framer-motion';
import { MetalFrame } from './MetalFrame';
import type { LoreSubject } from '../../types/game';

interface LoreModalProps {
  subject?: LoreSubject;
  onClose: () => void;
}

const subjectLabelMap: Record<LoreSubject['type'], string> = {
  card: '卡牌档案',
  character: '人物档案',
  enemy: '对象档案',
};

export function LoreModal({ subject, onClose }: LoreModalProps) {
  return (
    <AnimatePresence>
      {subject && (
        <motion.div className="lore-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <motion.button className="lore-modal-backdrop" onClick={onClose} aria-label="关闭数学档案" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="lore-modal-shell" initial={{ opacity: 0, y: 28, scale: 0.96, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -18, scale: 1.02, filter: 'blur(8px)' }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <MetalFrame
              eyebrow={subjectLabelMap[subject.type]}
              title={subject.name}
              className="lore-modal-frame"
              headerAction={<button className="secondary-button lore-close-button" onClick={onClose}>关闭</button>}
            >
              <div className="lore-modal-layout">
                <div className="lore-meta-block">
                  {subject.subtitle && <p className="lore-subtitle">{subject.subtitle}</p>}
                  <h3>{subject.lore.title}</h3>
                  <p className="lore-summary prose-body">{subject.lore.summary}</p>
                  {subject.lore.tags && subject.lore.tags.length > 0 && (
                    <div className="lore-tag-list">
                      {subject.lore.tags.map((tag) => (
                        <span key={tag} className="lore-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="lore-sections">
                  <section className="lore-section note-concept">
                    <span className="panel-eyebrow">概念</span>
                    <p className="prose-body">{subject.lore.conceptNote}</p>
                  </section>
                  <section className="lore-section note-history">
                    <span className="panel-eyebrow">数学史</span>
                    <p className="prose-body">{subject.lore.historyNote}</p>
                  </section>
                </div>
                {subject.lore.links && subject.lore.links.length > 0 && (
                  <div className="lore-link-row">
                    {subject.lore.links.map((link) => (
                      <a key={link.url} className="primary-button lore-link-button" href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </MetalFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
