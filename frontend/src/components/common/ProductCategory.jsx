import { Box, Flex, Image, Heading, Text, Button } from "@chakra-ui/react";

const ProductCard = ({ name, price, imageUrl, description, ctaText, ctaLink }) => {
    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" margin={0}>
            <Image w="350px"   src={imageUrl} alt={name} />
            <Box mt="2" mx="2">
                <Text fontSize="2xl" fontWeight="semibold" as="h4">
                    {name}
                </Text>
                <Text mt="1" fontSize="lg" fontWeight="semibold" color="gray.600">
                    {description}
                </Text>
                <Flex mt="2"py={2} justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold" fontSize="xl">
                        ${price}
                    </Text>
                    <Button as="a" href={ctaLink} colorScheme="blue" variant="outline">
                        {ctaText}
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

const ProductCategory = ({ title, productCategoryData }) => {
    return (
        <Box>
            <Heading as="h2" size="lg" mb={4}>
                {title}
            </Heading>
            <Flex whitespace="nowrap" gap={4} justify="center">
                {productCategoryData.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.imageUrl}
                        description={product.description}
                        ctaText={product.ctaText}
                        ctaLink={product.ctaLink}
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default ProductCategory;
