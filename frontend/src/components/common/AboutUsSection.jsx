import React from 'react'
import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";
import CustomButton from './CustomButton';


const AboutUsSection = ({ heading, subheading, image, altText, children, style, headingStyle}) => {
    return (
        <Flex
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            py={12}
            maxW="1200px"
            mx="auto"
            gap={8}
            {...style}
        >
            <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                <Heading  as="h2" size="xl" mb={4}>
                    {heading}
                </Heading>
                <Text {...headingStyle} fontSize="xl" mb={8}>
                    {subheading}
                </Text>
                {children}
                <CustomButton
                    style={{
                        bg: "blue",
                        width: "200px",
                        color: "#000"
                    }}
                >
                    Learn more
                </CustomButton>
            </Box>
            <Box flex="1" textAlign={{ base: "center", md: "right" }} mb={{ base: 8, md: 0 }}>
                <Image width="100%" height="100%" src={image} alt={altText} borderRadius="lg" boxShadow="lg" />
            </Box>
        </Flex>
    )
}

export default AboutUsSection
