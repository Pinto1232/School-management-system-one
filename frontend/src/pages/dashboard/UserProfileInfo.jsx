// UserProfileInfo.jsx
import React from 'react';
import { Image, Text } from '@chakra-ui/react';

const UserProfileInfo = ({ avatarSrc, user, imageHeight, imageWidth }) => {
  return (
    <div>
      <Image boxSize={imageHeight} src={avatarSrc} alt={user.name} />
      <Text>{user.name}</Text>
    </div>
  );
};

export default UserProfileInfo;
