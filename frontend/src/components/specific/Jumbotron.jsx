import React from 'react';
import { Box, Heading, Text, useColorModeValue, useTheme } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';

const Jumbotron = ({
    title,
    subtitle,
    minHeight = '70vh',
    titleSize = '2xl',
    subtitleSize = 'xl',
    bgGradient = 'linear(to-r, rgba(0, 50, 200, 0.8), rgba(0, 0, 100, 0.9))', 
    textColor = 'white', 
    bgImage,
    buttonOnClick,
}) => {
    const buttonColor = useColorModeValue('#319795', '#3182ce');
    const textButton = useColorModeValue('#4A5568', '#fff')
    const theme = useTheme()


    // handleClick function for the button event
    const handleClick = () => {
        console.log('Button clicked');
    };



    return (
        <Box
        w="100%"
        minH={minHeight}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color={textColor}
        position="relative"
        overflow="hidden"
    >
        {/* Background image */}
        <Box
            bgImage={`url(${bgImage})`}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            zIndex={-2}
        />
        {/* Gradient overlay */}
        <Box
            bgGradient={bgGradient}
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            zIndex={-1}
        />
        {/* Content */}
        <Heading
            size={titleSize}
            mb={4}
            whiteSpace="normal"
            fontSize={{ base: "2rem", sm: "4rem" }}
            textAlign="center"
            zIndex={1}
            maxW={999}
            lineHeight={1}
        >
            {title}
        </Heading>
        <Text
            fontSize={subtitleSize}
            mb={6}
            textAlign="center"
            maxW={{ base: "90%", sm: "700px" }}
            zIndex={1}
        >
            {subtitle}
        </Text>
        <CustomButton
            onClick={buttonOnClick}
            bgColor={buttonColor}
            color={textButton}
            hover={buttonColor}
            width={200}
            zIndex={1}
        >
            Learn More
        </CustomButton>
    </Box>
    );
};

export default Jumbotron;
