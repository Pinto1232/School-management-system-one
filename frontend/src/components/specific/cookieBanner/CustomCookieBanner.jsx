import React from "react";
import { Button, Box, Text, useColorModeValue, Flex } from "@chakra-ui/react";
import CustomButton from "../../common/CustomButton";

const CookieConsentBanner = ({
    backgroundColor,
    textColor,
    buttonColor,
    buttonText,
    buttonTextColor,
    message,
    onAccept,
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

    return (
        <Box
            position="fixed"
            bottom="0"
            width="100%"
            backgroundColor={bannerBgColor}
            color={bannerTextColor}
            px={{ base: "4", md: "6" }}
            py={{ base: "3", md: "4" }}
            boxShadow={{ base: "md", md: "lg" }}
            zIndex="999"
        >
            <Flex
                justifyContent={"space-between"}
                justify="center"
                alignItems="center"
            >
                <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                >
                    {message ||
                        "We use cookies to ensure you get the best experience on our website. By using our site, you consent to our use of cookies."}
                </Text>
                <CustomButton
                    colorScheme={bannerButtonColor}
                    variant="solid"
                    size={{ base: "sm", md: "md" }}
                    ml="3"
                    onClick={onAccept}
                    bgColor={'blue'}
                >
                    {buttonText || "Accept"}
                </CustomButton>
            </Flex>
        </Box>
    );
};

export default CookieConsentBanner;
