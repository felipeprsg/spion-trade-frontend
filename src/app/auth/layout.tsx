import { VStack } from '@chakra-ui/react';

import { Header } from './components/Header';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <VStack
      w="100%"
      h="100%"
      minH="100vh"
      p={0}
      pb={4}
      spacing={4}
      align="start"
      justify="start"
      display="flex"
      bgColor="black"
      bgImage="/assets/blur1.png"
      bgRepeat="no-repeat"
      bgPosition={['bottom', 'bottom', 'bottom', 'bottom']}
      bgSize={['cover', 'cover', 'cover', 'cover']}
    >
      <Header />

      <VStack
        w="100%"
        h="100%"
        px={6}
        align="center"
        justify="center"
        flexGrow={1}
      >
        {children}
      </VStack>
    </VStack>
  );
}
