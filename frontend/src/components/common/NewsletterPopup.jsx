import { useState } from "react";
import {
    Button,
    Box,
    Flex,
    Input,
    Text,
    useDisclosure,
    useMediaQuery,
    useToast,
    Spinner
} from "@chakra-ui/react";

const NewsletterPopup = ({
    onSubmit,
    placeholder = "Enter your email address",
    buttonText = "Subscribe to Our Newsletter",
    ...rest
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsButtonDisabled(event.target.value === "");
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
          // code to submit email goes here
          try {
            onSubmit(email);
            setEmail("");
            toast({
                title: "Success!",
                description: "You've successfully subscribed to our newsletter.",
                status: "success",
                duration: 5000,
                isClosable: true
            });
            setIsLoading(false);
            onClose();
          } catch (error) {
            toast({
                title: "Error!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true
            });
          }
          setIsLoading(false);
        }, 2000);
      };

 

    return (
        <Box>
            <Button onClick={onOpen} {...rest}>
                {isLargerThan768 ? buttonText : "Subscribe"}
            </Button>
            {isOpen && (
                <Box
                    bg="gray.100"
                    p={4}
                    position="fixed"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    zIndex="9999"
                >
                    <Box
                        bg="black"
                        p={4}
                        borderRadius="md"
                        maxWidth="600px"
                        mx="auto"
                        mt={{ base: "20%", md: "10%" }}
                    >
                        <Flex justifyContent="space-between" alignItems="center" mb={4}>
                            <Text fontSize="2xl" fontWeight="bold">
                                {buttonText}
                            </Text>
                            <Button onClick={onClose} variant="ghost">
                                Close
                            </Button>
                        </Flex>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="email"
                                placeholder={placeholder}
                                value={email}
                                onChange={handleEmailChange}
                                mb={4}
                                isRequired
                            />
                            <Button
                                type="submit"
                                colorScheme="blue"
                                isFullWidth
                                isLoading={isLoading}
                                isDisabled={isButtonDisabled}
                                transition="all 0.2s"
                                _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
                                _hover={{ transform: "scale(1.05)" }}
                            >
                                {isLoading ? <Spinner size="sm" /> : buttonText}
                            </Button>
                        </form>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default NewsletterPopup;
