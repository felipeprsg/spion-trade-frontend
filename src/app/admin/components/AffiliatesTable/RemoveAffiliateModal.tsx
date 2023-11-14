import React, { useState } from 'react';

import { useRouter } from 'next/router';

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

import { Icon } from '@/app/components/Icon';

interface RemoveAffiliateModalContent {
  isLoading: boolean;
  onClose: () => void;
  handleRemoval: () => Promise<void>;
}

const RemoveAffiliateModalContent: React.FC<RemoveAffiliateModalContent> = ({
  isLoading,
  onClose,
  handleRemoval,
}) => {
  return (
    <>
      <VStack w="100%" spacing={5}>
        <Circle size={14} bgColor="failure.50">
          <Circle size={10} bgColor="failure.100">
            <Icon name="trash" color="failure.500" boxSize={6} />
          </Circle>
        </Circle>

        <VStack spacing={2}>
          <Heading fontSize="lg">Remover afiliado</Heading>
          <Text fontSize="md" textAlign="center">
            Deseja mesmo remover este afiliado?
          </Text>
        </VStack>
      </VStack>

      <HStack w="100%" spacing={3}>
        <Button variant="secondary" onClick={onClose}>
          Agora não
        </Button>

        <Button
          variant="primary"
          isLoading={isLoading}
          _hover={{ opacity: 0.75 }}
          _active={{ opacity: 0.75 }}
          onClick={handleRemoval}
        >
          Remover
        </Button>
      </HStack>
    </>
  );
};

interface RemoveAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRemoval: () => Promise<void>;
}

export const RemoveAffiliateModal: React.FC<RemoveAffiliateModalProps> = ({
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
    router.push({ pathname: router.pathname, query: router.query });
  };

  return !isMobile ? (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent bgColor="white" rounded="xl">
        <ModalBody as={VStack} p={6} spacing={8}>
          <RemoveAffiliateModalContent
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
          <RemoveAffiliateModalContent
            isLoading={isLoading}
            onClose={onClose}
            handleRemoval={handleConfirmRemoval}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
