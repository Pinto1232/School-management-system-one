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
      <Box textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={4}>
          {heading}
        </Heading>
        <Text fontSize="xl">{subheading}</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
        {products.map((product) => (
          <Box key={product.id} boxShadow="md" borderRadius="lg">
            {product.images.map((image, index) => (
              <Image  maxW={100} key={index} src={image.url} borderRadius="lg" />
            ))}
            <Box p={6}>
              <Heading as="h3" size="md" mb={2}>
                {product.name}
                <Text fontWeight="bold">${product.price}</Text>
              </Heading>
              <Flex justifyContent="space-between">
                <Text mb={4}>{product.features}</Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
