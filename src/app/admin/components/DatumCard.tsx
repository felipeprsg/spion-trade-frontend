import React from 'react';

import { VStack, Heading, Text } from '@chakra-ui/react';

interface DatumCardProps {
  title: string;
  children: React.ReactNode;
}

export const DatumCard: React.FC<DatumCardProps> = ({ title, children }) => {
  return (
    <VStack
      w="100%"
      maxW={['100%', 60, 60, 60]}
      p={6}
      spacing={2}
      align={['center', 'start', 'start', 'start']}
      bgColor="#F9FAFB"
      border="solid 1px"
      borderColor="gray.200"
      borderRadius="2xl"
    >
      <Text color="black.900" fontWeight="500">
        {title}
      </Text>
      <Heading color="black.900" fontSize="xl" fontWeight="600">
        {children}
      </Heading>
    </VStack>
  );
};
