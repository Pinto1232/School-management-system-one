import { Flex, Heading, Text, Stack, Avatar, Box } from "@chakra-ui/react";

const UserProfile = ({
  name,
  username,
  email,
  avatarSrc,
  imageWidth,
  ImageHeight,
}) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      maxW={{ base: "100%", md: "900px" }}
      mx="auto"
      my={8}
      px={4}
    >
      <Avatar
        size={{ base: "xl", md: "2xl" }}
        name={name}
        src={avatarSrc}
        w={imageWidth}
        h={ImageHeight}
        mr={{ base: 0, md: 8 }}
        mb={{ base: 4, md: 0 }}
      />
      <Stack spacing={4} flex={1}>
        <Heading as="h1" size="xl">
          {name}
        </Heading>
        <Text fontSize="xl">{username}</Text>
        <Text fontSize="xl">{email}</Text>
        <Box>
          {/* User profile information or components can be added here */}
        </Box>
      </Stack>
    </Flex>
  );
};

export default UserProfile;
