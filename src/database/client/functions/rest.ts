import { db } from '..';

import * as firestore from 'firebase/firestore';

import type { License, User } from '@/types/User';

// CREATE
export const createDocument = async (
  data: Record<string, unknown>,
  col: string,
  id?: string
): Promise<firestore.DocumentReference> => {
  if (id) {
    const ref = firestore.doc(db, col, id);
    await firestore.setDoc(ref, data);
    return ref;
  }

  const ref = firestore.collection(db, col);
  return await firestore.addDoc(ref, data);
};

export const createUser = async (user: User): Promise<void> => {
  const { id, ...data } = user;
  await createDocument(data, 'users', id);
};

export const createLicense = async (
  license: Omit<License, 'id'>
): Promise<void> => {
  await createDocument(license, 'licenses');
};

// READ
export const getDocument = async <T>(
  col: string,
  id: string
): Promise<T | null> => {
  const ref = firestore.doc(db, col, id);
  const snapshot = await firestore.getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as T;
};

export const getDocumentsWhere = async <T>(
  field: string,
  opStr: firestore.WhereFilterOp,
  value: unknown,
  path: string,
  ...pathSegments: string[]
): Promise<T[]> => {
  const query = firestore.query(
    firestore.collection(db, path, ...pathSegments),
    firestore.where(field, opStr, value)
  );

  const snapshot = await firestore.getDocs(query);

  if (snapshot.empty) {
    return [];
  }

  const docs: T[] = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as T)
  );

  return docs;
};

export const getDocumentOnSnapshot = (
  col: string,
  id: string,
  callback: (snapshot: firestore.DocumentSnapshot) => unknown
): firestore.Unsubscribe => {
  const ref = firestore.doc(db, col, id);
  return firestore.onSnapshot(ref, callback);
};

export const getLicense = async (email: string): Promise<License | null> => {
  const licenses = await getDocumentsWhere<License>(
    'email',
    '==',
    email,
    'licenses'
  );

  if (!licenses.length) {
    return null;
  }

  return licenses[0];
};

export const getUser = async (uid: string): Promise<User | null> => {
  return await getDocument<User>('users', uid);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const docs = await getDocumentsWhere<User>('email', '==', email, 'users');

  if (!docs.length) {
    return null;
  }

  return docs[0];
};

export const getUserOnSnapshot = (
  userId: string,
  callback: (user: User) => void
): firestore.Unsubscribe => {
  return getDocumentOnSnapshot('users', userId, (snapshot) =>
    callback({ id: snapshot.id, ...snapshot.data() } as User)
  );
};

// UPDATE
export const updateDocument = async (
  col: string,
  id: string,
  data: Record<string, any>
) => {
  const ref = firestore.doc(db, col, id);
  return await firestore.updateDoc(ref, data);
};

export const updateUser = async (
  uid: string,
  user: Partial<User>
): Promise<void> => {
  return await updateDocument('users', uid, user);
};

// DELETE
export const deleteDocument = async (
  col: string,
  id: string
): Promise<void> => {
  const ref = firestore.doc(db, col, id);
  await firestore.deleteDoc(ref);
};

export const deleteLicense = async (id: string): Promise<void> => {
  return await deleteDocument('licenses', id);
};

export const deleteUser = async (uid: string) => {
  return await deleteDocument('users', uid);
};
