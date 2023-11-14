import React from 'react';

import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  Text,
  Avatar,
  HStack,
  Wrap,
  WrapItem,
  Button,
} from '@chakra-ui/react';

import { RoomTag } from './AffiliateRow';

import type { Affiliate } from '@/types/Affiliate';

interface AffiliatedRoomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliate: Affiliate;
}

export const AffiliateRoomsModal: React.FC<AffiliatedRoomsModalProps> = ({
  isOpen,
  onClose,
  affiliate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent bgColor="white">
        <ModalBody as={VStack} p={6} spacing={8}>
          <VStack w="100%" align="start" spacing={5}>
            <VStack spacing={2} align="start">
              <Heading fontSize="lg">Salas</Heading>
              <Text>Veja todas as salas do afiliado:</Text>
            </VStack>

            <HStack spacing={3}>
              <Avatar
                name={affiliate.name}
                boxSize={10}
                bgColor="#F9F5FF"
                color="#7F56D9"
              />

              <VStack spacing={0} align="start">
                <Heading fontSize="sm" fontWeight="500">
                  {affiliate.name.split(' ').slice(0, 2).join(' ')}
                </Heading>
                <Text textTransform="lowercase">
                  @{affiliate.name.split(' ')[0]}
                </Text>
              </VStack>
            </HStack>

            <Wrap w="100%" gap={2}>
              {affiliate.rooms.map((room, index) => {
                return (
                  <WrapItem key={index}>
                    <RoomTag index={index} room={room} />
                  </WrapItem>
                );
              })}
            </Wrap>
          </VStack>

          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
