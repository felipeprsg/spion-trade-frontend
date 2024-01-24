import { Timestamp } from 'firebase/firestore';

import { TraderName } from './Trader';

export type License = {
  id: string;
  email: string;
  licensedUntil: Timestamp | Date;
};

export type Operation = {
  active: string;
  entry: number;
  profit: number;
  time: string;
  win: boolean | null;
};

export type BalanceTrack = {
  balance: number;
  time: string;
};

export type User = {
  id: string;
  createdAt: Timestamp | Date;

  email: string;
  transacted: number;

  licensedUntil: Timestamp | Date;

  traders: TraderName[];

  broker: {
    email: string;
    password: string;
    ssid: string;
  } | null;

  status: string;

  isActive: boolean;

  realBalance: number | null;
  demoBalance: number | null;

  config: {
    mode: 'real' | 'demo';

    trader: string;

    entry: number;

    gales: number;
    galeMultiplier: number;

    stopWin: number;
    stopLoss: number;

    broker: 'iqoption' | 'dayprofit';
  } | null;

  operations: Operation[];
  balanceTrack: BalanceTrack[];
};
