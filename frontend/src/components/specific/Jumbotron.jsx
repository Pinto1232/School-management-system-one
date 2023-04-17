// src/components/Jumbotron.js
import React from 'react';
import { Box, Heading, Text, useColorModeValue, useTheme } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';

const Jumbotron = ({ title, subtitle, minHeight = '70vh', titleSize = '2xl', subtitleSize = 'xl',
    bgGradient = 'linear(to-r, rgba(0, 50, 200, 0.8), rgba(0, 0, 100, 0.9))',
    textColor = 'white',
    bgImage,
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
            <Heading
                size={titleSize}
                mb={4} whiteSpace="normal"
                w="900px"
                fontSize="4rem"
                textAlign="center"
                style={{ fontSize: `${theme.breakpoints.sm}px` }}
            >
                {title}
            </Heading>
            <Text
                fontSize={subtitleSize}
                mb={6} w="700px"
                textAlign="center" >
                {subtitle}
            </Text>
            <CustomButton
                bg={buttonColor}
                color={textButton}
                hover={buttonColor}
                style={{
                    width: "200px",
                    color: "#fff"
                }}
            >
                Learn More
            </CustomButton>
        </Box>
    );
};

export default Jumbotron;
