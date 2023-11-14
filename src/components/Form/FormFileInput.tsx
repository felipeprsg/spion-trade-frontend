import React from 'react';

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  Heading,
  Text,
  VisuallyHiddenInput,
  HStack,
  IconButton,
} from '@chakra-ui/react';

import { Icon } from '../Icon';

import { useFormContext } from 'react-hook-form';

interface FormFileInputProps {
  name: string;
  label?: string;
  supportedFileTypes: string[];
}

export const FormFileInput: React.FC<FormFileInputProps> = ({
  name,
  label,
  supportedFileTypes,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const file: File | undefined = watch(name);

  const error = errors[name];

  function deleteFile() {
    setValue(name, undefined);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && files.length) {
      setValue(name, files[0]);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLInputElement>) {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer.files);

    if (files.length) {
      setValue(name, files[0]);
    }
  }

  return (
    <FormControl>
      {!!label && (
        <FormLabel pl={1} htmlFor={name} color="gray.700" fontSize="sm">
          {label}
        </FormLabel>
      )}

      <Box
        as={FormLabel}
        htmlFor={name}
        w="100%"
        h="5rem"
        border="dashed 2px"
        borderColor="primary"
        borderRadius="xl"
        color="primary"
        _hover={{ opacity: 0.75, cursor: 'pointer' }}
        _active={{ opacity: 0.75, cursor: 'pointer' }}
      >
        <VStack w="100%" h="5rem" spacing={0} align="center" justify="center">
          <Heading color="primary" fontSize="md" fontWeight="500">
            Upload do arquivo
          </Heading>

          <Text color="primary" fontSize="xs">
            {supportedFileTypes.join(',').replaceAll('.', ' ')}
          </Text>
        </VStack>

        <VisuallyHiddenInput
          id={name}
          pos="fixed"
          type="file"
          multiple={false}
          accept={supportedFileTypes.join(',')}
          onChange={handleChange}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        />
      </Box>

      {error && (
        <FormErrorMessage color="red.500" fontWeight="500" fontSize="xs">
          {error.message?.toString()}
        </FormErrorMessage>
      )}

      {file && (
        <HStack w="100%" spacing={0}>
          <HStack
            w="100%"
            px={3}
            py={2}
            spacing={4}
            justify="space-between"
            border="solid 1px"
            borderColor="#68D391"
            borderRadius="md"
          >
            <Text color="#0F0F0F" fontWeight="500" fontSize="xs">
              {file.name}
            </Text>

            <Icon name="check" />
          </HStack>

          <IconButton
            w="min"
            icon={<Icon name="trash" color="red.500" boxSize="14px" />}
            aria-label="trash"
            bgColor="white"
            _hover={{ opacity: 0.75 }}
            _active={{ opacity: 0.5 }}
            onClick={deleteFile}
          />
        </HStack>
      )}
    </FormControl>
  );
};
