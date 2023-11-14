import { auth } from '../..';

import * as firebaseAuth from 'firebase/auth';

import { FirebaseError } from 'firebase/app';

import { type AuthError, isAuthError } from './AuthError';

type AuthSuccess = {
  success: true;
  user: firebaseAuth.User;
};

type AuthFailure = {
  success: false;
  error: AuthError;
};

export type AuthResponse = AuthSuccess | AuthFailure;

const handleError = (err: unknown): AuthFailure => {
  console.log(err)

  if (err instanceof FirebaseError) {
    if (isAuthError(err.code)) {
      return { success: false, error: err.code };
    }
  }

  return { success: false, error: 'auth/unknown-error' };
};

export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { success: true, user: userCredential.user };
  } catch (err) {
    return handleError(err);
  }
};

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const googleProvider = new firebaseAuth.GoogleAuthProvider();

    const result = await firebaseAuth.signInWithPopup(auth, googleProvider);

    return {
      success: true,
      user: result.user,
    };
  } catch (err) {
    return handleError(err);
  }
};

export const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { success: true, user: userCredential.user };
  } catch (err) {
    return handleError(err);
  }
};

export const signOut = async (): Promise<void> => {
  await firebaseAuth.signOut(auth);
};

export const currentUser = auth.currentUser;

export const onAuthStateChanged = (
  callback: (user: firebaseAuth.User | null) => void | Promise<void>
): firebaseAuth.Unsubscribe => {
  return auth.onAuthStateChanged(callback);
};

export const onIdTokenChanged = (
  callback: (user: firebaseAuth.User | null) => unknown | Promise<unknown>
): firebaseAuth.Unsubscribe => {
  return auth.onIdTokenChanged(callback);
};
