import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import CustomButton from "../../common/CustomButton";

const ExitIntentPopup = ({
    content,
    onClose,
    fontSizeHeading = "lg",
    fontSizeText = "md",
    backgroundColor = "rgba(0,0,0,0.4)",
    cardColor = "gray.600",
    textColor = "#fff",
    buttonColorYes = "green",
    buttonColorNo = "red",
    cardWidth,
    cardHeight,
    cardMargin,
    cardPadding
}) => {
    const { isOpen, onClose: onClosePopup } = useDisclosure();
    const [showPopup, setShowPopup] = useState(false);
    const [timer, setTimer] = useState(null);
    const toast = useToast();

    useEffect(() => {
        document.addEventListener("mouseleave", handleMouseLeave);
        setTimer(setTimeout(() => setShowPopup(true), 10000));

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timer);
        };
    }, [timer]);

    const handleMouseLeave = (e) => {
        if (e.clientY <= 0) {
            setShowPopup(true);
        }
    };

    const handleClose = () => {
        onClosePopup();
        onClose();
        toast({
            title: "Thank you for visiting!",
            description: "Come back soon!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleNoClick = () => {
        onClosePopup();
        onClose();
        setShowPopup(false);
    };

    return (
        <Box>
            {showPopup && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    bg={backgroundColor}
                    zIndex={9999}
                >
                    <Flex
                        bg={cardColor}
                        direction="column"
                        alignItems="center"
                        p={4}
                        borderRadius="md"
                        shadow="md"
                        position="fixed"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        zIndex={99999}
                        color={textColor}
                        width={cardWidth}
                        height={cardHeight}
                        padding={cardPadding}
                        margin={cardMargin}
                    >
                        <Heading as="h2" size={fontSizeHeading} textAlign="center" mb={4}>
                            {content.title}
                        </Heading>
                        <Text fontSize={fontSizeText} textAlign="center" mb={6}>
                            {content.message}
                        </Text>
                        <Flex>
                            <CustomButton
                                colorScheme={buttonColorYes}
                                size="md" mr={4}
                                onClick={handleClose}
                                width={100}
                            >
                                Yes
                            </CustomButton>
                            <CustomButton
                                colorScheme={buttonColorNo}
                                size="md"
                                onClick={handleNoClick}
                                width={100}
                            >
                                No
                            </CustomButton>
                        </Flex>
                    </Flex>
                </Box>
            )}
        </Box>
    );
};

export default ExitIntentPopup;
