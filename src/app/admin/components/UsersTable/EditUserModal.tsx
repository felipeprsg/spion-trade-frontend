import React, { useEffect } from 'react';

import { updateLicense } from '@/database/admin/functions/system';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Circle,
  Heading,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react';

import { Icon } from '@/components/Icon';
import { FormInput } from '@/components/Form';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import type { User } from '@/types/User';

import { z } from 'zod';

const schema = z.object({
  licensedUntil: z
    .date({ required_error: 'Campo obrigatório' })
    .refine((d) => d instanceof Date, {
      message: 'Por favor, insira uma data válida',
    }),
});

type FormData = z.infer<typeof schema>;

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit({ licensedUntil }: FormData): Promise<void> {
    await updateLicense(user.id, licensedUntil);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor="#070707" rounded="xl">
        <ModalBody p={6}>
          <FormProvider {...methods}>
            <VStack
              as="form"
              noValidate
              onSubmit={methods.handleSubmit(onSubmit)}
              w="100%"
              spacing={8}
              align="start"
            >
              <VStack w="100%" spacing={5} align="start">
                <Circle size={14} bgColor="#ECFDF3">
                  <Circle size={10} bgColor="#D1FADF">
                    <Icon name="pencil" color="#00835C" boxSize={6} />
                  </Circle>
                </Circle>

                <VStack spacing={2} align="start">
                  <Heading fontSize="lg">Dados do Afiliado</Heading>
                  <Text>Edite a licença do afiliado.</Text>
                </VStack>
              </VStack>

              <FormInput name="licensedUntil" label="Licença" type="date" />

              <HStack w="100%" mt={2} spacing={3}>
                <Button
                  variant="outline"
                  borderColor="gray.400"
                  color="white"
                  onClick={onClose}
                  _hover={{ opacity: 0.75 }}
                  _active={{ opacity: 0.5 }}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  color="white"
                  isLoading={methods.formState.isSubmitting}
                  _hover={{ opacity: 0.75 }}
                  _active={{ opacity: 0.5 }}
                >
                  Atualizar
                </Button>
              </HStack>
            </VStack>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
