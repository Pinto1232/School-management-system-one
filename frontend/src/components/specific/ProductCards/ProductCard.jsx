import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";

const ProductCard = ({ name, price, imageUrl, description, ctaText, ctaLink }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" margin={0}>
      <Image w="100%" src={imageUrl} alt={name} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Text fontSize="xl" fontWeight="semibold" mr={2}>
            {name}
          </Text>
          <Text fontSize="lg" color="gray.600">
            ${price}
          </Text>
        </Box>
        <Box mt="1" fontSize="lg" fontWeight="semibold" lineHeight="short">
          {description}
        </Box>

        <Flex mt="2" py={2} justifyContent="space-between" alignItems="center">
          <Button as="a" href={ctaLink} colorScheme="blue" variant="solid">
            {ctaText}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
