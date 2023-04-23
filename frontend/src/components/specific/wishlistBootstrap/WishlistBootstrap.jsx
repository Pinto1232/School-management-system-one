import { Box, Card, Button, Image, Text, Flex, Grid } from "@chakra-ui/react";
import CustomButton from "../../common/CustomButton";


const WishlistBootstrap = ({ items, onAddToCart, title, description }) => {
    return (
        <Flex gap={3} justify="center" mb={4}>
            <h2>{title}</h2>
            <p>{description}</p>
            {items.map((item) => (
                <Card key={item.id}>
                    <Image variant="top" src={item.imageUrl} />
                    <Card px={10}>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>

                        <Grid mb={10} mt={10}>
                            <CustomButton
                                bgButton="blue"
                                textStyle={{ fontSize: "16px", color: "red" }}
                                onClick={() => onAddToCart(item)}
                                width="100%"
                                textColor="red"
                            >
                                Add to cart
                            </CustomButton>
                        </Grid>
                    </Card>
                </Card>
            ))}
        </Flex>
    );
};

export default WishlistBootstrap;
