import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const HeroSection = ({ title,
    subtitle,
    bgImage,
    bgColor,
    height,
    textAlign,
    titleColor,
    subtitleColor }) => {


    return (
        <Box
            bgImage={bgImage ? `url(${bgImage})` : "none"}
            bgColor={bgColor ? bgColor : "transparent"}
            backgroundSize="cover"
            backgroundPosition="center center"
            height={height ? height : "100vh"}
            position="relative"
            overflow="hidden"
        >
            <Flex
                direction="column"
                justify="center"
                alignItems={textAlign ? textAlign : "center"}
                height="100%"
                position="relative"
                zIndex="1"
                px={{ base: "4", md: "8", lg: "12", xl: "24" }}
            >
                <Heading as="h1" size="4xl" color={titleColor ? titleColor : "white"} lineHeight="1.2" mb="6">
                    {title}
                </Heading>
                <Text as="h2" fontSize="2xl" color={subtitleColor ? subtitleColor : "white"} fontWeight="medium">
                    {subtitle}
                </Text>
            </Flex>
        </Box>
    );
};

export default HeroSection;
