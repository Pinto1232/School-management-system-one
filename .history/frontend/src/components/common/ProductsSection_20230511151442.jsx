import React from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Grid,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import CustomButton from "./CustomButton";

const ProductsSection = ({
  heading,
  subheading,
  products,
  imageMaxWidth,
  cardShadow,
  gridCard,
}) => {
  return (
    <Grid py={12} minW={gridCard} mx="auto">
      <Box textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={4}>
          {heading}
        </Heading>
        <Text fontSize="xl">{subheading}</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
        {products.map((product) => (
          <Box
            shadow={cardShadow}
            minH={400}
            key={product.id}
            borderRadius="lg"
          >
            {product.images.map((image, index) => (
              <Box bg={'red'} key={index}>
                <Image
                  maxW={imageMaxWidth}
                  src={image.url}
                  mx="auto"
                  backgroundSize={"cover"}
                  backgroundPosition={"center"}
                  lazy
                />
              </Box>
            ))}

            <Box p={6}>
              <Heading as="h3" size="md" mb={2}>
                <Text fontWeight="bold">{product.name}</Text>
                <Text mt={4} as="h4" fontSize={12}>
                  ${product.price}
                </Text>
              </Heading>
              <Box whiteSpace="nowrap">
                {product.features.map((feature, index) => (
                  <UnorderedList>
                    <ListItem key={index}>{feature.slice(0, 20)}</ListItem>
                  </UnorderedList>
                ))}
              </Box>
              <CustomButton margin="20px auto">check for more</CustomButton>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
