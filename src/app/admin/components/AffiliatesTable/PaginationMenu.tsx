import React from 'react';

import { useRouter } from 'next/router';

import { Button, HStack } from '@chakra-ui/react';

import { Icon } from '@/app/components/Icon';

interface PaginationMenuProps {
  startAfter: string | undefined;
  endBefore: string | undefined;
  pages: number;
}

export const PaginationMenu: React.FC<PaginationMenuProps> = ({
  startAfter,
  endBefore,
  pages,
}) => {
  const router = useRouter();

  const currentPage = Number(router.query.page) || 0;

  const handlePrev = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: currentPage - 1,
        startAfter: undefined,
        endBefore,
      },
    });
  };

  const handleNext = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: currentPage + 1,
        startAfter,
        endBefore: undefined,
      },
    });
  };

  return (
    <HStack w="100%" px={6} justify="space-between">
      <Button
        onClick={handlePrev}
        variant="secondary"
        w="min"
        isDisabled={currentPage === 0}
        color="gray.700"
        iconSpacing={2}
        leftIcon={<Icon name="indicator-left" boxSize={5} color="gray.700" />}
      >
        Anterior
      </Button>

      <Button
        onClick={handleNext}
        variant="secondary"
        w="min"
        isDisabled={pages === 0 || currentPage === pages - 1}
        color="gray.700"
        iconSpacing={2}
        rightIcon={<Icon name="indicator-right" boxSize={5} color="gray.700" />}
      >
        Próximo
      </Button>
    </HStack>
  );
};
