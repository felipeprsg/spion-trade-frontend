'use client';

import React from 'react';

import { Heading, VStack, Text, Box } from '@chakra-ui/react';

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

import { useAuth } from '@/app/hooks/useAuth';

import { formatCurrency } from '@/utils/format';

import type { BalanceTrack } from '@/types/User';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: BalanceTrack }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { time, balance } = payload[0].payload;

    return (
      <VStack
        p={2}
        spacing={0}
        align="start"
        bgColor="gray.500"
        borderRadius="md"
      >
        <Text>Horário: {time}</Text>
        <Text>Saldo: {formatCurrency(balance)}</Text>
      </VStack>
    );
  }

  return <div />;
};

interface ChartProps {}

export const Chart: React.FC<ChartProps> = ({}) => {
  const { user } = useAuth();

  const shadow: BalanceTrack[] = [
    {
      time: '00:00',
      balance: 0,
    },
  ];

  const data: BalanceTrack[] = user?.balanceTrack?.length
    ? user.balanceTrack
    : shadow;

  return (
    <VStack
      w="100%"
      minH="20rem"
      p={8}
      pb={4}
      spacing={8}
      align="start"
      bgColor="gray.500"
      borderRadius="12px"
      borderBottomRadius={['12px', '12px', 'none']}
    >
      <Heading fontSize="md" fontWeight="500">
        Rendimento
      </Heading>

      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        <AreaChart data={data} margin={{ left: -35 }}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#058859" stopOpacity={1} />
              <stop offset="97%" stopColor="#058859" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <Area dataKey="balance" stroke="#058859" fill="url(#color)" />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickMargin={10}
            fontSize="12"
            fontWeight="600"
            color="#A6A8B1"
          />

          <YAxis
            dataKey="balance"
            axisLine={false}
            tickLine={false}
            tickCount={5}
            fontSize="12"
            color="#A6A8B1"
          />

          <Tooltip content={<CustomTooltip />} />

          <CartesianGrid opacity={0.1} vertical={false} color="#191A1F" />
        </AreaChart>
      </ResponsiveContainer>
    </VStack>
  );
};
