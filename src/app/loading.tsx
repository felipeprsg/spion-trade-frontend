import { VStack, Image, HStack, Heading } from '@chakra-ui/react';

export default function Loading() {
  return (
    <VStack
      w="100%"
      h="100%"
      minH="100vh"
      align="center"
      justify="center"
      bgColor="gray.500"
    >
      <HStack w="fit-content" h="100%" justify="start" spacing={3}>
        <Image alt="Logo" src="/images/logo.png" w="35" h="35" />

        <Heading fontSize="xs" fontWeight="600" display={['none', 'flex']}>
          Spion Trade
        </Heading>
      </HStack>
    </VStack>
  );
}
