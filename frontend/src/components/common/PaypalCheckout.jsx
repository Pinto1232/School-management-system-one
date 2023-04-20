import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    useToast,
} from "@chakra-ui/react";
import PaypalButton from "react-paypal-express-checkout";



const PaypalCheckout = ({ items, total, onSuccess, handleCheckoutCancel }) => {
    const [cartItems, setCartItems] = useState(items);
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const handleAdd = (item) => {
        const newItem = { ...item, id: Math.random().toString() };
        setCartItems([...cartItems, newItem]);
    };

    const handleRemove = (item) => {
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(newCartItems);
    };

    const handleCheckout = () => {
        setIsLoading(true);
        // the rest of the checkout logic
    }

    const handleSuccess = () => {
        // logic goes here
    }

    const handleError = () => {
        // logic goes here
    }

    const onSuccessHandler = (payment) => {
        toast({
            title: "Payment Successful!",
            description: `Payment ID: ${payment.paymentID}`,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onSuccess();
    };

    const onErrorHandler = (error) => {
        toast({
            title: "Payment Error!",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    };

    const onCancelHandler = (data) => {
        toast({
            title: "Payment Cancelled!",
            description: "The payment was cancelled by the user.",
            status: "info",
            duration: 5000,
            isClosable: true,
        });
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    /* const client = {
        sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
        production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
    }; */

    const client = {
        sandbox: 'YOUR_SANDBOX_CLIENT_ID',
        production: 'YOUR_PRODUCTION_CLIENT_ID',
    };

    /* const env = process.env.REACT_APP_PAYPAL_ENVIRONMENT; */

    const currency = "USD";

    const style = {
        size: "responsive",
        color: "blue",
        shape: "pill",
        label: "checkout",
        tagline: false,
    };

    const paypalOptions = {
        /* env, */
        /* client, */
        currency,
        style,
        commit: true,
        payment: () => {
            const items = cartItems.map((item) => ({
                name: item.name,
                description: item.description,
                quantity: 1,
                price: item.price.toFixed(2),
                currency: currency,
            }));

            const total = getTotal().toFixed(2);

            const data = {
                intent: "sale",
                payer: { payment_method: "paypal" },
                transactions: [
                    {
                        item_list: { items },
                        amount: { total, currency },
                    },
                ],
                redirect_urls: {
                    return_url: `${process.env.REACT_APP_BASE_URL}/success`,
                    cancel_url: `${process.env.REACT_APP_BASE_URL}/cancel`,
                },
            };
            return new Promise((resolve, reject) => {
                resolve(data);
            });
        },
        onAuthorize: (data, actions) => {
            return actions.payment.execute().then((payment) => {
                onSuccessHandler(payment);
            });
        },
        onError: onErrorHandler,
        onCancel: onCancelHandler,
    };

    return (
        <Box>
            <Flex direction={{ base: "column", md: "row" }} justify="space-between">
                <Box flex={1} mr={{
                    base: 0,
                    md: 10,
                }}>
                    <Box mb={6}>
                        <Heading as="h1" size="2xl">
                            Checkout
                        </Heading>
                        <Text color="gray.500" fontSize="lg">
                            Please review your order below.
                        </Text>
                    </Box>
                    <Box mb={8}>
                        {cartItems.map((item) => (
                            <Flex key={item.id} justify="space-between" mb={4}>
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
                        ))}
                    </Box>
                    <Box mb={8}>
                        <Heading as="h3" size="lg" mb={4}>
                            Order Total: ${total}
                        </Heading>
                        <Button onClick={handleCheckout} isLoading={isLoading}>
                            Checkout
                        </Button>
                    </Box>
                </Box>
                <Box >
                    <PaypalButton
                        amount={total}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        onCancel={handleCheckoutCancel}
                    />
                </Box>
            </Flex>
        </Box>
    );
}

export default PaypalCheckout;
