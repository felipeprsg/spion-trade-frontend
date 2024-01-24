'use server';

import { db } from '..';

import { isToday, subDays } from 'date-fns';

import { Timestamp } from 'firebase-admin/firestore';

import { getSystemPublic, getTraders } from './system';

import type { User } from '@/types/User';

const query = db.collection('users');

export async function accountUsers(): Promise<number> {
  const snapshot = await query.get();
  return snapshot.size;
}

export async function accountCPAUsers(): Promise<number> {
  const timestamp = Timestamp.fromDate(subDays(new Date(), 12));

  const snapshot = await query.where('createdAt', '>=', timestamp).get();

  return snapshot.size;
}

export async function accountCPAReachedUsers(): Promise<number> {
  const timestamp = Timestamp.fromDate(subDays(new Date(), 12));

  const snapshot = await query.where('createdAt', '>=', timestamp).get();

  const docs = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as User)
  );

  const CPAReachedUsers = docs.filter((doc) => doc.transacted >= 500);

  return CPAReachedUsers.length;
}

export async function accountTradesToday(): Promise<number> {
  const traders = await getTraders();

  const tradesToday = traders.reduce((acc, trader) => {
    const trades = trader.trades.filter((trade) => {
      return isToday((trade.performedAt as Timestamp).toDate());
    });

    return acc + trades.length;
  }, 0);

  return tradesToday;
}

export async function INFO() {
  const [system, users, CPAUsers, CPAReachedUsers, tradesToday] =
    await Promise.all([
      await getSystemPublic(),
      await accountUsers(),
      await accountCPAUsers(),
      await accountCPAReachedUsers(),
      await accountTradesToday(),
    ]);

  return { system, users, CPAUsers, CPAReachedUsers, tradesToday };
}
