'use client';

import React from 'react';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  VStack,
  useBoolean,
} from '@chakra-ui/react';

import { Icon as IconComponent } from '@/components/Icon';

import { useFormContext } from 'react-hook-form';

interface FormInputProps extends InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactElement<typeof IconComponent>;
  rightIcon?: React.ReactElement<typeof IconComponent>;
  labelProps?: FormLabelProps;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  icon,
  rightIcon,
  labelProps,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const [isVisible, { toggle }] = useBoolean(false);

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
          color="white"
          fontSize="sm"
          fontWeight="500"
          {...labelProps}
        >
          {label}
        </FormLabel>
      )}

      <InputGroup>
        {!!icon && (
          <InputLeftElement as={FormLabel} htmlFor={name} h="100%" pl={4}>
            {icon}
          </InputLeftElement>
        )}

        <Input
          id={name}
          h={14}
          w="100%"
          pl={icon && 12}
          placeholder={placeholder || label}
          _placeholder={{ color: 'gray.400', fontSize: 'md' }}
          color="gray.400"
          fontSize="md"
          fontWeight="400"
          bgColor="#0F0F10"
          rounded="xl"
          border="none"
          errorBorderColor="red.500"
          focusBorderColor="primary"
          _hover={{ opacity: 0.8 }}
          _active={{ opacity: 0.8 }}
          {...register(name, {
            valueAsNumber: props.type === 'number',
            ...(props.type === 'date' && {
              setValueAs: (val: string) => new Date(val),
            }),
          })}
          {...props}
          type={
            props.type === 'password'
              ? isVisible
                ? 'text'
                : 'password'
              : props.type
          }
        />

        {!!rightIcon && (
          <InputRightElement
            as={Button}
            onClick={toggle}
            w="min"
            h="100%"
            py={0}
            px={4}
            bgColor="transparent"
            _hover={{
              bgColor: 'transparent',
              opacity: 0.75,
            }}
            _active={{
              bgColor: 'transparent',
              opacity: 0.5,
            }}
          >
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>

      {error && (
        <FormErrorMessage color="#E53E3E" fontWeight="500" fontSize="xs">
          {error.message?.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
