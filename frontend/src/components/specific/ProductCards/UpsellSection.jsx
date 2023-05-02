import { Box, Flex, Heading } from "@chakra-ui/react";
import ProductCard from "../../specific/ProductCards/ProductCard";

const UpsellSection = ({
  title,
  products,
  columns = [2, 3, 4],
  numOfProductsToShow = 4,
}) => {
  /* console.log("Columns value", columns);
   console.log('numOfProductsToShow values', numOfProductsToShow); */

  return (
    <Box>
      <Heading maxW={"6xl"} mx="auto" as="h2" size="lg" mb={4}>
        {title}
      </Heading>
      <Flex whitespace="nowrap" gap={4} justify="center">
        {products?.slice(0, numOfProductsToShow).map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            description={product.description}
            ctaText={product.ctaText}
            ctaLink={product.ctaLink}
            columns={columns}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default UpsellSection;
