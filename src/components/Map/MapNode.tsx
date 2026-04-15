import type { MapNode } from '../../types/game';

const icons: Record<MapNode['type'], string> = {
  battle: '△',
  event: '?',
  rest: '☕',
  shop: '⚖',
  boss: '◎',
};

interface MapNodeProps {
  node: MapNode;
  active: boolean;
  onClick: () => void;
}

export function MapNodeView({ node, active, onClick }: MapNodeProps) {
  return (
    <button className={`map-node ${active ? 'active' : ''} ${node.completed ? 'completed' : ''}`.trim()} onClick={onClick}>
      <span className="map-node-shimmer" />
      <span className="map-icon">{icons[node.type]}</span>
      <strong>{node.title}</strong>
      <small>{node.subtitle}</small>
    </button>
  );
}
