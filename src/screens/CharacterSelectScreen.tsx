import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { MetalFrame } from '../components/UI/MetalFrame';
import { useGameStore } from '../store/gameStore';
import { getChapterConfig } from '../types/chapter';
import { getCharactersByChapter } from '../data/characters';
import { getCard } from '../data/cards';

export function CharacterSelectScreen() {
  const selectCharacter = useGameStore((state) => state.selectCharacter);
  const openLore = useGameStore((state) => state.openLore);
  const goBack = useGameStore((state) => state.goBack);
  const currentChapterId = useGameStore((state) => state.run.currentChapterId);
  const inheritedRewards = useGameStore((state) => state.run.inheritedRewards);

  const chapterConfig = getChapterConfig(currentChapterId);
  const filteredCharacters = getCharactersByChapter(currentChapterId);

  const handleOpenLore = (event: MouseEvent<HTMLButtonElement>, characterId: string) => {
    event.stopPropagation();
    const character = filteredCharacters.find((item) => item.id === characterId);
    if (!character?.lore) return;
    openLore({
      type: 'character',
      name: character.name,
      subtitle: character.passiveDescription,
      lore: character.lore,
    });
  };

  return (
    <motion.main className="screen screen-character-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame
        eyebrow="选择你的证明者"
        title={`${chapterConfig.title} - 角色选择`}
        className="hero-panel"
        headerAction={<button className="secondary-button back-button" onClick={goBack}>返回</button>}
      >
        <div className="hero-copy">
          <p>从{filteredCharacters.length}位数学家中选择你的视角。你选的不是皮肤，而是一种看待世界的证明方法。</p>
        </div>
        {inheritedRewards && (
          <section className="inheritance-banner">
            <div className="inheritance-panel">
              <span className="panel-eyebrow">跨章节继承</span>
              <h3>来自上一章的馈赠</h3>
              <div className="inheritance-content">
                <div className="inheritance-item">
                  <span className="inheritance-label">定理点</span>
                  <span className="inheritance-value">+{inheritedRewards.theoremPoints}</span>
                </div>
                {inheritedRewards.inheritedCards.length > 0 && (
                  <div className="inheritance-item">
                    <span className="inheritance-label">继承卡牌</span>
                    <div className="inheritance-cards">
                      {inheritedRewards.inheritedCards.map((cardId) => {
                        const card = getCard(cardId);
                        return (
                          <span key={cardId} className="inheritance-card-tag">
                            {card.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                {inheritedRewards.inheritedRelics.length > 0 && (
                  <div className="inheritance-item">
                    <span className="inheritance-label">继承遗物</span>
                    <div className="inheritance-relics">
                      {inheritedRewards.inheritedRelics.map((relicId) => (
                        <span key={relicId} className="inheritance-relic-tag">
                          {relicId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="inheritance-note">注意：角色专属卡牌不会被继承，只有通用卡牌可跨章节传承。</p>
            </div>
          </section>
        )}
        <section className="chapter-entry-banner">
          <div className="chapter-entry-panel">
            <span className="panel-eyebrow">章节入口</span>
            <h3>{chapterConfig.title}</h3>
            <p className="chapter-entry-subtitle">{chapterConfig.subtitle}</p>
            <p className="chapter-entry-history">{chapterConfig.historicalBackground}</p>
            <div className="lore-link-row">
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  openLore({
                    type: 'card',
                    name: chapterConfig.title,
                    subtitle: chapterConfig.subtitle,
                    lore: {
                      title: chapterConfig.title,
                      summary: chapterConfig.description,
                      conceptNote: '本章主题：' + chapterConfig.theme.description,
                      historyNote: chapterConfig.historicalBackground,
                      tags: ['章节背景'],
                    },
                  })
                }
              >
                查看章节背景
              </button>
            </div>
          </div>
        </section>
        <div className="character-grid">
          {filteredCharacters.map((character) => (
            <div key={character.id} className="character-card-shell">
              <button
                type="button"
                className="character-card"
                style={{ ['--character-color' as string]: character.color }}
                onClick={() => selectCharacter(character.id)}
              >
                <div className="character-portrait" aria-hidden="true">
                  <span className="character-portrait-ring" />
                  <span className="character-portrait-label">{character.portraitLabel}</span>
                  <span className="character-portrait-accent">{character.portraitAccent}</span>
                </div>
                <span className="character-title">{character.title}</span>
                <h3>{character.name}</h3>
                <p>{character.summary}</p>
                <dl>
                  <div>
                    <dt>被动</dt>
                    <dd>{character.passiveName}</dd>
                  </div>
                  <div>
                    <dt>说明</dt>
                    <dd>{character.passiveDescription}</dd>
                  </div>
                  <div>
                    <dt>风格</dt>
                    <dd>{character.playstyle}</dd>
                  </div>
                  <div>
                    <dt>声誉</dt>
                    <dd>{character.maxHp}</dd>
                  </div>
                </dl>
                <span className="enter-run">进入数学巴别塔</span>
              </button>
              {character.lore && (
                <button
                  type="button"
                  className="secondary-button character-lore-button"
                  onClick={(event) => handleOpenLore(event, character.id)}
                >
                  数学说明
                </button>
              )}
            </div>
          ))}
        </div>
      </MetalFrame>
    </motion.main>
  );
}
