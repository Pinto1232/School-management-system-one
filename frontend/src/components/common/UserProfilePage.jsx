import React from "react";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";

const UserProfilePage = ({ username, fullName, profilePicture, bio }) => {
    return (
        <Flex direction="column" align="center" w="100%" maxW="900px" m="auto">
            <Box w="100%" p="4">
                <Avatar size="2xl" name={fullName} src={profilePicture} />
            </Box>
            <Box w="100%" p="4">
                <Heading as="h1" fontSize="4xl">
                    {username}
                </Heading>
                <Text fontSize="xl" fontWeight="bold">
                    {fullName}
                </Text>
                <Text fontSize="md" my="4">
                    {bio}
                </Text>
            </Box>
        </Flex>
    );
};

export default UserProfilePage;
