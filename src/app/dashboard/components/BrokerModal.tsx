'use client';

import React from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';

import { FormInput } from '@/components/Form';
import { Icon } from '@/components/Icon';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/app/hooks/useAuth';

import { updateUser } from '@/database/client/functions/rest';

import { env } from '@/config/env';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(1, 'Campo obrigatório.'),
});

type FormData = z.infer<typeof schema>;

interface BrokerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrokerModal: React.FC<BrokerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();

  async function onSubmit({ email, password }: FormData) {
    await updateUser(user!.id, {
      isActive: false,
      status: 'Bot desligado',
      config: null,
      broker: null,
      realBalance: null,
      demoBalance: null,
    });

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

    await updateUser(user!.id, {
      broker: {
        email,
        password,
        ssid,
      },
      realBalance,
      demoBalance,
    });

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent px={8} py={10} borderRadius="xl" bgColor="#070707">
        <ModalBody as={FormProvider} {...methods}>
          <VStack
            as="form"
            w="100%"
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            spacing={8}
          >
            <VStack spacing={6}>
              <Image alt="Logo" src="/images/logo.png" w="40px" h="40px" />

              <Heading fontSize="20px" fontWeight="500">
                IA Spion Trade
              </Heading>

              <Text mt={-4}>Conecte-se à sua conta da Exnova</Text>
            </VStack>

            <VStack w="100%" mt={2} spacing={4}>
              <FormInput
                name="email"
                placeholder="Email"
                icon={<Icon name="email" color="gray.400" />}
                type="email"
              />

              <FormInput
                name="password"
                placeholder="Senha"
                icon={<Icon name="lock" color="gray.400" />}
                rightIcon={<Icon name="eye" color="white" />}
                type="password"
              />
            </VStack>

            <Button
              type="submit"
              variant="primary"
              w="100%"
              maxW="20rem"
              h={12}
              color="white"
              fontSize="sm"
              isLoading={methods.formState.isSubmitting}
              _hover={{ opacity: 0.75 }}
              _active={{ opacity: 0.5 }}
            >
              Conectar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
