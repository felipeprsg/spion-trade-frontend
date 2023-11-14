import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Circle,
  Heading,
  Text,
  Divider,
  SimpleGrid,
  Checkbox,
  Button,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';

import { Icon } from '@/app/components/Icon';
import { FormInput } from '@/app/components/FormInput';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { addLicense } from '@/services/database/functions/firestore';

import { z } from 'zod';

import {
  type Game,
  games,
  staticGames,
  dynamicGames,
  interativeGames,
} from '@/types/Game';

const FormSchema = z.object({
  name: z.string().nonempty('Campo obrigatório.'),
  email: z.string().nonempty('Campo obrigatório.').email('Email inválido.'),
  btag: z.string().nonempty('Campo obrigatório.'),
  games: z.array(z.enum(games)).default([]),
});

type FormData = z.infer<typeof FormSchema>;

interface AddAffiliateModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const AddAffiliateModal: React.FC<AddAffiliateModalProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const {
    isOpen: addAffiliateDoneModalIsOpen,
    onOpen: addAffiliateDoneModalOnOpen,
    onClose: addAffiliateDoneModalOnClose,
  } = useDisclosure();

  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const selectedGames = methods.watch('games', []);

  const onSubmit: SubmitHandler<FormData> = async ({
    name,
    email,
    btag,
    games,
  }) => {
    await addLicense({
      role: 'user',
      name,
      email,
      btag: isNaN(Number(btag)) ? btag : Number(btag),
      games,
    });

    methods.reset();
    onClose();
    addAffiliateDoneModalOnOpen();
  };

  const gameSection = (title: string, games: Game[]) => {
    return (
      <VStack spacing={2} align="start" w="100%">
        <Heading fontSize="sm" fontWeight="600">
          {title}
        </Heading>
        <SimpleGrid w="100%" gap={2} columns={2}>
          {games.map((game, index) => {
            return (
              <Checkbox
                key={index}
                isChecked={selectedGames.includes(game)}
                colorScheme="primary"
                borderColor="gray.300"
                sx={{
                  '.chakra-checkbox__control': {
                    borderRadius: '4px',
                    bgColor: selectedGames.includes(game)
                      ? 'primary'
                      : 'neutral.100',
                    color: 'white',
                  },
                  '.chakra-checkbox__label': {
                    color: 'gray.700',
                    fontSize: 'sm',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                  },
                }}
                onChange={() => {
                  if (selectedGames.includes(game)) {
                    methods.setValue(
                      'games',
                      selectedGames.filter((g) => g !== game)
                    );
                  } else {
                    methods.setValue('games', [...selectedGames, game]);
                  }
                }}
              >
                {game}
              </Checkbox>
            );
          })}
        </SimpleGrid>
      </VStack>
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="white">
          <ModalBody p={6}>
            <FormProvider {...methods}>
              <VStack
                as="form"
                noValidate
                onSubmit={methods.handleSubmit(onSubmit)}
                w="100%"
                spacing={8}
                align="start"
              >
                <VStack w="100%" spacing={5} align="start">
                  <Circle size={14} bgColor="success.50">
                    <Circle size={10} bgColor="success.200">
                      <Icon name="plus" boxSize={5} color="primary.500" />
                    </Circle>
                  </Circle>

                  <VStack spacing={2} align="start">
                    <Heading fontSize="lg">Dados do Afiliado</Heading>
                    <Text>Preencha com os dados do afiliado.</Text>
                  </VStack>

                  <FormInput
                    name="name"
                    label="Nome completo"
                    placeholder="Coloque o nome aqui..."
                  />

                  <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Coloque o email aqui..."
                  />

                  <FormInput
                    name="btag"
                    label="B-Tag"
                    placeholder="Coloque a B-Tag aqui..."
                  />

                  <Divider w="100%" border="solid 1px" borderColor="gray.300" />

                  <VStack spacing={2} align="start">
                    <Heading fontSize="lg">Defina os jogos</Heading>
                    <Text>
                      Defina os jogos que o afiliado terá acesso na criação de
                      sala.
                    </Text>
                  </VStack>

                  {gameSection(
                    'Jogos estáticos',
                    games.filter((game) => staticGames.includes(game as any))
                  )}

                  {gameSection(
                    'Jogos dinâmicos',
                    games.filter((game) => dynamicGames.includes(game as any))
                  )}

                  {/* {gameSection(
                    'Jogos interativos',
                    games.filter((game) =>
                      interativeGames.includes(game as any)
                    )
                  )} */}

                  <HStack w="100%" mt={2} spacing={3}>
                    <Button variant="secondary" onClick={onClose}>
                      Cancelar
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={methods.formState.isSubmitting}
                      _hover={{ opacity: 0.75 }}
                      _active={{ opacity: 0.5 }}
                    >
                      Continuar
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AddAffiliateDoneModal
        isOpen={addAffiliateDoneModalIsOpen}
        onClose={addAffiliateDoneModalOnClose}
        addAffiliateModalOnOpen={onOpen}
      />
    </>
  );
};

interface AddAffiliateDoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  addAffiliateModalOnOpen: () => void;
}

export const AddAffiliateDoneModal: React.FC<AddAffiliateDoneModalProps> = ({
  isOpen,
  onClose,
  addAffiliateModalOnOpen,
}) => {
  const handleClose = () => {
    onClose();
    addAffiliateModalOnOpen();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent bgColor="white">
        <ModalBody p={6}>
          <VStack w="100%" spacing={8} align="center">
            <VStack w="100%" spacing={5} align="center">
              <Circle size={14} bgColor="success.50">
                <Circle size={10} bgColor="success.200">
                  <Icon name="check" boxSize={5} color="primary.500" />
                </Circle>
              </Circle>

              <VStack spacing={2} align="center">
                <Heading fontSize="lg">
                  Afiliado adicionado com sucesso!
                </Heading>
                <Text textAlign="center">
                  O afiliado agora está licenciado e pode fazer cadastro.
                </Text>
              </VStack>
            </VStack>

            <HStack w="100%" spacing={3}>
              <Button variant="secondary" onClick={handleClose}>
                Adicionar outro
              </Button>
              <Button variant="primary" onClick={onClose}>
                Ok
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
