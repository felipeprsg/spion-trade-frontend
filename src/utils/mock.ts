import { Timestamp } from 'firebase/firestore';

import { User } from '@/types/User';

export const mockUser: User = {
  id: '123123',
  createdAt: Timestamp.now(),
  email: 'felipe@gmail.com',
  transacted: 10,
  licensedUntil: Timestamp.now(),
  traders: [],
  broker: null,
  status: 'Bot ativado',
  isActive: true,
  realBalance: 101231,
  demoBalance: 100,
  config: null,
  operations: [],
  balanceTrack: [],
};
