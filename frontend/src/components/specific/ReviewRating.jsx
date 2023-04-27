import { Box, Flex, Text } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState } from "react";

const ReviewRating = ({ review }) => {
  const [upvotes, setUpvotes] = useState(review.upvotes || 0);
  const [downvotes, setDownvotes] = useState(review.downvotes || 0);

  const handleUpvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes((prevDownvotes) => prevDownvotes + 1);
  };

  return (
    <Box mt={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p={4}>
        <Text fontSize="xl" fontWeight="bold">
          {review.title}
        </Text>
        <Text fontSize="md" mt={2}>
          {review.text}
        </Text>
        <Flex mt={4}>
          <Box
            as="button"
            mr={2}
            onClick={handleUpvote}
            _hover={{ cursor: "pointer" }}
          >
            <Flex alignItems="center">
              <FaThumbsUp size={20} />
              <Text ml={1}>{upvotes}</Text>
            </Flex>
          </Box>
          <Box
            as="button"
            onClick={handleDownvote}
            _hover={{ cursor: "pointer" }}
          >
            <Flex alignItems="center">
              <FaThumbsDown size={20} />
              <Text ml={1}>{downvotes}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ReviewRating;
