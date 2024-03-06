'use client';

import { Link } from '@chakra-ui/next-js';

import { HStack, Button } from '@chakra-ui/react';

import React from 'react';

export const Header: React.FC = () => {
  return (
    <HStack
      as="header"
      w="100%"
      h={16}
      p={0}
      px={8}
      spacing={8}
      align="center"
      justify={['space-between', 'space-between', 'end']}
      borderBottom="solid 1px"
      borderColor="gray.200"
    >
      <Link href="/auth/login">
        <Button variant="ghost" color="white" fontSize="xs" px={0}>
          Entrar
        </Button>
      </Link>

      <Link href="/auth/cadastro">
        <Button variant="primary" w="min" color="white" fontSize="xs" px={3}>
          Cadastrar-se
        </Button>
      </Link>
    </HStack>
  );
};
