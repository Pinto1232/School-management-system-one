import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

const Header = ({ title, navLinks }) => {
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={4}
            bg="gray.800"
            color="white"
        >
            <Box display={{ base: "block", md: "none" }}>
                <Text fontSize="xl">{title}</Text>
            </Box>
            <Box display={{ base: "none", md: "block" }}>
                <Text fontSize="xl">{title}</Text>
                <Spacer />
                <nav>
                    {navLinks.map((link) => (
                        <Text key={link}>{link}</Text>
                    ))}
                </nav>
            </Box>
        </Flex>
    );
};

export default Header;
