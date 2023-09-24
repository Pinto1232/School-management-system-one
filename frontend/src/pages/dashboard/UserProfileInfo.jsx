import React from "react";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const UserProfileInfo = ({ avatarSrc, user }) => {
  const fontSize = "lg";
  const smallSize = "65px"; // Adjust this value for smaller or larger sizes
  const textColor = useColorModeValue("#fff", "#fff");

  return (
    <Flex align="center" gap={2}>
      <Avatar
        src={avatarSrc}
        boxSize={smallSize}
        borderRadius="50%"
        objectFit="cover"
      />
      <Text whiteSpace="nowrap" color={textColor} fontSize={fontSize}>
        Welcome..,{" "}
        <Text as="span" fontSize={fontSize} color={textColor}>
          {user.name}
        </Text>
      </Text>
    </Flex>
  );
};

export default UserProfileInfo;
