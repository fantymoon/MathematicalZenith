import type { EnemyIntent } from '../../types/game';

interface IntentBadgeProps {
  intent: EnemyIntent;
}

export function IntentBadge({ intent }: IntentBadgeProps) {
  return (
    <div className={`intent-badge intent-${intent.type}`}>
      <span>{intent.label}</span>
      <strong>{intent.value > 0 ? intent.value : '—'}</strong>
      <small>{intent.detail}</small>
    </div>
  );
}
