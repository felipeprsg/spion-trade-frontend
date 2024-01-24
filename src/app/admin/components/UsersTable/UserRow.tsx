'use client';

import React, { useState } from 'react';

import {
  Td as ChakraTd,
  TableCellProps as ChakraTdProps,
  Button,
  Tr,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';

import { Icon, IconName } from '@/components/Icon';

import { RemoveUserModal } from './RemoveUserModal';

import { isOlderThan, timestampToDate } from '@/utils/time';
import { formatCurrency } from '@/utils/format';

import type { User } from '@/types/User';
import {
  deleteUser,
  sendResetPasswordEmail,
} from '@/database/admin/functions/system';
import { ResetPasswordModal } from './ResetPasswordModal';
import { EditUserModal } from './EditUserModal';

interface ActionButtonProps {
  icon: IconName;
  action: () => void | Promise<void>;
}

const ActionButton = ({ icon, action }: ActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await action();
    setIsLoading(false);
  };

  return (
    <Button
      variant="ghost"
      h="min"
      w="min"
      p={0}
      border="none"
      onClick={handleClick}
      isLoading={isLoading}
    >
      <Icon name={icon} color="gray.400" />
    </Button>
  );
};

const Td = ({ children, ...rest }: ChakraTdProps) => {
  return (
    <ChakraTd
      color="gray.400"
      fontSize="sm"
      fontWeight="400"
      textTransform="none"
      borderBottom="solid 1px #0F0F10"
      {...rest}
    >
      {children}
    </ChakraTd>
  );
};

interface UserRowProps {
  user: User;
}

export const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const {
    isOpen: resetPasswordIsOpen,
    onOpen: resetPasswordOnOpen,
    onClose: resetPasswordOnClose,
  } = useDisclosure();

  const {
    isOpen: removeUserIsOpen,
    onOpen: removeUserOnOpen,
    onClose: removeUserOnClose,
  } = useDisclosure();

  const {
    isOpen: editUserIsOpen,
    onOpen: editUserOnOpen,
    onClose: editUserOnClose,
  } = useDisclosure();

  return (
    <>
      <Tr>
        <Td>{user.email}</Td>

        <Td>{timestampToDate(user.licensedUntil as Date)}</Td>

        <Td>{formatCurrency(user.realBalance)}</Td>

        <Td>{user.isActive ? 'Ligado' : 'Desligado'}</Td>

        <Td>
          {!isOlderThan(user.createdAt as Date, 12) ? 'Ativo' : 'Inativo'}
        </Td>

        <Td>{formatCurrency(user.transacted)}</Td>

        <Td>
          <HStack w="100%" justify="space-between">
            <ActionButton icon="cloud" action={resetPasswordOnOpen} />
            <ActionButton icon="trash" action={removeUserOnOpen} />
            <ActionButton icon="pencil" action={editUserOnOpen} />
          </HStack>
        </Td>
      </Tr>

      <RemoveUserModal
        isOpen={removeUserIsOpen}
        onClose={removeUserOnClose}
        onConfirmRemoval={() => deleteUser(user.id)}
      />

      <ResetPasswordModal
        isOpen={resetPasswordIsOpen}
        onClose={resetPasswordOnClose}
        onConfirmReset={() => sendResetPasswordEmail(user.email)}
      />

      <EditUserModal
        user={user}
        isOpen={editUserIsOpen}
        onClose={editUserOnClose}
      />
    </>
  );
};
