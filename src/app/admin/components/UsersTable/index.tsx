import React from 'react';

import {
  Stack,
  VStack,
  Heading,
  TableContainer,
  Table,
  Tbody,
  Th as ChakraTh,
  TableColumnHeaderProps as ChakraThProps,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { UserRow } from './UserRow';
import { SearchBar } from './SearchBar';
import { PaginationMenu } from './PaginationMenu';

import type { User } from '@/types/User';

const Th = ({ children, ...rest }: ChakraThProps) => {
  return (
    <ChakraTh
      color="gray.400"
      fontSize="xs"
      fontWeight="500"
      border="none"
      {...rest}
    >
      {children}
    </ChakraTh>
  );
};

interface UsersTableProps {
  users: User[];
  totalPages: number;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  totalPages,
}) => {
  const firstUser = users[0];
  const lastUser = users[users.length - 1];

  return (
    <VStack
      w="100%"
      py={5}
      spacing={5}
      align="start"
      bgColor="#070707"
      rounded="lg"
    >
      <Stack
        w="100%"
        direction={['column', 'row', 'row', 'row']}
        px={6}
        align="center"
        justify="space-between"
        spacing={2}
      >
        <Heading color="white" fontSize="lg" fontWeight="500">
          Todos os Afiliados
        </Heading>

        <SearchBar />
      </Stack>

      <TableContainer w="100%" h="36rem">
        <Table px={6}>
          <Thead bgColor="#0F0F10">
            <Tr>
              <Th>Usuário</Th>
              <Th>Licenciado até</Th>
              <Th>Banca</Th>
              <Th>Bot ligado</Th>
              <Th>CPA Ativo</Th>
              <Th>Movimentado</Th>
              <Th />
            </Tr>
          </Thead>

          <Tbody>
            {users.map((user, index) => {
              return <UserRow key={index} user={user} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <PaginationMenu
        totalPages={totalPages}
        startAfter={firstUser && firstUser.email}
        endBefore={lastUser && lastUser.email}
      />
    </VStack>
  );
};
