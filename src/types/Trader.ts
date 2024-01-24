import type { IconName } from '@/components/Icon';

import { Timestamp } from 'firebase/firestore';

export const traders = [
  'Gregório H.',
  'Marcelo G.',
  'Tanaka Y.',
  'Brandon S.',
  'Anisha A.',
] as const;

export type TraderName = (typeof traders)[number];

export type Trade = {
  performedAt: Timestamp | Date;
  active: string;
  direction: 'call' | 'put';
  duration: number;
  win: boolean | null;
};

export type Trader = {
  id: string;
  name: TraderName;
  trades: Trade[];
  gales: number;
  openAt: string;
  closedAt: string;
};

export const flags: Record<TraderName, IconName> = {
  'Gregório H.': 'brazil',
  'Marcelo G.': 'brazil',
  'Tanaka Y.': 'japan',
  'Brandon S.': 'brazil',
  'Anisha A.': 'arab',
};
