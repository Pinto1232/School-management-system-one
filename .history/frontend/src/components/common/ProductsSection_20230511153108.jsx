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
  const btnTextColor = useColorModeValue("#fff", "#fff");
  const buttonColor = useColorModeValue("transparent", "transparent");
  const textFontSize = useColorModeValue("12px", "12px");

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
            bg={bottomBgColor}
            shadow={cardShadow}
            minH={300}
            key={product.id}
            borderRadius="lg"
            color={textColor}
          >
            {product.images.map((image, index) => (
              <Box bg={"#fff"} key={index}>
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
              <CustomButton
                margin="20px auto"
                textColor={btnTextColor}
                bgColor={buttonColor}
                fontSize={textFontSize}
              >
                check for more...
              </CustomButton>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Grid>
  );
};

export default ProductsSection;
