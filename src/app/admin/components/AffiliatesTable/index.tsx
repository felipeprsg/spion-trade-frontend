import React, { useState } from 'react';

import { useRouter } from 'next/router';

import {
  Heading,
  Stack,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Th as ChakraTh,
  TableColumnHeaderProps as ChakraThProps,
  Thead,
  Tr,
  VStack,
  Tbody,
  useDisclosure,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { RemoveAffiliateModal } from './RemoveAffiliateModal';
import { AffiliateRoomsModal } from './AffiliateRoomsModal';
import { EditAffiliateModal } from './EditAffiliateModal';
import { PaginationMenu } from './PaginationMenu';
import { AffiliateRow } from './AffiliateRow';

import { Icon } from '@/app/components/Icon';

import {
  deleteUser,
  toggleAffiliateSuspension,
} from '@/services/database/functions/firestore';

import { formatNumber } from '@/app/utils/format';

import type { Affiliate } from '@/types/Affiliate';

const Th = ({ children, ...rest }: ChakraThProps) => {
  return (
    <ChakraTh
      color="gray.500"
      fontSize="xs"
      fontWeight="500"
      textTransform="none"
      {...rest}
    >
      {children}
    </ChakraTh>
  );
};

interface AffiliatesTableProps {
  affiliates: Affiliate[];
  pages: number;
  count: number;
}

export const AffiliatesTable: React.FC<AffiliatesTableProps> = ({
  affiliates,
  pages,
  count,
}) => {
  const [currentAffiliate, setCurrentAffiliate] = useState<Affiliate | null>(
    null
  );

  const router = useRouter();

  const {
    isOpen: affiliateRoomsModalIsOpen,
    onOpen: affiliateRoomsModalOnOpen,
    onClose: affiliateRoomsModalOnClose,
  } = useDisclosure();

  const {
    isOpen: removeAffiliateModalIsOpen,
    onOpen: removeAffiliateModalOnOpen,
    onClose: removeAffiliateModalOnClose,
  } = useDisclosure();

  const {
    isOpen: editAffiliateModalIsOpen,
    onOpen: editAffiliateModalOnOpen,
    onClose: editAffiliateModalOnClose,
  } = useDisclosure();

  const handleSearch = (search: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search },
    });
  };

  const handleAction = (affiliate: Affiliate, action: () => void) => {
    setCurrentAffiliate(affiliate);
    action();
  };

  const handleToggleRoomStatus = async (affiliate: Affiliate) => {
    await toggleAffiliateSuspension(affiliate);
    router.push({ pathname: router.pathname, query: router.query });
  };

  return (
    <>
      <VStack
        w={['90vw', '85vw', '85vw', '90vw']}
        py={5}
        spacing={5}
        align="start"
        border="solid 1px"
        borderColor="gray.200"
        borderRadius="lg"
      >
        <Stack
          w="100%"
          direction={['column', 'row', 'row', 'row']}
          px={6}
          align="center"
          justify="space-between"
          spacing={2}
        >
          <Stack
            w="100%"
            direction={['column', 'row', 'row', 'row']}
            align="center"
            spacing={2}
          >
            <Heading fontSize="lg" fontWeight="500">
              Todos os Afiliados
            </Heading>

            <Tag bgColor="#F9F5FF" borderRadius="full">
              <TagLabel color="#6941C6" fontWeight="500">
                {formatNumber(count)} afiliados
              </TagLabel>
            </Tag>
          </Stack>

          <InputGroup w="100%" maxW={['100%', '17rem', '22rem', '22rem']}>
            <InputLeftElement w="min" h="100%" ml={3}>
              <Icon name="search" boxSize={5} color="gray.500" />
            </InputLeftElement>
            <Input
              maxW={['100%', '17rem', '22rem', '22rem']}
              h={12}
              placeholder="Buscar afiliado..."
              _placeholder={{ fontSize: 'md' }}
              color="gray.500"
              rounded="lg"
              border="solid 1px"
              borderColor="gray.300"
              focusBorderColor="primary.500"
              onChange={(event) => handleSearch(event.target.value)}
            />
          </InputGroup>
        </Stack>

        <TableContainer w="100%" h="36rem">
          <Table px={6}>
            <Thead bgColor="#F9FAFB">
              <Tr>
                <Th>Afiliado</Th>
                <Th>B-Tag</Th>
                <Th>Membros</Th>
                <Th>Membros Hoje</Th>
                <Th>Email</Th>
                <Th>Salas</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {affiliates.map((affiliate, index) => {
                return (
                  <AffiliateRow
                    key={index}
                    affiliate={affiliate}
                    handleAffiliateRooms={() =>
                      handleAction(affiliate, affiliateRoomsModalOnOpen)
                    }
                    handleToggleRoomStatus={() =>
                      handleToggleRoomStatus(affiliate)
                    }
                    handleRemoveAffiliate={() =>
                      handleAction(affiliate, removeAffiliateModalOnOpen)
                    }
                    handleEditAffiliate={() =>
                      handleAction(affiliate, editAffiliateModalOnOpen)
                    }
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>

        <PaginationMenu
          startAfter={
            affiliates[affiliates.length - 1] &&
            affiliates[affiliates.length - 1].email
          }
          endBefore={affiliates[0] && affiliates[0].email}
          pages={pages}
        />
      </VStack>

      {currentAffiliate && (
        <>
          <AffiliateRoomsModal
            affiliate={currentAffiliate}
            isOpen={affiliateRoomsModalIsOpen}
            onClose={affiliateRoomsModalOnClose}
          />

          <RemoveAffiliateModal
            isOpen={removeAffiliateModalIsOpen}
            onClose={removeAffiliateModalOnClose}
            onConfirmRemoval={() => deleteUser(currentAffiliate.id)}
          />

          <EditAffiliateModal
            affiliate={currentAffiliate}
            isOpen={editAffiliateModalIsOpen}
            onClose={editAffiliateModalOnClose}
          />
        </>
      )}
    </>
  );
};
