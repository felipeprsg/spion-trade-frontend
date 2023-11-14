import React from 'react';

import {
  Radio,
  RadioGroup,
  VStack,
  FormControl,
  FormLabel,
  SimpleGrid,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useFormContext } from 'react-hook-form';

interface FormRadioGroupProps {
  name: string;
  label?: string;
  options: Record<string, string>;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
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

  const handleChange = (val: string) => {
    setValue(name, val);
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

      <RadioGroup value={currentValue} onChange={handleChange}>
        <SimpleGrid w="100%" gap={2} columnGap={4} columns={3}>
          {Object.entries(options).map(([key, value]) => (
            <Radio
              key={key}
              value={key}
              colorScheme="primaryColorScheme"
              sx={{
                '.chakra-radio__label': {
                  color: 'gray.400',
                  fontSize: 'sm',
                  fontWeight: '500',
                },
                '.chakra-radio__control': {
                  // borderRadius: '2px',
                  // border: 'solid 1px',
                  // borderColor: 'gray.200',
                  bgColor: currentValue === key ? 'primary' : 'white',
                  color: 'white',
                },
              }}
              {...register(name)}
            >
              {value}
            </Radio>
          ))}
        </SimpleGrid>
      </RadioGroup>

      {error && (
        <FormErrorMessage color="red.500" fontWeight="500" fontSize="xs">
          {error.message?.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
