import React from "react";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const UserProfileInfo = ({
  avatarSrc,
  user,
  imageWidth,
  imageHeight,
  bgImagePosition,
  bgImageNoRepeat,
}) => {
  const fontSize = "md";
  const color = "teal.500";

  return (
    <Flex align="center" gap={4}>
      <Box>
        <Avatar
          src={avatarSrc}
          width={imageWidth}
          height={imageHeight}
          backgroundPosition={bgImagePosition}
          backgroundRepeat={bgImageNoRepeat}
        />
      </Box>

      <Box>
        <Text whiteSpace="nowrap" color="teal.500" fontSize="md">
          <Text as="span" fontSize="md" color="gray.600">
            {user.name}{" "}
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default UserProfileInfo;
