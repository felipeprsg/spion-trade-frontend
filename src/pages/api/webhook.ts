import type { NextApiRequest, NextApiResponse } from 'next';

import {
  deleteUser,
  createLicense,
  getUserByEmail,
  updateUser,
  deleteLicense,
  getLicense,
} from '@/database/client/functions/rest';

import { Timestamp } from 'firebase/firestore';

function getFutureTimestamp(days: number): Timestamp {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);

  return Timestamp.fromDate(currentDate);
}

const LICENSE_DAYS = 35;

async function handleSubscribe(email: string): Promise<void> {
  const user = await getUserByEmail(email);

  const licensedUntil = getFutureTimestamp(LICENSE_DAYS);

  if (!!user) {
    await updateUser(user.id, {
      licensedUntil,
    });

    return;
  }

  await createLicense({
    email,
    licensedUntil,
  });
}

async function handleUnsubscribe(email: string): Promise<void> {
  const user = await getUserByEmail(email);

  if (!!user) {
    await deleteUser(user.id);
  }

  const license = await getLicense(email);

  if (!!license) {
    await deleteLicense(license.id);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { 'comprador[email]': email, 'tipoEvento[codigo]': eventCode } =
    req.body;

  if (eventCode === '101') {
    // Assinatura - Ativa
    await handleSubscribe(email);

    return res
      .status(200)
      .json({ created: true, message: 'User Created Successfully' });
  }

  if (eventCode === '103') {
    // assinatura concelada
    await handleUnsubscribe(email);
  }

  return res
    .status(200)
    .json({ created: false, message: 'Event Desconsidered' });
}
