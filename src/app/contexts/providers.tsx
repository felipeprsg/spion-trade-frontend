'use client';

import { CacheProvider } from '@chakra-ui/next-js';

import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from './AuthProvider';

import { theme } from '@/styles/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
