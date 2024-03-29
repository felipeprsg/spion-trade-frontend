'use client';

import React from 'react';

import {
  HStack,
  Heading,
  VStack,
  Text,
  Circle,
  Box,
  Image,
} from '@chakra-ui/react';

import { useAuth } from '@/app/hooks/useAuth';

import { formatCurrency } from '@/utils/format';

import type { Operation } from '@/types/User';

const ShadowOperation: React.FC = () => {
  return (
    <HStack
      w="100%"
      align="center"
      justify="space-between"
      pb={3}
      borderBottom="solid 1px"
      borderColor="gray.500"
      _last={{
        pb: 0,
        border: 'none',
      }}
    >
      <HStack spacing={4} align="center">
        <Circle size="38px" bgColor="gray.500" />

        <VStack align="start">
          <Box w="100px" h="11px" bgColor="gray.500" rounded="full" />
          <Box w="76px" h="11px" bgColor="gray.500" rounded="full" />
        </VStack>
      </HStack>

      <VStack align="end">
        <Box w="86px" h="11px" bgColor="gray.500" rounded="full" />
        <Box w="63px" h="11px" bgColor="gray.500" rounded="full" />
      </VStack>
    </HStack>
  );
};

interface OperationCardProps {
  operation: Operation;
}

const OperationCard: React.FC<OperationCardProps> = ({ operation }) => {
  const victory = operation.win !== false;

  return (
    <HStack
      w="100%"
      align="center"
      justify="space-between"
      pb={3}
      borderBottom="solid 1px"
      borderColor="gray.500"
      _last={{
        pb: 0,
        border: 'none',
      }}
    >
      <HStack spacing={4} align="center">
        <Image alt="" src={victory ? '/images/win.png' : '/images/loss.png'} />

        <VStack spacing={0} align="center">
          <Heading color="white" fontSize="xs" fontWeight="500">
            {operation.active}
          </Heading>
        </VStack>
      </HStack>

      <VStack spacing={0} align="end">
        <Heading
          color={victory ? 'green' : 'red'}
          fontSize="xs"
          fontWeight="500"
        >
          {formatCurrency(operation.profit)}
        </Heading>

        <Text fontSize="10px" textAlign="end">
          {formatCurrency(operation.entry)}
        </Text>
      </VStack>
    </HStack>
  );
};

export const Operations: React.FC = () => {
  const { user } = useAuth();

  return (
    <VStack
      w="100%"
      minH="30rem"
      p={8}
      pb={4}
      spacing={8}
      align="start"
      bgColor="gray.500"
      borderRadius="12px"
      borderBottomRadius={['12px', '12px', 'none']}
    >
      <Heading fontSize="md" fontWeight="500">
        Transações
      </Heading>

      <VStack w="100%" p={0} spacing={3}>
        {!!user?.broker &&
          [...(user?.operations || [])]
            .reverse()
            .slice(0, 10)
            .map((operation, index) => {
              return <OperationCard key={index} operation={operation} />;
            })}
      </VStack>

      <VStack w="100%" p={0} spacing={3}>
        {!user?.broker &&
          new Array(6).fill(null).map((_, index) => {
            return <ShadowOperation key={index} />;
          })}
      </VStack>
    </VStack>
  );
};
