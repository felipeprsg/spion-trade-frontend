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

import { AddUserModal } from './UsersTable/AddUserModal';

import { useAuth } from '@/app/hooks/useAuth';

interface HeaderProps {
  message: string | null;
}

export const Header: React.FC<HeaderProps> = ({ message }) => {
  const { signOut } = useAuth();

  const {
    isOpen: addUserIsOpen,
    onOpen: addUserOnOpen,
    onClose: addUserOnClose,
  } = useDisclosure();

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
        bg="#00000080"
      >
        <HStack w="100%" h="100%" justify="start">
          <Image alt="Logo" src="/images/logo.png" w="28px" h="28px" />

          <Heading fontSize="xs" fontWeight="600" display={['none', 'flex']}>
            E-Trader Academy
          </Heading>
        </HStack>

        <HStack
          w="100%"
          h="100%"
          justify="center"
          display={['none', 'none', 'flex']}
        >
          <HStack
            h={8}
            px={3.5}
            spacing={2}
            alignSelf="start"
            borderBottomRadius="10px"
            bgColor="#070707"
          >
            <Icon name="check" color="green" />

            <Text w="100%" color="white" fontSize="xs" fontWeight="500">
              {message}
            </Text>
          </HStack>
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
            onClick={addUserOnOpen}
          >
            Adicionar Usuário
          </Button>
        </HStack>
      </HStack>

      <AddUserModal isOpen={addUserIsOpen} onClose={addUserOnClose} />
    </>
  );
};
