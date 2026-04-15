import { motion } from 'framer-motion';
import { getCard } from '../data/cards';
import { MetalFrame } from '../components/UI/MetalFrame';
import { StatCounter } from '../components/UI/StatCounter';
import { useGameStore } from '../store/gameStore';

export function ShopScreen() {
  const player = useGameStore((state) => state.player);
  const run = useGameStore((state) => state.run);
  const chooseShopCard = useGameStore((state) => state.chooseShopCard);
  const goBack = useGameStore((state) => state.goBack);

  if (!player) return null;

  return (
    <motion.main className="screen screen-shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame eyebrow="工具交换所" title="在秩序中购入更锋利的证明" className="shop-layout" headerAction={<button className="secondary-button back-button" onClick={goBack}>返回</button>}>
        <div className="topbar-stats compact">
          <StatCounter label="公点" value={player.gold} accent="gold" />
        </div>
        <div className="shop-grid">
          {run.pendingShopCards.map((cardId) => {
            const card = getCard(cardId);
            const cost = cardId === 'fifth-postulate' ? 24 : 18;
            return (
              <button key={cardId} className="shop-card" onClick={() => chooseShopCard(cardId)}>
                <span className="shop-cost">{cost} 公点</span>
                <h3>{card.name}</h3>
                <p>{card.description}</p>
              </button>
            );
          })}
        </div>
      </MetalFrame>
    </motion.main>
  );
}
