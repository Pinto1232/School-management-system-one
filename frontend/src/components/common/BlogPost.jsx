import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";

const BlogPost = ({
  cardWidth,
  TextSize,
  CenterPositon,
  setButtonOff,
  title,
  author,
  date,
  imageSrc,
  excerpt,
  link,
  imageDisplay,
  cardHeight,
  imageH,
}) => {
  return (
    <Box
      w={cardWidth}
      p={4}
      shadow="lg"
      borderWidth="1px"
      borderRadius="md"
      h={cardHeight}
    >
      <Image
        display={imageDisplay}
        maxH={imageH}
        src={imageSrc}
        alt={title}
        mb={4}
      />

      <Heading
        fontSize={TextSize}
        textAlign={CenterPositon}
        as="h3"
        size="md"
        mb={2}
      >
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

      <Button display={setButtonOff} as="a" href={link} target="_blank">
        Read More
      </Button>
    </Box>
  );
};

export default BlogPost;
