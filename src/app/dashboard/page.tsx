import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Icon } from '@/components/Icon';

import { Header } from './components/Header';
import { Display } from './components/Display';

import { Configurations } from './components/Configurations';
import { Operations } from './components/Operations';
import { Chart } from './components/Chart';

import { getSystemPublic, getTraders } from '@/database/admin/functions/system';

export default async function Dashboard() {
  const [system, traders] = await Promise.all([
    getSystemPublic(),
    getTraders(),
  ]);

  return (
    <VStack
      w="100%"
      h="100%"
      minH="100vh"
      p={0}
      spacing={0}
      display="flex"
      bgColor="black"
      bgImage="/assets/blur2.png"
      bgRepeat={['repeat-y', 'repeat-y', 'repeat-y', 'no-repeat']}
      bgPosition="top"
      bgSize={['fit', 'fit', 'fit', 'cover']}
      overflow="hidden"
    >
      <Header message={system!.message} />

      <HStack
        w="100%"
        h={8}
        spacing={2}
        justify="center"
        borderBottomRadius="10px"
        bgColor="#070707"
        display={['flex', 'flex', 'none']}
      >
        <Icon name="check" color="green" />
        <Text color="white" fontSize="xs" fontWeight="500" textAlign="center">
          {system!.message}
        </Text>
      </HStack>

      <Display />

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
        bg="#00000080"
        flexGrow={1}
        justify="space-between"
        direction={['column', 'column', 'row']}
      >
        <Operations />
        <Chart />
        <Configurations traders={traders!} />
      </Stack>
    </VStack>
  );
}
