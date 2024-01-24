import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Heading,
  Image,
  Text,
  Button,
} from '@chakra-ui/react';

import { FormInput } from '@/components/Form';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { addUser } from '@/database/admin/functions/system';

const schema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Email inválido.'),
  licensedUntil: z
    .date({ required_error: 'Campo obrigatório' })
    .refine((d) => d instanceof Date, {
      message: 'Por favor, insira uma data válida',
    }),
});

type FormData = z.infer<typeof schema>;

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit({ email, licensedUntil }: FormData) {
    await addUser({ email, licensedUntil });
    onClose();
    methods.reset();
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
                E-Trader Academy
              </Heading>

              <Text mt={-4}>Vamos adicionar um novo usuário</Text>
            </VStack>

            <VStack w="100%" mt={2} spacing={4}>
              <FormInput
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
              />

              <FormInput name="licensedUntil" label="Licença" type="date" />
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
              Adicionar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
