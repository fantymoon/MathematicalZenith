import { motion } from 'framer-motion';
import { MetalFrame } from '../components/UI/MetalFrame';
import { StatCounter } from '../components/UI/StatCounter';
import { useGameStore } from '../store/gameStore';

export function RestScreen() {
  const player = useGameStore((state) => state.player);
  const leaveRestSite = useGameStore((state) => state.leaveRestSite);
  const goBack = useGameStore((state) => state.goBack);

  if (!player) return null;

  return (
    <motion.main className="screen screen-rest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame eyebrow="公理推演" title="静下来，修复你的体系" className="rest-layout" headerAction={<button className="secondary-button back-button" onClick={goBack}>返回</button>}>
        <div className="topbar-stats compact">
          <StatCounter label="声誉" value={player.hp} max={player.maxHp} accent="red" />
        </div>
        <div className="choice-list two-columns">
          <button className="choice-card" onClick={() => leaveRestSite('heal')}>
            <strong>静修</strong>
            <span>恢复 18 点声誉，准备下一场证明。</span>
          </button>
          <button className="choice-card" onClick={() => leaveRestSite('upgrade')}>
            <strong>精炼</strong>
            <span>把一个基础命题打磨为更锋利的论证工具。</span>
          </button>
        </div>
      </MetalFrame>
    </motion.main>
  );
}
