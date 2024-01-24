import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';

import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { UsersTable } from './components/UsersTable';

import { INFO } from '@/database/admin/functions/info';

import { getUsers } from '@/database/admin/functions/users';

import { formatInteger } from '@/utils/format';
import { serialize } from '@/utils/data';

import type { User } from '@/types/User';

const PAGE_SIZE = 10;

interface SearchParams {
  pageSize?: number;
  startAfter?: string;
  endBefore?: string;
  search?: string;
}

export default async function Admin(props: { searchParams: SearchParams }) {
  const {
    system,
    users: usersCount,
    CPAUsers,
    CPAReachedUsers,
    tradesToday,
  } = await INFO();

  const query = props.searchParams;

  const users = await getUsers(query.search ? { search: query.search } : query);

  return (
    <VStack
      w="100%"
      h="100%"
      minH="100vh"
      p={0}
      spacing={0}
      display="flex"
      bgColor="black"
      bgImage="/assets/blur2.png"
      bgRepeat={['repeat-y', 'repeat-y', 'repeat-y', 'no-repeat']}
      bgPosition="top"
      bgSize={['fit', 'fit', 'fit', 'cover']}
    >
      <Header message={system!.admin} />

      <VStack
        w="100%"
        flexGrow={1}
        mt={4}
        py={6}
        px={8}
        spacing={6}
        borderTopRadius="30px"
        bg="#00000080"
        align="start"
      >
        <Heading fontSize="md" fontWeight="500">
          Painel Administrativo
        </Heading>

        <SimpleGrid w="100%" gap={7} minChildWidth="15rem">
          <MetricCard title="Usuários">{formatInteger(usersCount)}</MetricCard>

          <MetricCard title="Usuários em período de CPA">
            {formatInteger(CPAUsers)}
          </MetricCard>

          <MetricCard title="Usuários com CPA atingido">
            {formatInteger(CPAReachedUsers)}
          </MetricCard>

          <MetricCard title="Sinais realizados hoje">
            {formatInteger(tradesToday)}
          </MetricCard>
        </SimpleGrid>

        <UsersTable
          users={serialize(users) as User[]}
          totalPages={Math.ceil(users.length / PAGE_SIZE)}
        />
      </VStack>
    </VStack>
  );
}
