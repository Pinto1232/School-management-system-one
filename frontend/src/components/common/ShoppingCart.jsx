import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';


const ShoppingCart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log("Items in the cart", cartItems);
    const dispatch = useDispatch();

    const handleAdd = (item) => {
        const newItem = { ...item, id: uuidv4() };
        dispatch(addToCart(newItem));
    }

    const handleRemove = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    const cartItemRows = cartItems.map((item, index) => (
        <Flex key={`${item.id}-${index}`} justify="space-between" mb={4}>
            <Box flex={1} mr={4}>
                <Heading as="h2" size="md">
                    {item.name}
                </Heading>
                <Text color="gray.500" fontSize="sm">
                    {item.description}
                </Text>
                <Text fontWeight="bold" mt={2}>
                    ${item.price}
                </Text>
            </Box>
            <Flex gap={10}>
                <Button onClick={() => handleAdd(item)}>Add</Button>
                <Button onClick={() => handleRemove(item)}>Remove</Button>
            </Flex>
        </Flex>
    ));


    const emptyMessage = "Your cart is empty";

    return (
        <Box>
            {cartItems.length > 0 ? (
                <Box>{cartItemRows}</Box>
            ) : (
                <Text fontSize="lg" color="gray.500" textAlign="center">
                    {emptyMessage}
                </Text>
            )}
        </Box>
    );
};

export default ShoppingCart;
