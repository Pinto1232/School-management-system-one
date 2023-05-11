import React from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Grid,
  Card,
} from "@chakra-ui/react";

const ProductsSection = ({
  heading,
  subheading,
  products,
  imageMaxWidth,
  cardShadow,
}) => {
  return (
    <Grid py={12} minW={900} mx="auto">
      <Box textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={4}>
          {heading}
        </Heading>
        <Text fontSize="xl">{subheading}</Text>
      </Box>
      <SimpleGrid shadow={cardShadow} columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
        {products.map((product) => (
          <Box key={product.id} borderRadius="lg">
            {product.images.map((image, index) => (
              <Box bg={"#fff"}>
                <Image
                  maxW={imageMaxWidth}
                  key={index}
                  src={image.url}
                  mx="auto"
                />
              </Box>
            ))}
            <Box bg={"red"} p={2} minH={400}>
              <Heading as="h3" size="md" mb={2}>
                <Text fontWeight="bold">{product.name}</Text>
                <Text>${product.price}</Text>
              </Heading>
              <Box justifyContent="space-between">
                {/* <Text mb={4}>{product.features}</Text> */}
                {product.features.map((feature, index) => (
                  <li key={index}>{feature.slice(0, 20)}</li>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
