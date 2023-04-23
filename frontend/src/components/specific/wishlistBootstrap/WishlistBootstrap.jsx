import { Box, Card, Button, Image, Text, Flex, Grid } from "@chakra-ui/react";
import CustomButton from "../../common/CustomButton";
import { FaCartPlus } from "react-icons/fa";


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
                                bgColor="blue.500"
                                textColor="white"
                                fontSize="16px"
                                onClick={() => onAddToCart(item)}
                                btnHover={{
                                    backgroundColor: "red"
                                }}
                            >
                                <Flex gap={2} justify="center" alignItems="center">
                                    <FaCartPlus /> Add to cart
                                </Flex>
                            </CustomButton>
                        </Grid>
                    </Card>
                </Card>
            ))}
        </Flex>
    );
};

export default WishlistBootstrap;
