import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const HeroSection = ({
  title,
  subtitle,
  bgImage,
  bgColor,
  height,
  textAlign,
  titleColor,
  subtitleColor,
  textButton,
}) => {
  return (
    <Box
      position="absolute"
      height={height ? height : "100vh"}
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgImage={`url(${bgImage})`}
        bgSize="cover"
        bgPosition="center center"
        bgRepeat="no-repeat"
        bgColor={bgColor ? bgColor : "transparent"}
        opacity="0.8"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgGradient="linear(to-b, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))"
      />
      <Flex
        direction="column"
        justify="center"
        alignItems={textAlign ? textAlign : "center"}
        height="100%"
        position="relative"
        zIndex="1"
        px={{ base: "4", md: "8", lg: "12", xl: "24" }}
      >
        <Heading
          as="h1"
          size="4xl"
          color={titleColor ? titleColor : "white"}
          lineHeight="1.2"
          mb="6"
        >
          {title}
        </Heading>
        <Text
          as="h2"
          fontSize="2xl"
          color={subtitleColor ? subtitleColor : "white"}
          fontWeight="medium"
        >
          {subtitle}
        </Text>
      </Flex>
    </Box>
  );
};

export default HeroSection;
