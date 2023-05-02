import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const BlogPostSection = ({ title, author, date, excerpt, imageUrl }) => {
  return (
    <Flex direction={{ base: "column", md: "row" }} my={8}>
      <Image src={imageUrl} w={{ base: "100%", md: "30%" }} mr={{ md: 6 }} />
      <Box w={{ base: "100%", md: "70%" }}>
        <Heading size="lg" my={2}>
          {title}
        </Heading>
        <Text my={2}>
          By {author} on {date}
        </Text>
        <Text my={2}>{excerpt}</Text>
      </Box>
    </Flex>
  );
};

export default BlogPostSection;
