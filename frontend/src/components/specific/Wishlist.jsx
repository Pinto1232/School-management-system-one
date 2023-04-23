import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const WishlistItem = ({ imageUrl, name, price }) => {
    return (
        <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <Image src={imageUrl} alt={name} h="200px" w="100%" objectFit="cover" />
            <Box p="4">
                <Text fontSize="xl" fontWeight="semibold" mb="2">
                    {name}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="purple.500">
                    ${price}
                </Text>
            </Box>
        </Box>
    );
};

const Wishlist = ({ items }) => {
    return (
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            {items.map((item) => (
                <GridItem key={item.id}>
                    <WishlistItem imageUrl={item.imageUrl} name={item.name} price={item.price} />
                </GridItem>
            ))}
        </Grid>
    );
};

export default Wishlist;
