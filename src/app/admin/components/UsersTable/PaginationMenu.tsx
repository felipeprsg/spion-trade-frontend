'use client';

import React from 'react';

import { HStack, Button } from '@chakra-ui/react';

import { Icon } from '@/components/Icon';

import { useQueryParams } from '@/app/hooks/useQueryParams';

interface SearchParams {
  currentPage: number;
  pageSize?: number;
  startAfter?: string;
  endBefore?: string;
  search?: string;
}

interface PaginationMenuProps {
  totalPages: number;
  startAfter?: string;
  endBefore?: string;
}

export const PaginationMenu: React.FC<PaginationMenuProps> = ({
  totalPages,
  startAfter,
  endBefore,
}) => {
  const { queryParams, setQueryParams } = useQueryParams<SearchParams>();

  const currentPage = Number(queryParams.get('currentPage')) || 0;

  const handlePrev = () => {
    setQueryParams({
      currentPage: currentPage - 1,
      startAfter: undefined,
      endBefore,
    });
  };

  const handleNext = () => {
    setQueryParams({
      currentPage: currentPage + 1,
      startAfter,
      endBefore: undefined,
    });
  };

  return (
    <HStack w="100%" px={6} justify="space-between">
      <Button
        onClick={handlePrev}
        variant="primary"
        w="min"
        isDisabled={currentPage === 0}
        color="white"
        fontSize="sm"
        fontWeight="500"
        iconSpacing={2}
        leftIcon={<Icon name="arrow-left" color="white" />}
      >
        Anterior
      </Button>

      <Button
        onClick={handleNext}
        variant="primary"
        w="min"
        isDisabled={totalPages === 0 || currentPage === totalPages - 1}
        color="white"
        fontSize="sm"
        fontWeight="500"
        iconSpacing={2}
        rightIcon={<Icon name="arrow-right" color="white" />}
      >
        Próximo
      </Button>
    </HStack>
  );
};
