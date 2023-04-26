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
    onAccept,
    CookieWidth
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
            width={CookieWidth}
            backgroundColor={bannerBgColor}
            color={bannerTextColor}
            px={{ base: "4", md: "6" }}
            py={{ base: "3", md: "4" }}
            boxShadow={{ base: "md", md: "lg" }}
            zIndex="999"
        >
            <Flex
                justifyContent={"space-around"}
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
                    /* size={{ base: "sm", md: "md" }} */
                    ml="3"
                    onClick={onAccept}
                    bgColor={buttonBgColor}
                    textColor={textButton}
                    fontSize={10}
                >
                    {buttonText || "Accept"}
                </CustomButton>
            </Flex>
        </Box>
    );
};

export default CookieConsentBanner;
