import React from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Grid,
} from "@chakra-ui/react";

const ProductsSection = ({ heading, subheading, products }) => {
  return (
    <Grid py={12} maxW="1200px" mx="auto">
      <Heading as="h2" size="xl" mb={6}>
        {heading}
      </Heading>
      <Text fontSize="lg" mb={12}>
        {subheading}
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
        {products.map((product) => (
          <Box key={product.id} boxShadow="md" borderRadius="lg">
            <Image src={product.images.url} alt={product.name} borderRadius="lg" />
            <Box p={6}>
              <Heading as="h3" size="md" mb={2}>
                {product.name}
              </Heading>
              <Text mb={4}>{product.description}</Text>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">${product.price}</Text>
                <Text color="gray.500">{product.category}</Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
