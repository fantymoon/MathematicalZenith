import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect } from 'react';
import { StartScreen } from './screens/StartScreen';
import { CharacterSelectScreen } from './screens/CharacterSelectScreen';
import { MapScreen } from './screens/MapScreen';
import { EventScreen } from './screens/EventScreen';
import { ShopScreen } from './screens/ShopScreen';
import { RestScreen } from './screens/RestScreen';
import { BattleScreen } from './screens/BattleScreen';
import { VictoryScreen } from './screens/VictoryScreen';
import { AnnouncementOverlay } from './components/UI/AnnouncementOverlay';
import { LoreModal } from './components/UI/LoreModal';
import { ScreenFX } from './components/UI/ScreenFX';
import { useGameStore } from './store/gameStore';

const screenTransitions: Record<string, Variants> = {
  start: {
    initial: { opacity: 0, scale: 1.03, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.985, filter: 'blur(14px)', transition: { duration: 0.34, ease: 'easeInOut' } },
  },
  'character-select': {
    initial: { opacity: 0, x: 56, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: -44, filter: 'blur(10px)', transition: { duration: 0.28, ease: 'easeInOut' } },
  },
  map: {
    initial: { opacity: 0, y: 34, scale: 0.986, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.2, 0.9, 0.2, 1] } },
    exit: { opacity: 0, y: -24, scale: 1.01, filter: 'blur(12px)', transition: { duration: 0.3, ease: 'easeInOut' } },
  },
  event: {
    initial: { opacity: 0, x: 80, scale: 1.01, rotateZ: -0.6, filter: 'blur(12px)' },
    animate: { opacity: 1, x: 0, scale: 1, rotateZ: 0, filter: 'blur(0px)', transition: { duration: 0.44, ease: [0.18, 1, 0.28, 1] } },
    exit: { opacity: 0, x: -52, scale: 0.992, rotateZ: 0.45, filter: 'blur(12px)', transition: { duration: 0.32, ease: 'easeInOut' } },
  },
  shop: {
    initial: { opacity: 0, y: 38, scale: 0.99, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -28, scale: 1.01, filter: 'blur(10px)', transition: { duration: 0.28, ease: 'easeInOut' } },
  },
  rest: {
    initial: { opacity: 0, y: 46, scale: 0.992, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -32, scale: 1.005, filter: 'blur(10px)', transition: { duration: 0.28, ease: 'easeInOut' } },
  },
  battle: {
    initial: { opacity: 0, scale: 1.035, y: 24, filter: 'blur(16px)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.972, y: -20, filter: 'blur(18px)', transition: { duration: 0.34, ease: 'easeInOut' } },
  },
  victory: {
    initial: { opacity: 0, scale: 0.97, y: 30, filter: 'blur(12px)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.2, 1, 0.32, 1] } },
    exit: { opacity: 0, scale: 1.02, y: -18, filter: 'blur(10px)', transition: { duration: 0.3, ease: 'easeInOut' } },
  },
};

function App() {
  const screen = useGameStore((state) => state.screen);
  const overlay = useGameStore((state) => state.run.overlay);
  const clearOverlay = useGameStore((state) => state.clearOverlay);
  const activeLore = useGameStore((state) => state.activeLore);
  const closeLore = useGameStore((state) => state.closeLore);
  const transitionVariants = screenTransitions[screen];

  return (
    <div className={`app-shell app-shell-${screen}`}>
      <div className="formula-bg" />
      <div className="noise-overlay" />
      <div className={`screen-transition-shell screen-transition-shell-${screen}`} aria-hidden="true">
        <motion.div key={`veil-${screen}`} className="screen-transition-veil" initial={{ opacity: 0.26 }} animate={{ opacity: 0.08 }} exit={{ opacity: 0.3 }} transition={{ duration: 0.42, ease: 'easeOut' }} />
        <motion.div key={`sigil-${screen}`} className="screen-transition-sigil" initial={{ opacity: 0, scale: 0.72, rotate: -8 }} animate={{ opacity: 0.26, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.12, rotate: 6 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
      </div>
      <ScreenFX />
      <AnimatePresence mode="wait">
        <motion.div key={screen} className={`screen-scene screen-scene-${screen}`} variants={transitionVariants} initial="initial" animate="animate" exit="exit">
          {screen === 'start' && <StartScreen />}
          {screen === 'character-select' && <CharacterSelectScreen />}
          {screen === 'map' && <MapScreen />}
          {screen === 'event' && <EventScreen />}
          {screen === 'shop' && <ShopScreen />}
          {screen === 'rest' && <RestScreen />}
          {screen === 'battle' && <BattleScreen />}
          {screen === 'victory' && <VictoryScreen />}
        </motion.div>
      </AnimatePresence>
      <AnnouncementOverlay overlay={overlay} />
      <LoreModal subject={activeLore} onClose={closeLore} />
      <OverlayAutoDismiss overlayKey={overlay?.key} clearOverlay={clearOverlay} />
    </div>
  );
}

function OverlayAutoDismiss({ overlayKey, clearOverlay }: { overlayKey?: string; clearOverlay: () => void }) {
  useEffect(() => {
    if (!overlayKey) return;
    const timer = window.setTimeout(() => clearOverlay(), 1800);
    return () => window.clearTimeout(timer);
  }, [overlayKey, clearOverlay]);

  return null;
}

export default App;
