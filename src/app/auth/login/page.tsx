'use client';

import {
  Heading,
  VStack,
  Text,
  Button,
  Image,
  useToast,
} from '@chakra-ui/react';

import { FormInput } from '@/components/Form';
import { Icon } from '@/components/Icon';

import { AuthErrorMessages } from '@/database/client/functions/auth/AuthError';

import { useAuth } from '@/app/hooks/useAuth';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(6, 'A senha deve conter ao menos 6 caracteres.'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { signIn } = useAuth();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();

  async function onSubmit({ email, password }: FormData): Promise<void> {
    const result = await signIn({ email, password });

    if (!result.success) {
      console.error(result.error);
      const message = AuthErrorMessages[result.error];

      toast({
        title: message.title,
        description: message.description,
        status: 'error',
        duration: 4000,
        containerStyle: {
          color: 'white',
          bgColor: 'red',
          borderRadius: 'md',
        },
      });
    }
  }

  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        py={8}
        px={3}
        spacing={8}
        align="start"
        justify="center"
        bgColor="#00000080"
        rounded="20px"
      >
        <VStack w="100%" align="start" p={0} spacing={2}>
          <Image alt="Logo" src="/images/logo.png" mb={4} />

          <Heading fontSize="20px">E-Trader Academy</Heading>

          <Text>Conecte a sua conta para começar a lucrar.</Text>
        </VStack>

        <VStack w="100%" spacing={4} align="start">
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
          h={12}
          w="100%"
          maxW="20rem"
          variant="primary"
          color="white"
          fontSize="sm"
          type="submit"
          isLoading={methods.formState.isSubmitting}
          _hover={{ opacity: 0.75 }}
          _active={{ opacity: 0.5 }}
        >
          Entrar
        </Button>
      </VStack>
    </FormProvider>
  );
}
