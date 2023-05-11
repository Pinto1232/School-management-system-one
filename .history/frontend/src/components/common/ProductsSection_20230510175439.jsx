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
  CardBody,
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
        <Card shadow={cardShadow}>
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
              <Box bg={"red"} p={2} height={400}>
                <Heading as="h3" size="md" mb={2}>
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text>${product.price}</Text>
                </Heading>
                <Box flex={CardBody} justifyContent="space-between">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature.slice(0, 20)}</li>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Card>
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
