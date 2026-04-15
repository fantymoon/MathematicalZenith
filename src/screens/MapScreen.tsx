import { motion } from 'framer-motion';
import { getChapterConfig } from '../types/chapter';
import { getCharacter } from '../data/characters';
import { MetalFrame } from '../components/UI/MetalFrame';
import { StatCounter } from '../components/UI/StatCounter';
import { MapNodeView } from '../components/Map/MapNode';
import { useGameStore } from '../store/gameStore';

export function MapScreen() {
  const player = useGameStore((state) => state.player);
  const run = useGameStore((state) => state.run);
  const enterCurrentNode = useGameStore((state) => state.enterCurrentNode);
  const openLore = useGameStore((state) => state.openLore);
  const goBack = useGameStore((state) => state.goBack);

  if (!player) return null;
  const character = getCharacter(player.characterId);
  const chapterConfig = getChapterConfig('chapter1');

  return (
    <motion.main className="screen screen-map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame eyebrow="数学巴别塔" title={`第一章：${chapterConfig.title}`} className="map-layout" headerAction={<button className="secondary-button back-button" onClick={goBack}>返回</button>}>
        <div className="map-atmosphere" aria-hidden="true">
          <span className="map-orbit orbit-a" />
          <span className="map-orbit orbit-b" />
          <span className="map-grid-bloom" />
        </div>
        <div className="topbar">
          <div className="map-hero">
            <div className="map-portrait" aria-hidden="true">
              <span className="character-portrait-ring" />
              <span className="character-portrait-label">{character.portraitLabel}</span>
              <span className="character-portrait-accent">{character.portraitAccent}</span>
            </div>
            <div>
              <p className="panel-eyebrow">当前角色</p>
              <h3>{character.name}</h3>
              <p>{character.passiveDescription}</p>
              {character.lore && (
                <button
                  type="button"
                  className="secondary-button map-lore-button"
                  onClick={() => {
                    if (!character.lore) return;
                    openLore({
                      type: 'character',
                      name: character.name,
                      subtitle: character.passiveDescription,
                      lore: character.lore,
                    });
                  }}
                >
                  数学说明
                </button>
              )}
            </div>
          </div>
          <div className="topbar-stats">
            <StatCounter label="声誉" value={player.hp} max={player.maxHp} accent="red" />
            <StatCounter label="公理点" value={player.gold} accent="gold" />
            <StatCounter label="定理" value={player.theoremPoints} accent="blue" />
          </div>
        </div>

        {run.lastMessage && <motion.div className="message-bar" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>{run.lastMessage}</motion.div>}

        <motion.div className="map-lane" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34, delay: 0.08 }}>
          {run.map.map((node, index) => (
            <MapNodeView
              key={node.id}
              node={node}
              active={index === run.currentNodeIndex}
              onClick={() => index === run.currentNodeIndex && enterCurrentNode()}
            />
          ))}
        </motion.div>
      </MetalFrame>
    </motion.main>
  );
}
