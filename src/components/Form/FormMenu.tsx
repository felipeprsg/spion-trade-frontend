'use client';

import React from 'react';

import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Text,
} from '@chakra-ui/react';

import { useFormContext } from 'react-hook-form';

interface FormMenuProps extends ButtonProps {
  name: string;
  label?: string;
  placeholder: string;
  options: Record<string, string | number>;
}

export const FormMenu: React.FC<FormMenuProps> = ({
  name,
  label,
  placeholder,
  options,
  ...props
}) => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const currentValue = watch(name);

  const current = Object.entries(options).find(
    ([_, value]) => value === currentValue
  );

  const error = errors[name];

  const optionsLeft = Object.entries(options).filter(
    ([_, val]) => val !== currentValue
  );

  const handleChange = (value: string | number) => {
    setValue(name, value);
    trigger(name);
  };

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
          fontSize="10px"
          fontWeight="500"
        >
          {label}
        </FormLabel>
      )}

      <Menu {...register(name)}>
        <MenuButton
          as={Button}
          w="100%"
          h={14}
          bgColor="#1C1D21"
          color="white"
          fontSize="sm"
          fontWeight="400"
          textAlign="left"
          border={error && 'solid 2px #E53E3E'}
          rounded="xl"
          textTransform="none"
          disabled={optionsLeft.length === 0}
          _hover={{ opacity: 0.8 }}
          _focus={{
            borderWidth: '1px',
            borderColor: 'primary',
          }}
          _active={{
            opacity: 0.8,
            borderWidth: '1px',
            borderColor: 'primary',
          }}
          {...props}
        >
          {current ? current[0] : placeholder}
        </MenuButton>

        <MenuList bgColor="#070707" border="none">
          {optionsLeft.map(([key, val]) => (
            <MenuItem
              key={key}
              bgColor="#070707"
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.8 }}
              onClick={() => handleChange(val)}
            >
              <Text color="white">{key}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {error && (
        <FormErrorMessage color="#E53E3E" fontWeight="500" fontSize="xs">
          {error.message?.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
