'use client';

import { useState } from 'react';

import { Stack, Text, VStack } from '@chakra-ui/react';

import { Header } from './components/Header';
import { Display } from './components/Display';

import { Configurations } from './components/Configurations';
import { Operations } from './components/Operations';
import { Chart } from './components/Chart';

interface WrapperProps {}

export function Wrapper({}: WrapperProps) {
  const [isDemo, setIsDemo] = useState(false);

  return (
    <VStack
      w="100%"
      h="100%"
      minH="100vh"
      p={0}
      spacing={0}
      display="flex"
      bgColor="black"
      bgImage="/assets/blur1.png"
      bgRepeat={['repeat-y', 'repeat-y', 'repeat-y', 'no-repeat']}
      bgPosition="top"
      bgSize={['fit', 'fit', 'fit', 'cover']}
      overflow="hidden"
    >
      <Header />

      <Display isDemo={isDemo} />

      <Text
        mt={[4, 1.5]}
        mb={[4, 3]}
        w="100%"
        px={8}
        fontSize="12px"
        textAlign={['start', 'end']}
      >
        Caso seu saldo esteja incorreto, refaça a conexão com a corretora.
      </Text>

      <Stack
        w="100%"
        pt={[4, 4, 8]}
        px={[4, 4, 8]}
        pb={[4, 4, 0]}
        spacing={[7, 7, 8]}
        borderTopRadius="30px"
        bg="#000000E5"
        flexGrow={1}
        justify="space-between"
        direction={['column-reverse', 'column-reverse', 'row']}
      >
        <Operations />
        <Chart />
        <Configurations setIsDemo={setIsDemo} />
      </Stack>
    </VStack>
  );
}
