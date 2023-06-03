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
  useColorModeValue,
  Spacer,
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
  const bottomBgColor = useColorModeValue("#319795", "#3182ce");
  const textColor = useColorModeValue("#fff", "#fff");
  const btnTextColor = useColorModeValue("#000", "#fff");
  const textFontSize = useColorModeValue("13px", "13px");

  return (
    <Grid py={12} minW={gridCard} mx="auto">
      <Box textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={4}>
          {heading}
        </Heading>
        <Text fontSize="xl">{subheading}</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={2}>
        {Array.isArray(products) &&
          products.slice(0, 3).map((product, ids) => (
            <Box
              bg={bottomBgColor}
              shadow={cardShadow}
              minH={300}
              key={ids}
              borderRadius="lg"
              color={textColor}
              d="flex"
              flexDirection="column"
            >
              {product.images.map((image, id) => (
                <Box bg={"#fff"} key={`image-${id}`}>
                  <Image
                    maxW={imageMaxWidth}
                    src={image.url}
                    mx="auto"
                    backgroundSize={"cover"}
                    backgroundPosition={"center"}
                    loading="lazy"
                  />
                </Box>
              ))}

              <Flex flexGrow={1} p={2} flexDirection="column" height="120px">
                <Heading as="h3" size="md" mb={2}>
                  <Text fontWeight="bold">{product.name}</Text>
                </Heading>
                <Text mt={4} fontSize={12}>
                  ${product.price}
                </Text>
                <Box whiteSpace="nowrap" flexGrow={1}>
                  <UnorderedList>
                    {product.features.map((feature, index) => (
                      <ListItem key={`feature-${index}`}>
                        {feature.slice(0, 34)}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              </Flex>

              <Spacer mt={60} />
              <Box m={8}>
                <CustomButton
                  textColor={btnTextColor}
                  fontSize={textFontSize}
                  width={"full"}
                >
                  Buy now
                </CustomButton>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
