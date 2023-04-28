import { Box, Center, Heading, Text } from "@chakra-ui/react";

const TwitterFeed = ({ tweets }) => {
    return (
        <Box maxW="800px" mx="auto" p={4}>
            <Heading as="h2" mb={4} textAlign="center">
                Twitter Feed
            </Heading>
            {Array.isArray(tweets) && tweets.map((tweet) => (
                <Box key={tweet.id} borderBottom="1px solid #ddd" py={2}>
                    <Text fontSize="lg" fontWeight="bold">
                        {tweet.user.name}
                    </Text>
                    <Text>{tweet.text}</Text>
                    <Center mt={2}>
                        <Text as="a" href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`} target="_blank" rel="noopener noreferrer">
                            View on Twitter
                        </Text>
                    </Center>
                </Box>
            ))}
        </Box>
    );
};

export default TwitterFeed;
