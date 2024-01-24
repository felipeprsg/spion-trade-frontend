'use client';

import React from 'react';

import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';

import { Icon } from '@/components/Icon';

import { useQueryParams } from '@/app/hooks/useQueryParams';

interface SearchParams {
  currentPage: number;
  pageSize?: number;
  startAfter?: string;
  endBefore?: string;
  search?: string;
}

export const SearchBar: React.FC = () => {
  const { setQueryParams } = useQueryParams<SearchParams>();

  const handleSearch = (search: string) => {
    setQueryParams({
      currentPage: undefined,
      startAfter: undefined,
      endBefore: undefined,
      pageSize: undefined,
      search,
    });
  };

  return (
    <InputGroup w="100%" maxW={['100%', '17rem', '22rem', '22rem']}>
      <InputLeftElement w="min" h="100%" pl={4}>
        <Icon name="search" boxSize={5} color="gray.500" />
      </InputLeftElement>

      <Input
        maxW={['100%', '17rem', '22rem', '22rem']}
        h={12}
        pl={12}
        placeholder="Buscar usuário..."
        _placeholder={{ fontSize: 'md', color: '#A6A8B1' }}
        color="#A6A8B1"
        bgColor="#0F0F10"
        border="none"
        rounded="lg"
        focusBorderColor="primary"
        onChange={(event) => handleSearch(event.target.value)}
      />
    </InputGroup>
  );
};
