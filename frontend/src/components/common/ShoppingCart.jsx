import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Spacer,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const ShoppingCart = ({ items, onItemRemove, onQuantityChange, src }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Calculate the total price of all items in the cart
    const totalPrice = items ? items.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;


    return (
        <Box pos="relative">
            <IconButton
                aria-label="Open Shopping Cart"
                icon={<Image {...src} alt="Shopping Cart" w={6} h={6} />}
                onClick={onOpen}
                pos="fixed"
                bottom={4}
                right={4}
                zIndex={1}
                bg="white"
                _hover={{ bg: "gray.100" }}
            />
            <Box
                pos="fixed"
                right={0}
                top={0}
                bottom={0}
                width={{ base: "100%", md: "400px" }}
                bg="gray.600"
                borderLeftWidth={1}
                borderColor="gray.100"
                p={4}
                overflowY="auto"
                transition="transform 0.3s ease-in-out"
                transform={isOpen ? "translateX(0)" : "translateX(100%)"}
            >
                <Flex justify="space-between" align="center">
                    <Heading size="md">Shopping Cart</Heading>
                    <IconButton
                        aria-label="Close Shopping Cart"
                        icon={<CloseIcon />}
                        onClick={onClose}
                    />
                </Flex>
                {items && items.length > 0 ? (
                    <Box>
                        <SimpleGrid columns={2} spacing={2} my={4}>
                            <Text fontSize="sm" fontWeight="bold">
                                Item
                            </Text>
                            <Text fontSize="sm" fontWeight="bold" textAlign="right">
                                Quantity
                            </Text>
                            {items.map((item) => (
                                <React.Fragment key={item.id}>
                                    <Text fontSize="sm">{item.name}</Text>
                                    <Flex align="center" justify="flex-end">
                                        <IconButton
                                            aria-label="Remove Item"
                                            icon={<CloseIcon />}
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onItemRemove(item.id)}
                                        />
                                        <InputGroup size="sm" width={20}>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children="$"
                                                color="gray.300"
                                                fontSize="1.2em"
                                            />
                                            <Input
                                                type="number"
                                                min={1}
                                                value={item.quantity}
                                                onChange={(e) => onQuantityChange(item.id, e.target.value)}
                                            />
                                        </InputGroup>
                                    </Flex>
                                </React.Fragment>
                            ))}
                        </SimpleGrid>
                        <Flex align="center" justify="flex-end">
                            <Text fontSize="lg" fontWeight="bold" mr={2}>
                                Total:
                            </Text>
                            <Text fontSize="lg" fontWeight="bold">
                                ${totalPrice.toFixed(2)}
                            </Text>
                        </Flex>
                        <Button colorScheme="blue" mt={4}>
                            Checkout
                        </Button>
                    </Box>
                ) : (
                    <Text fontSize="sm">Your cart is empty.</Text>
                )}
            </Box>
        </Box>
    );
};

export default ShoppingCart;
