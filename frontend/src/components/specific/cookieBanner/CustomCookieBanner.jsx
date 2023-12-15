import React from "react";
import { Box, Text, useColorModeValue, Flex } from "@chakra-ui/react";
import CustomButton from "../../common/CustomButton";

const CookieConsentBanner = ({
    backgroundColor,
    textColor,
    buttonColor,
    buttonText,
    buttonTextColor,
    message,
    onAccept
}) => {
    const bannerBgColor = useColorModeValue(
        backgroundColor || "gray.100",
        backgroundColor || "gray.800"
    );
    const bannerTextColor = useColorModeValue(
        textColor || "gray.800",
        textColor || "gray.100"
    );
    const bannerButtonColor = useColorModeValue(
        buttonColor || "blue.500",
        buttonColor || "blue.200"
    );
    const bannerButtonTextColor = useColorModeValue(
        buttonTextColor || "white",
        buttonTextColor || "gray.800"
    );

    const buttonBgColor = useColorModeValue('#319795', '#3182ce');
    const textButton = useColorModeValue('#fff', '#fff')

    return (
        <Box
            position="fixed"
            bottom="0"
            width="full" // This ensures that the banner takes the full width of the viewport
            backgroundColor={bannerBgColor}
            color={bannerTextColor}
            p={{ base: 3, sm: 4, md: 5 }} // Responsive padding
            boxShadow={{ base: "md", md: "lg" }}
            zIndex="sticky"
        >
            <Flex
                direction={{ base: "column", sm: "row" }} // Stack on top of each other on small screens, side by side on larger
                justifyContent="space-between" // This will space out the text and button
                alignItems="center" // Vertically centers the content
                textAlign={{ base: "center", sm: "left" }} // Center text on small screens, left-align on larger
            >
                <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mb={{ base: 2, sm: 0 }} // Add bottom margin on small screens
                >
                    {message || "We use cookies to ensure you get the best experience on our website. By using our site, you consent to our use of cookies."}
                </Text>
                <CustomButton
                    colorScheme={bannerButtonColor}
                    variant="solid"
                    size={{ base: "sm", md: "md" }} // Responsive button size
                    onClick={onAccept}
                    bgColor={buttonBgColor}
                    color={textButton}
                >
                    {buttonText || "Accept"}
                </CustomButton>
            </Flex>
        </Box>
    );
};

export default CookieConsentBanner;
