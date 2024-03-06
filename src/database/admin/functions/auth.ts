'use server';

import { cookies } from 'next/headers';

import * as admin from 'firebase-admin';

import { auth } from '..';

type IsAuthenticatedSuccess = {
  isAuthenticated: false;
  token: null;
};

type IsAuthenticatedFailure = {
  isAuthenticated: true;
  token: admin.auth.DecodedIdToken;
};

type IsAuthenticatedResponse = IsAuthenticatedSuccess | IsAuthenticatedFailure;

export async function isAuthenticated(): Promise<IsAuthenticatedResponse> {
  const session = cookies().get('session');

  if (!session) {
    return { isAuthenticated: false, token: null };
  }

  const decodedClaim = await auth
    .verifySessionCookie(session.value, true)
    .catch(() => null);

  if (!decodedClaim) {
    return { isAuthenticated: false, token: null };
  }

  return { isAuthenticated: true, token: decodedClaim };
}

export async function Login(authToken: string): Promise<{ success: boolean }> {
  const decodedToken = await auth.verifyIdToken(authToken).catch((err) => {
    console.error(err);
    return null;
  });

  console.log({ decodedToken });

  if (!decodedToken) {
    return { success: false };
  }

  const DAY = 60 * 60 * 24 * 1000;

  const expiresIn = 7 * DAY;

  const sessionCookie = await auth.createSessionCookie(authToken, {
    expiresIn,
  });

  const responseCookies = cookies().set({
    name: 'session',
    value: sessionCookie,
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });

  console.log({ responseCookies });

  return { success: true };
}

export async function Logout(): Promise<void> {
  cookies().delete('session');
}
