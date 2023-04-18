import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";

const BlogPost = ({ title, author, date, imageSrc, excerpt, link }) => {
    return (
        <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            <Image src={imageSrc} alt={title} mb={4} />

            <Heading as="h3" size="md" mb={2}>
                {title}
            </Heading>

            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="sm" color="gray.500">
                    {author}
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {date}
                </Text>
            </Flex>

            <Text fontSize="md" mb={4}>
                {excerpt}
            </Text>

            <Button as="a" href={link} target="_blank">
                Read More
            </Button>
        </Box>
    );
};

export default BlogPost;
