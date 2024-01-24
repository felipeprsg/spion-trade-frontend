import React from 'react';

import { VStack, Text, Heading } from '@chakra-ui/react';

interface MetricCardProps {
  title: string;
  children: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, children }) => {
  return (
    <VStack
      w="100%"
      p={6}
      spacing={2}
      align={['center', 'start', 'start', 'start']}
      bgColor="#070707"
      rounded="2xl"
    >
      <Text fontWeight="500">{title}</Text>

      <Heading color="white" fontSize="xl" fontWeight="600">
        {children}
      </Heading>
    </VStack>
  );
};
