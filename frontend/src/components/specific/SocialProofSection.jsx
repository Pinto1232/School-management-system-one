import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";

const SocialProofSection = ({ heading, text, imageSrc }) => {
    return (
        <Flex
            bg="gray.50"
            p={[4, 8]}
            flexDir={["column", "row"]}
            alignItems="center"
            justifyContent="center"
        >
            <Box
                maxWidth={["100%", "50%"]}
                mr={[0, 8]}
                mb={[8, 0]}
                textAlign={["center", "left"]}
            >
                <Heading as="h3" size="md" color={'#000'} mb={4}>
                    {heading}
                </Heading>
                <Text  color={'#000'} fontSize="lg">{text}</Text>
            </Box>
            <Image
                src={imageSrc}
                alt={heading}
                maxWidth={["100%", "50%"]}
                borderRadius="md"
            />
        </Flex>
    );
};

export default SocialProofSection;
