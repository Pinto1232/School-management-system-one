import React from "react";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const UserProfileInfo = ({ avatarSrc, user }) => {
  const fontSize = "lg";
  const smallSize = "70px"; // Adjust this value for smaller or larger sizes
  const textColor = useColorModeValue("#fff", "#fff");

  return (
    <Flex align="center" w="300px"> {/* Set the starting width here */}
      <Avatar
        src={avatarSrc}
        boxSize={smallSize}
        borderRadius="50%"
        objectFit="cover"
      />
      <Text whiteSpace="nowrap" color={textColor} fontSize={fontSize} px={2}>
        Welcome,{" "}
        <Text as="span" fontSize={fontSize} color={textColor}>
          {user.name}
        </Text>
      </Text>
    </Flex>
  );
};

export default UserProfileInfo;
