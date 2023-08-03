import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const UserProfileInfo = ({ avatarSrc, user, imageWidth, imageHeight }) => {
  const fontSize = "md";
  const color = "teal.500";

  return (
    <Flex align="center" gap={2}>
      <Avatar src={avatarSrc} width={imageWidth} height={imageHeight} />
      <Text whiteSpace="nowrap" color="teal.500" fontSize="md">
        Welcome..,{" "}
        <Text as="span" fontSize="md" color="gray.600">
          {user.name}{" "}
        </Text>
      </Text>
    </Flex>
  );
};

export default UserProfileInfo;
