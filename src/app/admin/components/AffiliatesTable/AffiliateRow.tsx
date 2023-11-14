import React, { useState } from 'react';

import {
  Avatar,
  Td as ChakraTd,
  TableCellProps as ChakraTdProps,
  HStack,
  Heading,
  Tr,
  VStack,
  Text,
  Tag,
  TagLabel,
  Link,
  TagProps,
  Button,
} from '@chakra-ui/react';

import { Icon } from '@/app/components/Icon';

import type { Affiliate } from '@/types/Affiliate';
import type { Room } from '@/types/Room';

interface RoomTagProps extends TagProps {
  index: number;
  room: Room;
}

export const RoomTag = ({ index, room, ...rest }: RoomTagProps) => {
  const colors = [
    { bg: '#F9F5FF', color: '#6941C6' },
    { bg: '#EFF8FF', color: '#175CD3' },
    { bg: '#EEF4FF', color: '#3538CD' },
  ];

  return (
    <Tag
      as={Link}
      href={room.config.inviteLink}
      isExternal
      bgColor={colors[index % colors.length].bg}
      borderRadius="full"
      _hover={{ textDecoration: 'none', opacity: 0.75 }}
      _active={{ textDecoration: 'none', opacity: 0.5 }}
      {...rest}
    >
      <TagLabel
        color={colors[index % colors.length].color}
        fontSize="xs"
        fontWeight="600"
      >
        {room.config.game}
      </TagLabel>
    </Tag>
  );
};

interface ActionButtonProps {
  iconName: Parameters<typeof Icon>[0]['name'];
  action: () => void | Promise<void>;
}

const ActionButton = ({ iconName, action }: ActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await action();
    setIsLoading(false);
  };

  return (
    <Button
      variant="secondary"
      h="min"
      w="min"
      p={0}
      border="none"
      onClick={handleClick}
      isLoading={isLoading}
    >
      <Icon name={iconName} color="gray.500" boxSize={5} />
    </Button>
  );
};

const Td = ({ children, ...rest }: ChakraTdProps) => {
  return (
    <ChakraTd
      color="gray.500"
      fontSize="xs"
      fontWeight="400"
      textTransform="none"
      {...rest}
    >
      {children}
    </ChakraTd>
  );
};

interface AffiliateRowProps {
  affiliate: Affiliate;
  handleAffiliateRooms: () => void;
  handleToggleRoomStatus: () => Promise<void>;
  handleRemoveAffiliate: () => void;
  handleEditAffiliate: () => void;
}

export const AffiliateRow: React.FC<AffiliateRowProps> = ({
  affiliate,
  handleAffiliateRooms,
  handleToggleRoomStatus,
  handleRemoveAffiliate,
  handleEditAffiliate,
}) => {
  const isSuspended = !!affiliate.rooms.find(
    (room) => room.status === 'suspended'
  );

  const membersCount = affiliate.rooms.reduce(
    (sum, room) => sum + room.members.count,
    0
  );

  const newMembersCount = affiliate.rooms.reduce(
    (sum, room) => sum + room.members.new,
    0
  );

  return (
    <Tr>
      <Td>
        <HStack spacing={3}>
          <Avatar
            name={affiliate.name}
            boxSize={10}
            bgColor="#F9F5FF"
            color="#7F56D9"
          />

          <VStack spacing={0} align="start">
            <Heading fontSize="sm" fontWeight="500">
              {affiliate.name.split(' ').slice(0, 2).join(' ')}
            </Heading>
            <Text textTransform="lowercase">
              @{affiliate.name.split(' ')[0]}
            </Text>
          </VStack>
        </HStack>
      </Td>
      <Td>
        <Tag bgColor="gray.100" borderRadius="full" p={0} px="6px">
          <TagLabel color="gray.700" fontSize="xs" fontWeight="600">
            {affiliate.btag}
          </TagLabel>
        </Tag>
      </Td>
      <Td>{membersCount}</Td>
      <Td>{newMembersCount}</Td>
      <Td>{affiliate.email}</Td>
      <Td>
        {affiliate.rooms.map((room, index) => {
          if (index <= 2) {
            return (
              <RoomTag
                key={index}
                index={index}
                room={room}
                ml={1}
                _first={{ ml: 0 }}
              />
            );
          }
        })}

        {affiliate.rooms.length > 3 && (
          <Tag
            ml={1}
            bgColor="#F2F4F7"
            borderRadius="full"
            onClick={handleAffiliateRooms}
            _hover={{ cursor: 'pointer', opacity: 0.75 }}
            _active={{ cursor: 'pointer', opacity: 0.5 }}
          >
            <TagLabel color="gray.700" fontSize="xs" fontWeight="600">
              +{affiliate.rooms.length - 3}
            </TagLabel>
          </Tag>
        )}
      </Td>
      <Td>
        <HStack spacing={1}>
          <ActionButton
            iconName={isSuspended ? 'cloud' : 'minus'}
            action={handleToggleRoomStatus}
          />
          <ActionButton iconName="trash" action={handleRemoveAffiliate} />
          <ActionButton iconName="pencil" action={handleEditAffiliate} />
        </HStack>
      </Td>
    </Tr>
  );
};
