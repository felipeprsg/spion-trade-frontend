import { VStack, Image, HStack, Heading } from '@chakra-ui/react';

export default function Loading() {
  return (
    <VStack
      w="100%"
      h="100%"
      minH="100vh"
      align="center"
      justify="center"
      bgColor="black"
    >
      <HStack w="fit-content" h="100%" justify="start">
        <Image alt="Logo" src="/images/logo.png" w="28px" h="28px" />

        <Heading fontSize="xs" fontWeight="600" display={['none', 'flex']}>
          E-Trader Academy
        </Heading>
      </HStack>
    </VStack>
  );
}
