import React, { useState } from 'react';

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
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import { Icon } from '@/app/components/Icon';
import { FormTextarea } from '@/app/components/FormTextarea';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendMultishot } from '@/services/library/send-multishot';

const serverErrorMessages: Record<
  string,
  { title: string; description: string }
> = {
  'server/unknown-error': {
    title: 'Erro interno',
    description:
      'Não foi possível enviar o disparo. Tente novamente mais tarde.',
  },
};

import { z } from 'zod';
import { FileInput } from '@/app/components/FileInput';

const FormSchema = z.object({
  message: z.string().nonempty('Campo obrigatório.'),
});

type FormData = z.infer<typeof FormSchema>;

interface MultishotModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const MultishotModal: React.FC<MultishotModalProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const {
    isOpen: multishotDoneModalIsOpen,
    onOpen: multishotDoneModalOnOpen,
    onClose: multishotDoneModalOnClose,
  } = useDisclosure();

  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const [file, setFile] = useState<File | null>(null);

  const toast = useToast();

  const errorToast = (title: string, description: string) =>
    toast({
      title,
      description,
      status: 'error',
      duration: 4000,
      containerStyle: {
        color: 'white',
        bgColor: 'red',
        borderRadius: 'md',
      },
    });

  const handleClose = () => {
    methods.reset();
    onClose();
    multishotDoneModalOnOpen();
  };

  const onSubmit: SubmitHandler<FormData> = async ({ message }) => {
    const result = await sendMultishot(message, file);

    if (result.success) {
      return handleClose();
    }

    const msg =
      serverErrorMessages[result.message] ||
      serverErrorMessages['server/unknown-error'];

    return errorToast(msg.title, msg.description);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="white">
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
                  <Circle size={14} bgColor="success.50">
                    <Circle size={10} bgColor="success.200">
                      <Icon name="send" boxSize={5} color="primary.500" />
                    </Circle>
                  </Circle>

                  <VStack spacing={2} align="start">
                    <Heading fontSize="lg">Disparo Múltiplo</Heading>
                    <Text>
                      A mensagem abaixo será enviada instantaneamente para todas
                      as salas disponíveis.
                    </Text>
                  </VStack>

                  <FormTextarea
                    name="message"
                    placeholder="Escreva a mensagem aqui..."
                  />

                  <FileInput
                    name="file"
                    file={file}
                    setFile={setFile}
                    label="Mídia (opcional)"
                    supportedFileTypes={[
                      '.png',
                      '.jpg',
                      '.jpeg',
                      '.gif',
                      '.mp4',
                    ]}
                  />
                </VStack>

                <HStack w="100%" spacing={3}>
                  <Button variant="secondary" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={methods.formState.isSubmitting}
                    _hover={{ opacity: 0.75 }}
                    _active={{ opacity: 0.5 }}
                  >
                    Enviar
                  </Button>
                </HStack>
              </VStack>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>

      <MultishotDoneModal
        isOpen={multishotDoneModalIsOpen}
        onClose={multishotDoneModalOnClose}
        multishotModalOnOpen={onOpen}
      />
    </>
  );
};

interface MultishotDoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  multishotModalOnOpen: () => void;
}

export const MultishotDoneModal: React.FC<MultishotDoneModalProps> = ({
  isOpen,
  onClose,
  multishotModalOnOpen,
}) => {
  const handleClose = () => {
    onClose();
    multishotModalOnOpen();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent bgColor="white">
        <ModalBody p={6}>
          <VStack w="100%" spacing={8} align="center">
            <VStack w="100%" spacing={5} align="center">
              <Circle size={14} bgColor="success.50">
                <Circle size={10} bgColor="success.200">
                  <Icon name="check" boxSize={5} color="primary.500" />
                </Circle>
              </Circle>

              <VStack spacing={2} align="center">
                <Heading fontSize="lg">Disparo feito com sucesso!</Heading>
                <Text textAlign="center">
                  Todas as salas disponíveis receberam a mensagem enviada.
                </Text>
              </VStack>
            </VStack>

            <HStack w="100%" spacing={3}>
              <Button variant="secondary" onClick={handleClose}>
                Outro disparo
              </Button>
              <Button variant="primary" onClick={onClose}>
                Ok
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
