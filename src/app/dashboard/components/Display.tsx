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
  Box,
} from '@chakra-ui/react';

import { Icon } from '@/components/Icon';

import { useAuth } from '@/app/hooks/useAuth';

import { formatDecimal, formatPercent } from '@/utils/format';

interface DisplayProps {
  isDemo: boolean;
}

export const Display: React.FC<DisplayProps> = ({ isDemo }) => {
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

  const balance = useMemo(() => {
    const condition = user?.isActive ? user.config?.mode === 'demo' : isDemo;

    return condition ? user?.demoBalance : user?.realBalance;
  }, [user, isDemo]);

  const color =
    profit === null
      ? 'gray.400'
      : profit === 0
      ? 'gray.400'
      : profit > 0
      ? 'green'
      : 'red';

  return (
    <Stack
      mt={[2, 2, 4]}
      w="100%"
      px={[4, 4, 8]}
      py={0}
      spacing={4}
      align="center"
      justify="space-between"
      direction={['column', 'column', 'column', 'row']}
    >
      {/* <Stack
        w={['100%', '100%', 'fit-content']}
        spacing={4}
        align="center"
        justify="space-between"
        direction={['row', 'row', 'column']}
      >
        <Stat color="white">
          <StatLabel fontSize="md" fontWeight="500" flexShrink={0}>
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
      </Stack> */}

      <Box w="min" alignSelf={['center', 'start']}>
        <Stat color="white">
          <StatLabel fontSize="md" fontWeight="500" flexShrink={0}>
            Rendimento
          </StatLabel>
          <StatNumber
            color={color}
            fontSize="xs"
            fontWeight="600"
            textAlign="center"
          >
            {color === 'red' ? '-' : '+'}
            {formatPercent(Yield && Math.abs(Yield))}
          </StatNumber>
        </Stat>
      </Box>

      <Circle size="11rem" bgColor="gray.500">
        <Circle size="9.5rem" bgColor="primary">
          <Circle size="7rem" bgColor="gray.500">
            <Circle size="5rem" bgColor="#000000E5" pos="relative">
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
                {formatDecimal(balance) || `-`}
              </Heading>
            </Circle>
          </Circle>
        </Circle>
      </Circle>

      <HStack
        w={['unset', '100%', 'unset']}
        minW="10rem"
        p={3}
        spacing={3}
        justify="start"
        bgColor="transparent"
        rounded="10px"
        border="solid 1px #A6A8B1"
        alignSelf={['center', 'center', 'center', 'start']}
      >
        <Icon name="warn" color="white" />

        <Heading fontSize="10px" fontWeight="700">
          Status do BOT
          <Text color="white" fontSize="xs">
            {user?.status || '-'}
          </Text>
        </Heading>
      </HStack>
    </Stack>
  );
};
