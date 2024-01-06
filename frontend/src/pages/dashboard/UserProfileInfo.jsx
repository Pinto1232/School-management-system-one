import React from "react";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useUserContext } from "../../contexts/UserContext";

const UserProfileInfo = ({ avatarSrc }) => {
  const fontSize = "lg";
  const smallSize = "70px"
  const textColor = useColorModeValue("#fff", "#fff");
  const { user } = useUserContext();

  return (
    <Flex align="center" w="300px">
      <Avatar
        src={user?.image
        }
        boxSize={smallSize}
        borderRadius="50%"
        objectFit="cover"
      />
    </Flex>
  );
};

export default UserProfileInfo;