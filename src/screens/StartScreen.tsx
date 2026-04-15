import { motion } from 'framer-motion';
import { getChapterConfig } from '../types/chapter';
import { hasSavedGame } from '../utils/saveUtils';
import { MetalFrame } from '../components/UI/MetalFrame';
import { useGameStore } from '../store/gameStore';

export function StartScreen() {
  const enterCharacterSelect = useGameStore((state) => state.enterCharacterSelect);
  const loadGame = useGameStore((state) => state.loadGame);
  const resetRun = useGameStore((state) => state.resetRun);
  const hasSave = hasSavedGame();

  const chapterConfig = getChapterConfig('chapter1');

  const handleContinue = () => {
    loadGame();
  };

  const handleNewGame = () => {
    resetRun();
    enterCharacterSelect();
  };

  return (
    <motion.main className="screen screen-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame eyebrow="Mathematical Tower" title="数学之巅" className="start-layout">
        <div className="start-hero">
          <p className="start-kicker">Proof is not peace.</p>
          <h3 className="start-tagline display-face">在秩序裂开之前，先选择你相信的证明方式。</h3>
          <p className="start-description prose-body">
            从六位数学家的视角攀登数学巴别塔，穿越秩序、流变、崩塌与不完备的边界。
            练习题、未解之谜、终极证明与裂缝都将在这里显形。
          </p>
        </div>
        <div className="start-actions">
          {hasSave ? (
            <>
              <button className="primary-button start-button" onClick={handleContinue}>继续证明</button>
              <button className="secondary-button start-button" onClick={handleNewGame}>重新推导</button>
            </>
          ) : (
            <button className="primary-button start-button" onClick={() => enterCharacterSelect()}>开始证明</button>
          )}
        </div>
      </MetalFrame>
    </motion.main>
  );
}
