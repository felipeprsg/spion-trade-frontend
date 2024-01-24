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

interface RemoveUserModalContent {
  isLoading: boolean;
  onClose: () => void;
  handleRemoval: () => Promise<void>;
}

const RemoveUserModalContent: React.FC<RemoveUserModalContent> = ({
  isLoading,
  onClose,
  handleRemoval,
}) => {
  return (
    <>
      <VStack w="100%" spacing={5}>
        <Circle size={14} bgColor="#F8E9E8">
          <Circle size={10} bgColor="#F0D3D1">
            <Icon name="trash" color="#B42318" boxSize={6} />
          </Circle>
        </Circle>

        <VStack spacing={2}>
          <Heading fontSize="lg">Remover usuário</Heading>
          <Text fontSize="md" textAlign="center">
            Deseja mesmo remover este usuário?
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
          Remover
        </Button>
      </HStack>
    </>
  );
};

interface RemoveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRemoval: () => Promise<void>;
}

export const RemoveUserModal: React.FC<RemoveUserModalProps> = ({
  isOpen,
  onClose,
  onConfirmRemoval,
}) => {
  const router = useRouter();

  const isMobile = useBreakpointValue([true, false, false, false]);

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmRemoval = async () => {
    setIsLoading(true);

    await onConfirmRemoval();

    setIsLoading(false);

    onClose();
    // router.push({ pathname: router.pathname, query: router.query });
  };

  return !isMobile ? (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent bgColor="#070707" rounded="xl">
        <ModalBody as={VStack} p={6} spacing={8}>
          <RemoveUserModalContent
            isLoading={isLoading}
            onClose={onClose}
            handleRemoval={handleConfirmRemoval}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent bgColor="white" borderTopRadius="xl">
        <DrawerBody as={VStack} p={6} spacing={8}>
          <RemoveUserModalContent
            isLoading={isLoading}
            onClose={onClose}
            handleRemoval={handleConfirmRemoval}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
