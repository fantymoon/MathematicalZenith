interface StatCounterProps {
  label: string;
  value: number;
  max?: number;
  accent?: 'gold' | 'green' | 'red' | 'blue';
}

export function StatCounter({ label, value, max, accent = 'gold' }: StatCounterProps) {
  return (
    <div className={`stat-counter accent-${accent}`}>
      <span className="stat-counter-glow" />
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{typeof max === 'number' ? `${value}/${max}` : value}</strong>
    </div>
  );
}
