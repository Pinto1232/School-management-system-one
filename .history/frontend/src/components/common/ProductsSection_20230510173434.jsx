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

const ProductsSection = ({ heading, subheading, products, imageMaxWidth }) => {
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
          <Box key={product.id} borderRadius="lg">
            {product.images.map((image, index) => (
              <Box>
                <Image
                  maxW={imageMaxWidth}
                  key={index}
                  src={image.url}
                />
              </Box>
            ))}
            <Box bg={"red"} p={0}>
              <Heading as="h3" size="md" mb={2}>
                {product.name}
                <Text fontWeight="bold">${product.price}</Text>
              </Heading>
              <Box justifyContent="space-between">
                <Text mb={4}>{product.features}</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
