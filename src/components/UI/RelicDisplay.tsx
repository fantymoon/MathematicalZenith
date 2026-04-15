import { getRelic } from '../../data/relics';

interface RelicDisplayProps {
  relicIds: string[];
}

export function RelicDisplay({ relicIds }: RelicDisplayProps) {
  if (relicIds.length === 0) return null;

  return (
    <div className="relic-display">
      <h4 className="relic-title">遗物</h4>
      <div className="relic-list">
        {relicIds.map((relicId) => {
          const relic = getRelic(relicId);
          if (!relic) return null;
          return (
            <div key={relicId} className="relic-item" title={relic.description}>
              <span className="relic-icon">◆</span>
              <span className="relic-name">{relic.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
