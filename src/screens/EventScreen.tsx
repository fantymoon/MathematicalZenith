import { motion } from 'framer-motion';
import { getEvent } from '../data/events';
import { MetalFrame } from '../components/UI/MetalFrame';
import { useGameStore } from '../store/gameStore';

export function EventScreen() {
  const run = useGameStore((state) => state.run);
  const chooseEventOption = useGameStore((state) => state.chooseEventOption);
  const goBack = useGameStore((state) => state.goBack);

  if (!run.currentEventId) return null;
  const event = getEvent(run.currentEventId);

  return (
    <motion.main className="screen screen-event" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame eyebrow="未解之谜" title={event.title} className="event-layout event-paper" headerAction={<button className="secondary-button back-button" onClick={goBack}>返回</button>}>
        <div className="event-atmosphere" aria-hidden="true">
          <span className="event-ink-blot ink-a" />
          <span className="event-ink-blot ink-b" />
          <span className="event-ink-line" />
        </div>
        <motion.blockquote className="event-quote" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34, delay: 0.04 }}>
          {event.quote}
        </motion.blockquote>
        <motion.p className="event-description prose-body" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34, delay: 0.1 }}>
          {event.description}
        </motion.p>
        <div className="choice-list">
          {event.choices.map((choice, index) => (
            <motion.button
              key={choice.id}
              className="choice-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.14 + index * 0.06 }}
              onClick={() => chooseEventOption(index)}
            >
              <strong>{choice.label}</strong>
              <span>{choice.description}</span>
            </motion.button>
          ))}
        </div>
      </MetalFrame>
    </motion.main>
  );
}
