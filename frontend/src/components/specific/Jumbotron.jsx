// src/components/Jumbotron.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';

const Jumbotron = ({
    title,
    subtitle,
    buttonText,
    buttonOnClick,
    minHeight = '70vh',
    titleSize = '2xl',
    subtitleSize = 'xl',
    bgGradient = 'linear(to-r, rgba(0, 123, 255, 0.6), rgba(0, 123, 255, 0.9))',
    textColor = 'white',
    bgImage,
}) => {

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
        >
            <Box
                backgroundImage={`url(${bgImage})`}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                zIndex={-1}
            />
            <Box
                bgGradient={bgGradient}
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                zIndex={-1}
                opacity={0.5}
            />
            <Heading size={titleSize} mb={4}>
                {title}
            </Heading>
            <Text fontSize={subtitleSize} mb={6}>
                {subtitle}
            </Text>
            <CustomButton w="200px" onClick={buttonOnClick}>
                {buttonText}
            </CustomButton>
        </Box>
    );
};

export default Jumbotron;
