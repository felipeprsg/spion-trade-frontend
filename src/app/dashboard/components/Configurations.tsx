'use client';

import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';

import {
  VStack,
  Heading,
  HStack,
  Tag,
  TagLabel,
  Text,
  Checkbox,
  Grid,
  Button,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';

import { FormMenu, FormInput } from '@/components/Form';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/app/hooks/useAuth';

import {
  updateUser,
  getDocumentOnSnapshot,
} from '@/database/client/functions/rest';

// import {
//   getAssertivity,
//   getRecentTrades,
//   getTrader,
//   isCurrentlyOpen,
// } from '../helpers/trades';

import { formatPercent, formatTime } from '@/utils/format';

import { env } from '@/config/env';

import { STRATEGIES, Strategy } from '@/types/Strategies';

import { z } from 'zod';

const schema = z.object({
  demo: z.boolean().default(false),

  strategy: z.enum(STRATEGIES, {
    required_error: 'Campo obrigatório',
  }),

  entry: z
    .number({ errorMap: () => ({ message: 'Campo obrigatório' }) })
    .positive('Valor inválido')
    .min(2, 'Min. R$ 2,00'),

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

  stopWin: z
    .number({ errorMap: () => ({ message: 'Campo obrigatório' }) })
    .positive('Valor inválido'),

  stopLoss: z
    .number({ errorMap: () => ({ message: 'Campo obrigatório' }) })
    .positive('Valor inválido'),
});

type FormData = z.infer<typeof schema>;

interface ConfigurationsProps {
  setIsDemo: Dispatch<SetStateAction<boolean>>;
}

export const Configurations: React.FC<ConfigurationsProps> = ({
  setIsDemo,
}) => {
  const { user } = useAuth();

  const [assertivities, setAssertivities] = useState<
    [number, number, number] | null
  >(null);

  useEffect(() => {
    return getDocumentOnSnapshot('system', 'public', (doc) =>
      setAssertivities(doc.data()!.assertivities)
    );
  }, []);

  const isDisabled = !user?.broker || user.isActive;

  const toast = useToast();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user && user.isActive && user.config) {
      const balance = user.balanceTrack[0].balance;

      methods.reset({
        ...(user.config as Omit<FormData, 'demo'>),
        demo: false,
        stopWin: user.config.stopWin - balance,
        stopLoss: balance - user.config.stopLoss,
      });
    }
  }, [methods, user]);

  const strategy: Strategy = methods.watch('strategy');
  const isDemo = methods.watch('demo');

  useEffect(() => {
    setIsDemo(isDemo);
  }, [setIsDemo, isDemo]);

  const account = {
    'Copy Top Trader': { assertivity: !assertivities ? 0 : assertivities[0] },
    'Análise Probabilística': {
      assertivity: !assertivities ? 0 : assertivities[1],
    },
    'Médias Moveis + RSI': {
      assertivity: !assertivities ? 0 : assertivities[2],
    },
  };

  const options = Object.fromEntries(
    STRATEGIES.map((strategy) => [strategy, strategy]) || []
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
    strategy,
    entry,
    gales,
    stopWin,
    stopLoss,
    demo,
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

    const mode: 'real' | 'demo' = demo ? 'demo' : 'real';

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

    if ((entry / (2 - 1)) * (2 ** (gales + 1) - 1) > balance) {
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
      status: 'Analisando possível entrada',
      operations: [],
      balanceTrack: [{ balance: balance, time: formatTime(new Date()) }],
      config: {
        mode,
        strategy,
        entry,
        gales,
        galeMultiplier: 2,
        stopWin: balance + stopWin,
        stopLoss: balance - stopLoss,
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
        bgColor="gray.500"
        borderRadius="12px"
        borderBottomRadius={['12px', '12px', 'none']}
      >
        <HStack w="100%" justify="space-between">
          <Heading fontSize="md" fontWeight="500">
            AI Trade
          </Heading>

          <Checkbox
            colorScheme="primary-scheme"
            color="white"
            fontSize="xs"
            fontWeight="400"
            isDisabled={isDisabled}
            sx={{
              '.chakra-checkbox__control': {
                borderRadius: '4px',
                border: 'none',
                color: 'white',
                bgColor: methods.watch('demo') ? 'orange' : '#17181D',
                _disabled: {
                  bgColor: methods.watch('demo') ? 'orange' : '#17181D',
                },
              },
            }}
            {...methods.register('demo')}
          >
            Modo Demo
          </Checkbox>
        </HStack>

        <FormMenu
          name="strategy"
          options={options}
          label="Estratégia"
          placeholder="Escolha sua estratégia"
          isDisabled={isDisabled}
        />

        {strategy && (
          <Grid
            w="100%"
            columnGap={[4]}
            rowGap={1.5}
            templateColumns="auto 1fr auto"
            alignItems="center"
          >
            <Tag size="sm" w="min" bgColor="#070707" p={1.5} rounded="3xl">
              <TagLabel color="green" fontSize="10px" fontWeight="500">
                {formatPercent(account[strategy].assertivity)}
              </TagLabel>
            </Tag>

            <Text fontSize="10px" fontWeight="500">
              Assertividade
            </Text>
          </Grid>
        )}

        <Grid
          w="100%"
          columnGap={4}
          rowGap={5}
          templateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
        >
          <FormInput
            name="entry"
            type="number"
            label="Valor de Entrada"
            labelProps={{ fontSize: '10px' }}
            placeholder="R$ 0,00"
            bgColor="#1C1D21"
            isDisabled={isDisabled}
          />

          <FormMenu
            name="gales"
            options={{
              '🟢 Conservador': 0,
              '🟠 Moderado': 1,
              '🔴 Arrojado': 2,
            }}
            label="Gerenciamento"
            placeholder="Escolher"
            isDisabled={isDisabled}
          />

          <FormInput
            name="stopWin"
            type="number"
            label="Meta de Ganhos"
            labelProps={{ fontSize: '10px' }}
            placeholder="R$ 0,00"
            bgColor="#1C1D21"
            isDisabled={isDisabled}
          />

          <FormInput
            name="stopLoss"
            type="number"
            label="Limite de Perdas"
            labelProps={{ fontSize: '10px' }}
            placeholder="R$ 0,00"
            bgColor="#1C1D21"
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
            Ligar Spion Trade
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
            Desligar Spion Trade
          </Button>
        )}
      </VStack>
    </FormProvider>
  );
};
