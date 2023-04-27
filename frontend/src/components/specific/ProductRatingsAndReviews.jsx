import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const ProductRatingsAndReviews = ({ rating, numReviews, reviews }) => {
    return (
        <Box>
            <Flex justify="center" mb={8}>
                <Heading as="h2" size="lg">
                    Product Ratings and Reviews
                </Heading>
            </Flex>
            <Box>
                <Flex align="center" mb={2}>
                    <Text fontSize="xl" mr={2}>
                        {rating}
                    </Text>
                    <Box>
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < Math.floor(rating) ? "yellow.400" : "gray.400"}
                            />
                        ))}
                    </Box>
                    <Text ml={2} fontSize="sm" fontWeight="bold">
                        ({numReviews} reviews)
                    </Text>
                </Flex>
                <VStack align="flex-start" spacing={2}>
                    {reviews.map((review) => (
                        <Box key={review.id}>
                            <Text fontSize="sm" fontWeight="bold">{review.author}</Text>
                            <Box>
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < review.rating ? "yellow.400" : "gray.400"}
                                    />
                                ))}
                            </Box>
                            <Text fontSize="sm">{review.body}</Text>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};

export default ProductRatingsAndReviews;
