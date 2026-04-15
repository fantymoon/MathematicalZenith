import { motion } from 'framer-motion';
import { getChapterConfig } from '../types/chapter';
import { useGameStore } from '../store/gameStore';
import { MetalFrame } from '../components/UI/MetalFrame';
import type { ChapterId } from '../types/game';

const chapterOrder: ChapterId[] = ['chapter1', 'chapter2', 'chapter3', 'chapter4'];

const chapterCompleteTexts: Record<ChapterId, string> = {
  chapter1: '你击败了希帕索斯，也承认了秩序之中那一道不可抹平的裂缝。数学大厦并未倒塌，它只是第一次意识到：并非所有真理都愿意保持整数的样子。',
  chapter2: '你在流变的海洋中驾驭了无穷小的力量。变化不再是可怕的未知，而是可以被描述、被计算的动态过程。',
  chapter3: '你穿越了悖论的高塔，见证了非欧几何、群论与集合论如何重构数学的边界。经典的世界观崩塌了，但更广阔的结构正在显现。',
  chapter4: '你抵达了不完备的边界。哥德尔的微笑告诉你：系统越强大，越必须面对自身表达能力的局限。这是数学的终极真理。',
};

export function VictoryScreen() {
  const player = useGameStore((state) => state.player);
  const run = useGameStore((state) => state.run);
  const resetRun = useGameStore((state) => state.resetRun);
  const goBack = useGameStore((state) => state.goBack);
  const enterCharacterSelect = useGameStore((state) => state.enterCharacterSelect);
  const enterNextChapter = useGameStore((state) => state.enterNextChapter);
  const calculateChapterReward = useGameStore((state) => state.calculateChapterReward);

  if (!player) return null;

  const chapterConfig = getChapterConfig(run.currentChapterId);
  const currentIndex = chapterOrder.indexOf(run.currentChapterId);
  const hasNextChapter = currentIndex < chapterOrder.length - 1;
  const nextChapterId = hasNextChapter ? chapterOrder[currentIndex + 1] : null;
  const nextChapterConfig = nextChapterId ? getChapterConfig(nextChapterId) : null;

  const reward = calculateChapterReward();

  return (
    <motion.main className="screen screen-victory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame
        eyebrow="Chapter Clear"
        title={`${chapterConfig.title} 已完成`}
        className="victory-layout"
        headerAction={<button className="secondary-button back-button" onClick={goBack}>返回</button>}
      >
        <p className="victory-description">
          {chapterCompleteTexts[run.currentChapterId]}
        </p>

        <div className="victory-stats">
          <span>剩余声誉：{player.hp}</span>
          <span>公理点：{player.gold}</span>
          <span>命题库规模：{player.deck.length}</span>
          <span>定理点：{player.theoremPoints}</span>
        </div>

        <div className="chapter-reward-preview">
          <h3>章节完成奖励（可继承至下一章）</h3>
          <div className="reward-items">
            <div className="reward-item">
              <span className="reward-label">定理点</span>
              <span className="reward-value">+{reward.theoremPoints}</span>
            </div>
            {reward.inheritedCards.length > 0 && (
              <div className="reward-item">
                <span className="reward-label">继承卡牌</span>
                <span className="reward-value">{reward.inheritedCards.length} 张</span>
              </div>
            )}
            {reward.inheritedRelics.length > 0 && (
              <div className="reward-item">
                <span className="reward-label">继承遗物</span>
                <span className="reward-value">{reward.inheritedRelics.length} 个</span>
              </div>
            )}
          </div>
        </div>

        {hasNextChapter && nextChapterConfig && (
          <div className="next-chapter-preview">
            <h3>下一章预览</h3>
            <div className="next-chapter-info">
              <span className="next-chapter-title">{nextChapterConfig.title}</span>
              <span className="next-chapter-subtitle">{nextChapterConfig.subtitle}</span>
            </div>
          </div>
        )}

        <div className="victory-actions">
          {hasNextChapter && (
            <button className="primary-button next-chapter-button" onClick={enterNextChapter}>
              进入下一章
            </button>
          )}
          <button className="secondary-button" onClick={() => enterCharacterSelect(run.currentChapterId)}>
            重新选择角色
          </button>
          <button className="secondary-button" onClick={resetRun}>
            返回主菜单
          </button>
        </div>
      </MetalFrame>
    </motion.main>
  );
}
