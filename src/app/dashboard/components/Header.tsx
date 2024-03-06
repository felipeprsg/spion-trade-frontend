'use client';

import React from 'react';

import {
  Button,
  HStack,
  Image,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Icon } from '@/components/Icon';

import { BrokerModal } from './BrokerModal';

import { useAuth } from '@/app/hooks/useAuth';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack
        as="header"
        w="100%"
        h={16}
        p={0}
        px={8}
        spacing={8}
        align="center"
        borderBottom="solid 1px"
        borderColor="gray.200"
      >
        <HStack w="100%" h="100%" justify="start" spacing={3}>
          <Image alt="Logo" src="/images/logo.png" w="35" h="35" />

          <Heading fontSize="xs" fontWeight="600" display={['none', 'flex']}>
            IA Spion Trade
          </Heading>
        </HStack>

        <HStack w="100%" h="100%" spacing={4} justify="end">
          <Button
            variant="ghost"
            color="white"
            fontSize="xs"
            px={0}
            onClick={signOut}
          >
            Sair
          </Button>

          <Button
            variant="primary"
            w="min"
            color="white"
            fontSize="xs"
            px={3}
            onClick={onOpen}
          >
            {!!user?.broker ? 'Conectado' : 'Conectar Corretora'}
          </Button>
        </HStack>
      </HStack>

      <BrokerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
