'use server';

import { db } from '..';

import type { Trader } from '@/types/Trader';

interface SystemPublic {
  message: string;
}

export async function getSystemPublic(): Promise<SystemPublic | null> {
  const query = db.collection('system').doc('public');

  const snapshot = await query.get();

  if (!snapshot.exists) {
    return null;
  }

  const data = snapshot?.data() as SystemPublic;

  return data;
}

export async function getTraders(): Promise<Trader[] | null> {
  const query = db.collection('traders');

  const snapshot = await query.get();

  if (snapshot.empty) {
    return null;
  }

  const traders = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Trader)
  );

  return traders;
}
