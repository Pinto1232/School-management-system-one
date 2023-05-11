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
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
        {products.map((product) => (
          <Box shadow={cardShadow} minH={400}   key={product.id} borderRadius="lg">
            {product.images.map((image, index) => (
              <Box minH={400}  bg={"#fff"}>
                <Image
                  maxW={imageMaxWidth}
                  key={index}
                  src={image.url}
                  mx="auto"
                />
              </Box>
            ))}
            <Box p={6} >
              <Heading as="h3" size="md" mb={2}>
                <Text fontWeight="bold">{product.name}</Text>
                <Text>${product.price}</Text>
              </Heading>
              <Box whiteSpace="nowrap" >
                {product.features.map((feature, index) => (
                  <Text key={index}>{feature.slice(0, 20)}</Text>
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
