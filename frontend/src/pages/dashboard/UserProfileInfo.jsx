import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const UserProfileInfo = ({ avatarSrc, user, imageWidth, imageHeight }) => {
  return (
    <Flex align="center" gap={4} alignItems={'center'} alignContent={'center'}>
      <Avatar src={avatarSrc} width={imageWidth}  height={imageHeight}/>
      <Text mt={4}>{user.name}</Text>
    </Flex>
  );
};

export default UserProfileInfo;
