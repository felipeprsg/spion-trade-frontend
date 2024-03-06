import { Timestamp } from 'firebase/firestore';

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

    strategy: string;

    entry: number;

    gales: number;
    galeMultiplier: number;

    stopWin: number;
    stopLoss: number;
  } | null;

  operations: Operation[];
  balanceTrack: BalanceTrack[];
};
