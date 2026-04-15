import { motion, AnimatePresence } from 'framer-motion';
import { getCard } from '../data/cards';
import { getCharacter } from '../data/characters';
import { HandPanel } from '../components/Battle/HandPanel';
import { EnemyPanel } from '../components/Battle/EnemyPanel';
import { MetalFrame } from '../components/UI/MetalFrame';
import { StatCounter } from '../components/UI/StatCounter';
import { PowerDisplay } from '../components/UI/PowerDisplay';
import { RelicDisplay } from '../components/UI/RelicDisplay';
import { CardEffect } from '../components/Animations/CardEffect';
import { useGameStore } from '../store/gameStore';
import { nextEnemyIntent } from '../systems/battleResolver';
import { useEffect, useRef, useState } from 'react';
import type { CardCategory } from '../types/game';

export function BattleScreen() {
  const player = useGameStore((state) => state.player);
  const battle = useGameStore((state) => state.battle);
  const playCardById = useGameStore((state) => state.playCardById);
  const resolveSelection = useGameStore((state) => state.resolveSelection);
  const endTurn = useGameStore((state) => state.endTurn);
  const claimBattleReward = useGameStore((state) => state.claimBattleReward);
  const goBack = useGameStore((state) => state.goBack);
  const openLore = useGameStore((state) => state.openLore);
  const [selected, setSelected] = useState<string[]>([]);
  const [impactCardId, setImpactCardId] = useState<string | undefined>(undefined);
  const [impactCardType, setImpactCardType] = useState<CardCategory | undefined>(undefined);
  const [launchingCardId, setLaunchingCardId] = useState<string | undefined>(undefined);
  const [damagePop, setDamagePop] = useState<number | undefined>(undefined);
  const [enemyHitKey, setEnemyHitKey] = useState(0);
  const [playerHitAmount, setPlayerHitAmount] = useState<number | undefined>(undefined);
  const [playerHitKey, setPlayerHitKey] = useState(0);
  const [trajectoryKey, setTrajectoryKey] = useState(0);
  const lastEnemyHpRef = useRef<number | undefined>(undefined);
  const lastPlayerHpRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!battle?.lastPlayedCardId) return;
    const card = getCard(battle.lastPlayedCardId);
    setImpactCardId(battle.lastPlayedCardId);
    setImpactCardType(card.type);
    setTrajectoryKey((value) => value + 1);
    const timer = window.setTimeout(() => {
      setImpactCardId(undefined);
      setImpactCardType(undefined);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [battle?.lastPlayedCardId]);

  useEffect(() => {
    if (!battle) return;
    const previousHp = lastEnemyHpRef.current;
    if (typeof previousHp === 'number' && battle.enemy.hp < previousHp) {
      setDamagePop(previousHp - battle.enemy.hp);
      setEnemyHitKey((value) => value + 1);
      const timer = window.setTimeout(() => setDamagePop(undefined), 520);
      lastEnemyHpRef.current = battle.enemy.hp;
      return () => window.clearTimeout(timer);
    }
    lastEnemyHpRef.current = battle.enemy.hp;
  }, [battle?.enemy.hp, battle]);

  useEffect(() => {
    if (!player) return;
    const previousHp = lastPlayerHpRef.current;
    if (typeof previousHp === 'number' && player.hp < previousHp) {
      setPlayerHitAmount(previousHp - player.hp);
      setPlayerHitKey((value) => value + 1);
      const timer = window.setTimeout(() => setPlayerHitAmount(undefined), 560);
      lastPlayerHpRef.current = player.hp;
      return () => window.clearTimeout(timer);
    }
    lastPlayerHpRef.current = player.hp;
  }, [player?.hp, player]);

  if (!player || !battle) return null;
  const character = getCharacter(player.characterId);
  const pending = battle.pendingSelection;
  const won = battle.enemy.hp <= 0;

  const handleCardClick = (uuid: string) => {
    if (won) return;
    if (pending) {
      setSelected((current) =>
        current.includes(uuid) ? current.filter((item) => item !== uuid) : [...current, uuid].slice(0, 2),
      );
      return;
    }
    setLaunchingCardId(uuid);
    window.setTimeout(() => setLaunchingCardId((current) => (current === uuid ? undefined : current)), 360);
    playCardById(uuid);
  };

  const handleInspectCard = (uuid: string) => {
    const card = player.hand.find((item) => item.uuid === uuid);
    if (!card) return;
    const def = getCard(card.defId);
    if (!def.lore) return;
    openLore({
      type: 'card',
      name: def.name,
      subtitle: def.description,
      lore: def.lore,
    });
  };

  const confirmSelection = () => {
    resolveSelection(selected);
    setSelected([]);
  };

  return (
    <motion.main className={`screen screen-battle ${battle.enemy.boss ? 'boss-glitch' : ''} ${playerHitAmount ? 'player-hit' : ''}`.trim()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <MetalFrame eyebrow={battle.enemy.boss ? '终极证明' : '练习题'} title={`${character.name} vs ${battle.enemy.name}`} className="battle-layout" headerAction={<button className="secondary-button back-button" onClick={goBack}>返回</button>}>
        <AnimatePresence>
          {impactCardId && (
            <motion.div
              key={impactCardId}
              className="battle-impact-overlay"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.22 }}
            >
              <div className="battle-impact-flash" />
              <div className="battle-impact-runes">{impactCardId.split('-').join(' · ')}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {trajectoryKey > 0 && impactCardId && impactCardType && (
            <CardEffect
              key={`card-effect-${trajectoryKey}`}
              cardType={impactCardType}
              isActive={true}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {playerHitAmount && (
            <motion.div
              key={`player-hit-${playerHitKey}`}
              className="player-hit-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div className="player-hit-vignette" />
              <motion.div
                className="player-hit-pop"
                initial={{ opacity: 0, y: 18, scale: 0.86 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.08 }}
                transition={{ duration: 0.34 }}
              >
                -{playerHitAmount}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="battle-topbar">
          <div className={`topbar-stats ${playerHitAmount ? 'player-hit-stats' : ''}`.trim()}>
            <StatCounter label="声誉" value={player.hp} max={player.maxHp} accent="red" />
            <StatCounter label="思考时间" value={player.energy} max={player.maxEnergy} accent="gold" />
            <StatCounter label="逻辑防御" value={player.block} accent="blue" />
            <StatCounter label="论证力度" value={player.strength} accent="green" />
          </div>
          <div className="battle-status">
            <p>{character.passiveName}</p>
            <small>{character.passiveDescription}</small>
            <small>敌方意图：{nextEnemyIntent(battle.enemy).intent.detail}</small>
          </div>
          <RelicDisplay relicIds={player.relics} />
        </div>

        <PowerDisplay powers={player.powers} />

        <div className="battle-board">
          <EnemyPanel enemy={battle.enemy} hitKey={enemyHitKey} damagePop={damagePop} onInspect={openLore} />
          <div className="battle-log">
            <h4>证明记录</h4>
            {battle.log.map((entry, index) => (
              <p key={`${entry}-${index}`} className={index === 0 ? 'log-entry current' : 'log-entry'}>{entry}</p>
            ))}
          </div>
        </div>

        {pending && (
          <div className="selection-bar">
            <span>
              {pending.mode === 'combine-2'
                ? '请选择 2 张不同类别手牌进行合成'
                : pending.mode === 'discard-2'
                  ? '请选择 2 张牌弃置'
                  : '请选择 1 张牌弃置'}
            </span>
            <button onClick={confirmSelection}>确认选择</button>
          </div>
        )}

        {!won ? (
          <>
            <HandPanel cards={player.hand} selected={selected} launchingCardId={launchingCardId} disabled={false} onCardClick={handleCardClick} onInspectCard={handleInspectCard} />
            <div className="battle-actions">
              <button className="primary-button" onClick={endTurn} disabled={Boolean(pending)}>结束回合</button>
            </div>
          </>
        ) : (
          <div className="reward-panel">
            <h3>{battle.enemy.boss ? '终极证明完成' : '练习题解决'}</h3>
            <p>选择一张奖励卡加入牌组，或直接继续。</p>
            <div className="reward-grid">
              {battle.rewardCardChoices.map((cardId) => {
                const card = getCard(cardId);
                return (
                  <button key={cardId} className="reward-card" onClick={() => claimBattleReward(cardId)}>
                    <strong>{card.name}</strong>
                    <span>{card.description}</span>
                  </button>
                );
              })}
            </div>
            <button className="secondary-button" onClick={() => claimBattleReward()}>跳过奖励</button>
          </div>
        )}
      </MetalFrame>
    </motion.main>
  );
}
