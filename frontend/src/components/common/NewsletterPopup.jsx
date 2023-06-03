import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
  Spinner,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import imageBg from "../../assets/images/school.jpg";
import { FaEnvelope } from "react-icons/fa";
import { CloseIcon } from "@chakra-ui/icons";

const NewsletterPopup = ({
  onSubmit,
  placeholder = "Enter your email address",
  /*   buttonText = "Subscribe to Our Newsletter", */
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

  const handleSubmit = (e) => {
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
          isClosable: true,
        });
        setIsLoading(false);
        onClose();
      } catch (error) {
        toast({
          title: "Error!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const bgButtonColor = useColorModeValue("#319795", "#3182ce");
  const backgroundColor = useColorModeValue("#F7FAFC", "gray.700");
  const textFieldBackgroundColor = useColorModeValue("#E2E8F0", "#4A5568");
  const textFieldColor = useColorModeValue("#4A5568", "#fff");

  return (
    <Box>
      <Box onClick={onOpen} {...rest}>
        {isLargerThan768 ? (
          <CustomButton bgColor={bgButtonColor}>
            <Flex gap={2} justify={"center"} alignItems={"center"}>
              <FaEnvelope />
              Subscribe
            </Flex>
          </CustomButton>
        ) : (
          "Subscribe"
        )}
      </Box>
      {isOpen && (
        <Box
          /* bg="gray.100" */
          backgroundImage={`url(${imageBg})`}
          backgroundSize="cover"
          backgroundPosition="center center"
          p={4}
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="9999"
        >
          <Box
            bg={backgroundColor}
            p={4}
            borderRadius="md"
            maxWidth="600px"
            mx="auto"
            mt={{ base: "20%", md: "10%" }}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="2xl" fontWeight="bold">
                <Heading color={textFieldColor}>
                  <Heading as="p" fontSize={20}>
                    Please provide your email
                  </Heading>
                </Heading>
              </Text>
              <CustomButton
                bgColor={bgButtonColor}
                onClick={onClose}
                variant="ghost"
                rightIcon={<CloseIcon />}
              ></CustomButton>
            </Flex>
            <Box>
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={handleEmailChange}
                  mb={4}
                  isRequired
                  bg={textFieldBackgroundColor}
                />
                <Box
                  type="submit"
                  isFullWidth
                  isLoading={isLoading}
                  isDisabled={isButtonDisabled}
                  transition="all 0.2s"
                  _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
                  /* _hover={{ transform: "scale(1.05)" }} */
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    <CustomButton bgColor={bgButtonColor}>Submit</CustomButton>
                  )}
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NewsletterPopup;
