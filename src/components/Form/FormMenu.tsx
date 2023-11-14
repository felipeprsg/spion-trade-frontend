'use client';

import React from 'react';

import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Text,
} from '@chakra-ui/react';

import { useFormContext } from 'react-hook-form';
import { Icon } from '../Icon';

import { flags } from '@/types/Trader';

interface FormMenuProps extends ButtonProps {
  name: string;
  label?: string;
  placeholder: string;
  options: Record<string, string | number>;
  hasFlag?: boolean;
}

export const FormMenu: React.FC<FormMenuProps> = ({
  name,
  label,
  placeholder,
  options,
  hasFlag = false,
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

  const flag = flags[currentValue as keyof typeof flags];

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
          h={12}
          bgColor="#070707"
          color="white"
          fontSize="sm"
          fontWeight="400"
          textAlign="left"
          border={error && 'solid 2px #E53E3E'}
          rounded="xl"
          textTransform="none"
          rightIcon={
            <HStack spacing={2}>
              {hasFlag && flag && <Icon name={flag as any} />}
              <Icon name="down" color="white" />
            </HStack>
          }
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
              <HStack w="100%" justify="space-between">
                <Text color="white">{key}</Text>
                {hasFlag && flags[key as keyof typeof flags] && (
                  <Icon
                    name={flags[key as keyof typeof flags] as any}
                    boxSize="21px"
                  />
                )}
              </HStack>
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
