'use client';

import React, { useMemo } from 'react';

import {
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Heading,
  Text,
  Circle,
  Stack,
} from '@chakra-ui/react';

import { Icon } from '@/components/Icon';

import { useAuth } from '@/app/hooks/useAuth';

import { formatCurrency, formatDecimal, formatPercent } from '@/utils/format';

export const Display: React.FC = () => {
  const { user } = useAuth();

  const profit = useMemo(() => {
    if (!user || !user.balanceTrack.length) {
      return null;
    }

    const track = user.balanceTrack;

    return track[track.length - 1].balance - track[0].balance;
  }, [user]);

  const Yield = useMemo(() => {
    if (!user || !user.balanceTrack.length) {
      return null;
    }

    const track = user.balanceTrack;

    return (
      (track[track.length - 1].balance - track[0].balance) / track[0].balance
    );
  }, [user]);

  const color =
    profit === null
      ? 'gray.400'
      : profit === 0
      ? 'gray.400'
      : profit > 0
      ? 'green'
      : 'red';

  return (
    <VStack mt={[2, 2, 4]} w="100%" px={[4, 4, 8]} py={0} spacing={0}>
      <Stack
        w="100%"
        spacing={4}
        align={['end', 'start']}
        justify="space-between"
        direction={['column', 'row']}
      >
        <Stack
          w={['100%', '100%', 'min']}
          spacing={4}
          align="start"
          justify="space-between"
          direction={['row', 'row', 'column']}
        >
          <Stat color="white">
            <StatLabel fontSize="md" fontWeight="500">
              Rendimento
            </StatLabel>
            <StatNumber color={color} fontSize="xs" fontWeight="600">
              {color === 'red' ? '-' : '+'}
              {formatPercent(Yield && Math.abs(Yield))}
            </StatNumber>
          </Stat>

          <Stat color="white" textAlign={['end', 'start']}>
            <StatLabel fontSize="md" fontWeight="500">
              Lucro
            </StatLabel>
            <StatNumber color={color} fontSize="xs" fontWeight="600">
              {formatCurrency(profit) || '-'}
            </StatNumber>
          </Stat>
        </Stack>

        <HStack
          w={['unset', '100%', 'unset']}
          minW="10rem"
          p={3}
          spacing={3}
          justify="start"
          bgColor="#00000080"
          rounded="10px"
          border={['solid 1px', 'solid 1px', 'solid 1px', 'none']}
          borderColor="gray.400"
        >
          <Icon name="warn" color="white" />

          <Heading fontSize="10px" fontWeight="700">
            Status do COPY
            <Text color="white" fontSize="xs">
              {user?.status || '-'}
            </Text>
          </Heading>
        </HStack>
      </Stack>

      <Circle mt={[4, 4, '-6rem']} size="11rem" bgColor="gray.500">
        <Circle size="9.5rem" bgColor="primary">
          <Circle size="7rem" bgColor="gray.500">
            <Circle size="5rem" bgColor="black" pos="relative">
              <Text
                color="white"
                fontSize="10px"
                fontWeight="500"
                textAlign="center"
                pos="absolute"
                top={5}
              >
                R$
              </Text>

              <Heading mt={2} fontSize="sm" fontWeight="600">
                {formatDecimal(user?.realBalance) || `-`}
              </Heading>
            </Circle>
          </Circle>
        </Circle>
      </Circle>
    </VStack>
  );
};
