import React from 'react';

import {
  Checkbox,
  CheckboxGroup,
  VStack,
  FormControl,
  FormLabel,
  SimpleGrid,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useFormContext } from 'react-hook-form';

interface FormCheckboxGroupProps {
  name: string;
  label?: string;
  options: Record<string, string>;
}

export const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  name,
  label,
  options,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const currentValue = watch(name);

  const handleChange = (vals: any) => {
    setValue(name, vals);
  };

  return (
    <FormControl
      as={VStack}
      w="100%"
      pl={2}
      align="start"
      spacing={0}
      isInvalid={!!error}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          color="gray.700"
          fontSize="sm"
          fontWeight="500"
        >
          {label}
        </FormLabel>
      )}

      <CheckboxGroup value={currentValue} onChange={handleChange}>
        <SimpleGrid w="100%" gap={2} columnGap={4} columns={2}>
          {Object.entries(options).map(([key, value]) => (
            <Checkbox
              key={key}
              value={key}
              colorScheme="primaryColorScheme"
              sx={{
                '.chakra-checkbox__label': {
                  color: 'gray.400',
                  fontSize: 'sm',
                  fontWeight: '500',
                },
                '.chakra-checkbox__control': {
                  borderRadius: '4px',
                  border: 'solid 1px',
                  borderColor: 'gray.200',
                  bgColor: (currentValue || []).includes(value)
                    ? 'primary'
                    : 'white',
                  color: 'white',
                },
              }}
              {...register(name)}
            >
              {value}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>

      {error && (
        <FormErrorMessage color="red.500" fontWeight="500" fontSize="xs">
          {error.message?.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
