'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Button,
  Circle,
  HStack,
  Heading,
  Text,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';

import { Icon } from '@/components/Icon';

interface ResetPasswordModalContent {
  isLoading: boolean;
  onClose: () => void;
  handleRemoval: () => Promise<void>;
}

const ResetPasswordModalContent: React.FC<ResetPasswordModalContent> = ({
  isLoading,
  onClose,
  handleRemoval,
}) => {
  return (
    <>
      <VStack w="100%" spacing={5}>
        <Circle size={14} bgColor="#ECFDF3">
          <Circle size={10} bgColor="#D1FADF">
            <Icon name="cloud" color="#00835C" boxSize={6} />
          </Circle>
        </Circle>

        <VStack spacing={2}>
          <Heading fontSize="lg">Resetar senha</Heading>
          <Text fontSize="md" textAlign="center">
            Deseja mesmo enviar o email de restauração de senha?
          </Text>
        </VStack>
      </VStack>

      <HStack w="100%" spacing={3}>
        <Button
          variant="outline"
          borderColor="gray.400"
          color="white"
          onClick={onClose}
          _hover={{ opacity: 0.75 }}
          _active={{ opacity: 0.5 }}
        >
          Agora não
        </Button>

        <Button
          variant="primary"
          color="white"
          isLoading={isLoading}
          onClick={handleRemoval}
          _hover={{ opacity: 0.75 }}
          _active={{ opacity: 0.5 }}
        >
          Enviar
        </Button>
      </HStack>
    </>
  );
};

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => Promise<void>;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  const router = useRouter();

  const isMobile = useBreakpointValue([true, false, false, false]);

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmReset = async () => {
    setIsLoading(true);

    await onConfirmReset();

    setIsLoading(false);

    onClose();
    // router.push({ pathname: router.pathname, query: router.query });
  };

  return !isMobile ? (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent bgColor="#070707" rounded="xl">
        <ModalBody as={VStack} p={6} spacing={8}>
          <ResetPasswordModalContent
            isLoading={isLoading}
            onClose={onClose}
            handleRemoval={handleConfirmReset}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent bgColor="white" borderTopRadius="xl">
        <DrawerBody as={VStack} p={6} spacing={8}>
          <ResetPasswordModalContent
            isLoading={isLoading}
            onClose={onClose}
            handleRemoval={handleConfirmReset}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
