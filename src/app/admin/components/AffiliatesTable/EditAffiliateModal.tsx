import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

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

import {
  updateRoom,
  updateUser,
} from '@/services/database/functions/firestore';

import { z } from 'zod';

import {
  type Game,
  games,
  staticGames,
  dynamicGames,
  interativeGames,
} from '@/types/Game';

import type { Affiliate } from '@/types/Affiliate';

const FormSchema = z.object({
  name: z.string().nonempty('Campo obrigatório.'),
  email: z.string().nonempty('Campo obrigatório.').email('Email inválido.'),
  btag: z.string().nonempty('Campo obrigatório.'),
  games: z.array(z.enum(games)).default([]),
});

type FormData = z.infer<typeof FormSchema>;

interface EditAffiliateModalProps {
  affiliate: Affiliate;
  isOpen: boolean;
  onClose: () => void;
}

export const EditAffiliateModal: React.FC<EditAffiliateModalProps> = ({
  affiliate,
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const {
    isOpen: addAffiliateDoneModalIsOpen,
    onOpen: addAffiliateDoneModalOnOpen,
    onClose: addAffiliateDoneModalOnClose,
  } = useDisclosure();

  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    methods.reset({
      name: affiliate.name,
      email: affiliate.email,
      btag: affiliate.btag.toString(),
    });
  }, [methods, affiliate]);

  const selectedGames = methods.watch('games', affiliate.games);

  const onSubmit: SubmitHandler<FormData> = async ({
    name,
    email,
    btag,
    games,
  }) => {
    const removedGames = affiliate.games.filter(
      (game) => !games.includes(game)
    );

    const removedRooms = affiliate.rooms.filter((room) =>
      removedGames.includes(room.config.game)
    );

    const removals = removedRooms.map((room) =>
      updateRoom(room.id, { status: 'unavailable' })
    );

    await Promise.all(removals);

    await updateUser(affiliate.id, {
      name,
      email,
      btag: isNaN(Number(btag)) ? btag : Number(btag),
      games,
    });

    methods.reset();
    onClose();

    router.push({ pathname: router.pathname, query: router.query });

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
                      Atualizar
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>

      <EditAffiliateDoneModal
        isOpen={addAffiliateDoneModalIsOpen}
        onClose={addAffiliateDoneModalOnClose}
      />
    </>
  );
};

interface EditAffiliateDoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditAffiliateDoneModal: React.FC<EditAffiliateDoneModalProps> = ({
  isOpen,
  onClose,
}) => {
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
                <Heading fontSize="lg">Afiliado editado com sucesso!</Heading>
                <Text textAlign="center">
                  As novas informações do afiliado já foram registradas.
                </Text>
              </VStack>
            </VStack>

            <Button variant="primary" onClick={onClose}>
              Ok
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
