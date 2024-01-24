'use server';

import { auth, db } from '..';

import { Timestamp } from 'firebase-admin/firestore';

import type { Trader } from '@/types/Trader';
import type { License } from '@/types/User';

interface SystemPublic {
  message: string;
  admin: string;
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

export async function getTraders(): Promise<Trader[]> {
  const query = db.collection('traders');

  const snapshot = await query.get();

  const traders = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Trader)
  );

  return traders;
}

export async function addUser(license: Omit<License, 'id'>): Promise<void> {
  const licenseSnapshot = await db
    .collection('licenses')
    .where('email', '==', license.email)
    .get();

  if (!licenseSnapshot.empty) {
    return;
  }

  const userSnapshot = await db
    .collection('users')
    .where('email', '==', license.email)
    .get();

  if (!userSnapshot.empty) {
    return;
  }

  await db.collection('licenses').add({
    email: license.email,
    licensedUntil: Timestamp.fromDate(license.licensedUntil as Date),
  });
}

export async function sendResetPasswordEmail(email: string): Promise<void> {
  await auth.generatePasswordResetLink(email);
}

export async function updateLicense(uid: string, date: Date): Promise<void> {
  const query = db.collection('users').doc(uid);

  await query.update({
    licensedUntil: Timestamp.fromDate(date),
  });
}

export async function deleteUser(uid: string): Promise<void> {
  await auth.deleteUser(uid);
  await db.collection('users').doc(uid).delete();
}
