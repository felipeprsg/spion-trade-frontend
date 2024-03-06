import * as admin from 'firebase-admin';

import { z } from 'zod';

import { config } from 'dotenv';

config();

const schema = z.object({
  // Node
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production')])
    .optional()
    .default('development'),

  // Firebase

  // - Admin
  FIREBASE_ADMIN_PROJECT_ID: z.string().optional(),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string().optional(),

  // - Client
  NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY: z.string(),
  NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGING_SENDER_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_CLIENT_APP_ID: z.string(),

  // Server
  NEXT_PUBLIC_SERVER_URL: z.string(),
});

export const env = schema.parse({
  NODE_ENV: process.env.NODE_ENV,
  FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY:
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_CLIENT_APP_ID:
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APP_ID,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: env.FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: `https://${env.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
  });
}

const auth = admin.auth();

const db = admin.firestore();

export { admin, auth, db };

async function main() {
  const { users } = await auth.listUsers();

  console.log({ users: users.length });

  const promises = users.map((user) => auth.deleteUser(user.uid));

  await Promise.all(promises);

  return 'done';
}

main().then(console.log);
