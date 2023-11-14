'use client';

import React from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  TextareaProps,
  VStack,
} from '@chakra-ui/react';

import { Icon as IconComponent } from '@/components/Icon';

import { useFormContext } from 'react-hook-form';

interface FormTextareaProps extends TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactElement<typeof IconComponent>;
  setValueAs?: (value: any) => any;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  icon,
  setValueAs,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <FormControl
      as={VStack}
      w="100%"
      align="start"
      spacing={0}
      isInvalid={!!error}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          ml={1}
          color="gray.700"
          fontSize="sm"
          fontWeight="500"
        >
          {label}
        </FormLabel>
      )}

      <InputGroup>
        {!!icon && (
          <InputLeftElement as={FormLabel} htmlFor={name} h="100%">
            {icon}
          </InputLeftElement>
        )}

        <Textarea
          id={name}
          h={24}
          w="100%"
          placeholder={placeholder || label}
          _placeholder={{ fontSize: 'sm' }}
          color="gray.400"
          fontWeight="400"
          fontSize="sm"
          bgColor="white"
          rounded="xl"
          border="solid 1px"
          borderColor="gray.200"
          errorBorderColor="red.500"
          focusBorderColor="primary"
          {...register(name, {
            setValueAs,
          })}
          {...props}
        />
      </InputGroup>

      {error && (
        <FormErrorMessage color="red.500" fontWeight="500" fontSize="xs">
          {error.message?.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
