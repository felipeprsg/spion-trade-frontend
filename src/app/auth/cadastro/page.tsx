'use client';

import {
  Heading,
  VStack,
  Text,
  Button,
  Image,
  useToast,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Link,
} from '@chakra-ui/react';

import { FormInput } from '@/components/Form';
import { Icon } from '@/components/Icon';

import { AuthErrorMessages } from '@/database/client/functions/auth/AuthError';

import { useAuth } from '@/app/hooks/useAuth';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email('Email inválido.'),
    password: z.string().min(6, 'A senha deve conter ao menos 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Campo obrigatório.'),
    terms: z
      .literal(true, {
        errorMap: () => ({
          message: 'Você deve aceitar os termos e condições.',
        }),
      })
      .default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem.',
  });

type FormData = z.infer<typeof schema>;

export default function Signup() {
  const { signUp } = useAuth();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const terms = methods.watch('terms', true);

  const toast = useToast();

  async function onSubmit({ email, password }: FormData): Promise<void> {
    const result = await signUp({ email, password });

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

          <Text>Somente emails cadastrados pelo suporte.</Text>
        </VStack>

        <VStack w="100%" spacing={4} align="start">
          <FormInput
            name="email"
            placeholder="Email"
            type="email"
            icon={<Icon name="email" color="gray.400" />}
          />

          <FormInput
            name="password"
            placeholder="Senha"
            icon={<Icon name="lock" color="gray.400" />}
            rightIcon={<Icon name="eye" color="white" />}
            type="password"
          />

          <FormInput
            name="confirmPassword"
            placeholder="Senha novamente"
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
          Cadastrar
        </Button>

        <FormControl
          as={VStack}
          w="100%"
          align="start"
          spacing={0}
          isInvalid={!!methods.formState.errors['terms']}
        >
          <Checkbox
            defaultChecked
            colorScheme="primary-scheme"
            color="gray.400"
            fontWeight="400"
            sx={{
              '.chakra-checkbox__label': {
                fontSize: 'sm',
              },
              '.chakra-checkbox__control': {
                borderRadius: '4px',
                border: terms ? 'none' : 'solid 1px',
                borderColor: 'gray.400',
                bgColor: terms ? 'primary' : 'gray.500',
                color: 'white',
              },
            }}
            {...methods.register('terms')}
          >
            Concordo com os{' '}
            <Link
              color="#4B2BCB"
              href="/assets/etrader-academy.pdf"
              isExternal
              download
            >
              Termos <Text as="span">e</Text> Condições
            </Link>
            .
          </Checkbox>

          {methods.formState.errors['terms'] && (
            <FormErrorMessage color="red.500" fontWeight="500" fontSize="xs">
              {methods.formState.errors['terms']?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
      </VStack>
    </FormProvider>
  );
}
