'use client';

import React, { useState, useEffect } from 'react';

import {
  VStack,
  Heading,
  HStack,
  Tag,
  TagLabel,
  Text,
  Circle,
  Grid,
  GridItem,
  Button,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';

import { FormMenu, FormInput } from '@/components/Form';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/app/hooks/useAuth';

import { updateUser } from '@/database/client/functions/rest';

import {
  getAssertivity,
  getRecentTrades,
  getTrader,
  isCurrentlyOpen,
} from '../helpers/trades';

import { formatPercent, formatTime } from '@/utils/format';

import { env } from '@/config/env';

import { Trader, TraderName, traders } from '@/types/Trader';

import { z } from 'zod';

const schema = z.object({
  trader: z.enum(traders, {
    required_error: 'Campo obrigatório',
  }),

  entry: z
    .number({ errorMap: () => ({ message: 'Campo obrigatório' }) })
    .positive('Valor inválido')
    .min(5, 'Min. R$ 5,00'),

  gales: z.union([
    z.literal(0, {
      errorMap: () => ({ message: 'Campo Obrigatório' }),
    }),
    z.literal(1, {
      errorMap: () => ({ message: 'Campo Obrigatório' }),
    }),
    z.literal(2, {
      errorMap: () => ({ message: 'Campo Obrigatório' }),
    }),
  ]),

  galeMultiplier: z.union([
    z.literal(1.5, {
      errorMap: () => ({ message: 'Campo Obrigatório' }),
    }),
    z.literal(2, {
      errorMap: () => ({ message: 'Campo Obrigatório' }),
    }),
  ]),

  stopWin: z
    .number({ errorMap: () => ({ message: 'Campo obrigatório' }) })
    .positive('Valor inválido'),

  stopLoss: z
    .number({ errorMap: () => ({ message: 'Campo obrigatório' }) })
    .positive('Valor inválido'),
});

type FormData = z.infer<typeof schema>;

interface ConfigurationsProps {
  traders: Trader[];
}

export const Configurations: React.FC<ConfigurationsProps> = ({ traders }) => {
  const { user } = useAuth();

  const isDisabled = !user?.broker || user.isActive;

  const isMobile = useBreakpointValue([true, false]);

  const toast = useToast();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user && user.isActive && user.config) {
      const balance = user.balanceTrack[0].balance;

      methods.reset({
        ...(user.config as FormData),
        stopWin: user.config.stopWin - balance,
        stopLoss: balance - user.config.stopLoss,
      });
    }
  }, [methods, user]);

  const trader: TraderName = methods.watch('trader');

  const currentTrader = trader && getTrader(traders, trader);

  const trades = trader && currentTrader.trades;

  const account = trader && getAssertivity(getRecentTrades(trades));

  const isOpen =
    trader && isCurrentlyOpen(currentTrader.openAt, currentTrader.closedAt);

  const options = Object.fromEntries(
    user?.traders.map((trader) => [trader, trader]) || []
  );

  const [isLoading, setIsLoading] = useState(false);

  async function handleDeactivate() {
    setIsLoading(true);

    await updateUser(user!.id, {
      isActive: false,
      status: 'Bot desligado',
    });

    setIsLoading(false);
  }

  async function onSubmit({
    trader,
    entry,
    gales,
    galeMultiplier,
    stopWin,
    stopLoss,
  }: FormData) {
    const [email, password] = [user!.broker!.email, user!.broker!.password];

    const response = await fetch(env.NEXT_PUBLIC_SERVER_URL + '/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        broker: 'dayprofit',
        email,
        password,
      }),
    });

    if (response.status !== 200) {
      return toast({
        title: 'Erro interno',
        description: 'Houve um erro interno. Aguarde e tente novamente.',
        status: 'error',
        duration: 4000,
        containerStyle: {
          color: 'white',
          bgColor: 'red',
          borderRadius: 'md',
        },
      });
    }

    const { success, realBalance, demoBalance, ssid } = await response.json();

    await updateUser(user!.id, {
      realBalance,
      demoBalance,
      broker: {
        email,
        password,
        ssid,
      },
    });

    if (!success) {
      return toast({
        title: 'Credenciais inválidas',
        description: 'Não foi possível se conectar. Revise suas credenciais.',
        status: 'error',
        duration: 4000,
        containerStyle: {
          color: 'white',
          bgColor: 'red',
          borderRadius: 'md',
        },
      });
    }

    const mode: 'real' | 'demo' = 'real';

    const balance = { real: realBalance, demo: demoBalance }[mode];

    let ok = true;

    if (stopLoss > balance) {
      ok = false;
      methods.setError('stopLoss', {
        message: 'O stop loss deve ser menor que seu saldo.',
      });
    }

    if (entry > balance) {
      ok = false;
      methods.setError('entry', {
        message: 'O valor de entrada deve ser menor que seu saldo.',
      });
    }

    if (
      (entry / (galeMultiplier - 1)) * (galeMultiplier ** (gales + 1) - 1) >
      balance
    ) {
      ok = false;
      methods.setError('gales', {
        message: 'Essa quantidade de gales não atende ao seu saldo.',
      });
    }

    if (!ok) {
      return;
    }

    await updateUser(user!.id, {
      isActive: true,
      status: 'Trader em análise',
      operations: [],
      balanceTrack: [{ balance: balance, time: formatTime(new Date()) }],
      config: {
        mode,
        trader,
        entry,
        gales,
        galeMultiplier,
        stopWin: balance + stopWin,
        stopLoss: balance - stopLoss,
        broker: 'dayprofit',
      },
    });
  }

  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        w="100%"
        p={8}
        pb={4}
        spacing={3}
        align="start"
        bgColor="black"
        borderRadius="12px"
        borderBottomRadius={['12px', '12px', 'none']}
      >
        <Heading fontSize="md" fontWeight="500">
          Trade
        </Heading>

        <FormMenu
          name="trader"
          options={options}
          label="Trader"
          placeholder="Escolha seu trader"
          isDisabled={isDisabled}
          hasFlag
        />

        {trader && (
          <Grid
            w="100%"
            columnGap={[4]}
            rowGap={1.5}
            templateColumns="auto 1fr auto"
            alignItems="center"
          >
            <Tag size="sm" w="min" bgColor="#070707" p={1.5} rounded="3xl">
              <TagLabel color="green" fontSize="10px" fontWeight="500">
                {formatPercent(account.assertivity)}
              </TagLabel>
            </Tag>

            <Text fontSize="10px" fontWeight="500">
              Assertividade
            </Text>

            <HStack spacing={1.5} justifySelf="end">
              <Tag size="sm" bgColor="#070707" p={1.5} rounded="3xl">
                <TagLabel color="green" fontSize="10px" fontWeight="500">
                  {isMobile ? `${account.wins}` : `${account.wins} wins`}
                </TagLabel>
              </Tag>

              <Tag size="sm" bgColor="#070707" p={1.5} rounded="3xl">
                <TagLabel color="red" fontSize="10px" fontWeight="500">
                  {isMobile ? `${account.losses}` : `${account.losses} losses`}
                </TagLabel>
              </Tag>
            </HStack>

            <Tag size="sm" w="min" bgColor="#070707" p={1.5} rounded="3xl">
              <Circle size={1.5} mr={1} bgColor={isOpen ? 'green' : 'red'} />

              <TagLabel
                color={isOpen ? 'green' : 'red'}
                fontSize="10px"
                fontWeight="500"
              >
                {isOpen ? 'Online' : 'Offline'}
              </TagLabel>
            </Tag>

            <Text fontSize="10px" fontWeight="500">
              {isMobile ? 'Funcionamento' : 'Horário de Funcionamento'}
            </Text>

            <Text fontSize="10px" fontWeight="500" justifySelf="end">
              {currentTrader.openAt} - {currentTrader.closedAt}
            </Text>
          </Grid>
        )}

        <Grid
          w="100%"
          columnGap={4}
          rowGap={5}
          templateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <GridItem colSpan={[1, 1, 1, 2]}>
            <FormInput
              name="entry"
              type="number"
              label="Valor de Entrada"
              labelProps={{ fontSize: '10px' }}
              placeholder="R$ 0,00"
              bgColor="#070707"
              isDisabled={isDisabled}
            />
          </GridItem>

          <FormInput
            name="stopWin"
            type="number"
            label="Meta de Ganhos"
            labelProps={{ fontSize: '10px' }}
            placeholder="R$ 0,00"
            bgColor="#070707"
            isDisabled={isDisabled}
          />

          <FormInput
            name="stopLoss"
            type="number"
            label="Limite de Perdas"
            labelProps={{ fontSize: '10px' }}
            placeholder="R$ 0,00"
            bgColor="#070707"
            isDisabled={isDisabled}
          />

          <FormMenu
            name="gales"
            options={{
              Nenhum: 0,
              '1 Gale': 1,
              '2 Gales': 2,
            }}
            label="Gales"
            placeholder="Gales"
            isDisabled={isDisabled}
          />

          <FormMenu
            name="galeMultiplier"
            options={{
              '1.5x': 1.5,
              '2x': 2,
            }}
            label="Multiplicador"
            placeholder="Multiplicador"
            isDisabled={isDisabled}
          />
        </Grid>

        {!user?.isActive && (
          <Button
            variant="primary"
            type="submit"
            mt={2}
            h={12}
            color="white"
            fontSize="sm"
            isLoading={methods.formState.isSubmitting}
            isDisabled={isDisabled}
            _hover={{ opacity: 0.75 }}
            _active={{ opacity: 0.5 }}
          >
            Ativar Copy
          </Button>
        )}

        {user?.isActive && (
          <Button
            variant="primary"
            bgColor="red"
            onClick={handleDeactivate}
            mt={2}
            h={12}
            color="white"
            fontSize="sm"
            isLoading={isLoading}
            _hover={{ opacity: 0.75 }}
            _active={{ opacity: 0.5 }}
          >
            Desativar Copy
          </Button>
        )}
      </VStack>
    </FormProvider>
  );
};
