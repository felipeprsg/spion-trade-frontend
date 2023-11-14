import * as admin from 'firebase-admin';

import { env } from '@/config/env';

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
