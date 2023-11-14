'use client';

import { useRouter } from 'next/navigation';

import React, { createContext, useEffect, useState } from 'react';

import { Login, Logout } from '@/database/admin/functions/auth';

import * as auth from '@/database/client/functions/auth';
import * as rest from '@/database/client/functions/rest';

import { Timestamp } from 'firebase/firestore';

import type { License, User } from '@/types/User';

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  email: string;
  password: string;
}

export interface AuthContextModel {
  user: User | null;

  signIn: (props: SignInProps) => Promise<auth.AuthResponse>;
  signUp: (props: SignUpProps) => Promise<auth.AuthResponse>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextModel>(
  {} as AuthContextModel
);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  console.log({ user });

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        return;
      }

      return rest.getUserOnSnapshot(user.uid, setUser);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;

      if (user) {
        await user.getIdToken(true);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const router = useRouter();

  async function signIn({
    email,
    password,
  }: SignInProps): Promise<auth.AuthResponse> {
    const result = await auth.signIn(email, password);

    if (!result.success) {
      return result;
    }

    const doc = await rest.getUser(result.user.uid);

    if (!doc) {
      await auth.signOut();

      return {
        success: false,
        error: 'auth/user-not-found',
      };
    }

    if (doc.licensedUntil.toDate() < new Date()) {
      await auth.signOut();

      return {
        success: false,
        error: 'auth/user-not-licensed',
      };
    }

    const token = await result.user.getIdToken();

    await Login(token);

    router.replace('/dashboard');

    return result;
  }

  async function signUp({
    email,
    password,
  }: SignUpProps): Promise<auth.AuthResponse> {
    let license = await rest.getLicense(email);

    if (!license) {
      await auth.signOut();

      return {
        success: false,
        error: 'auth/user-not-licensed',
      };
    }

    if (license.licensedUntil.toDate() < new Date()) {
      await auth.signOut();

      return {
        success: false,
        error: 'auth/user-not-licensed',
      };
    }

    const result = await auth.signUp(email, password);

    if (!result.success) {
      return result;
    }

    await rest.deleteLicense(license.id);

    await rest.createUser({
      id: result.user.uid,
      createdAt: Timestamp.now(),
      email: license.email,
      licensedUntil: license.licensedUntil,
      transacted: 0,
      traders: ['Brandon S.', 'Anisha A.'],
      broker: null,
      status: 'Bot desligado',
      isActive: false,
      realBalance: null,
      demoBalance: null,
      config: null,
      operations: [],
      balanceTrack: [],
    });

    const token = await result.user.getIdToken();

    await Login(token);

    router.replace('/dashboard');

    return result;
  }

  async function signOut(): Promise<void> {
    await auth.signOut();
    await Logout();

    router.replace('/auth/login');
  }

  const values: AuthContextModel = {
    user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
