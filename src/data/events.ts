import type { EventDef } from '../types/game';
import { chapter1Events } from './events/chapter1';
import { chapter2Events } from './events/chapter2';
import { chapter3Events } from './events/chapter3';
import { chapter4Events } from './events/chapter4';

export const events: EventDef[] = [
  ...chapter1Events,
  ...chapter2Events,
  ...chapter3Events,
  ...chapter4Events,
];

export function getEvent(id: string) {
  return events.find((event) => event.id === id)!;
}
