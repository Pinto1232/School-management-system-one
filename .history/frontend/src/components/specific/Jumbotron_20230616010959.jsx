import { Box, Heading, Text, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import CustomButton from '../common/CustomButton';

const Jumbotron = ({ 
    title, 
    subtitle, 
    minHeight = '70vh', 
    bgGradient = 'linear(to-r, rgba(0, 50, 200, 0.8), rgba(0, 0, 100, 0.9))',
    textColor = 'white',
    bgImage,
}) => {
    const buttonColor = useColorModeValue('#319795', '#3182ce');
    const textButton = useColorModeValue('#4A5568', '#fff')

    // Adjust size of Heading and Text based on the breakpoint
    const titleSize = useBreakpointValue({ base: 'xl', md: '2xl', lg: '4xl' });
    const subtitleSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });

    // Adjust the button width based on the breakpoint
    const buttonWidth = useBreakpointValue({ base: 'full', sm: '200px' });

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
                mb={4}
                whiteSpace="normal"
                w="900px"
                textAlign="center"
            >
                {title}
            </Heading>
            <Text
                fontSize={subtitleSize}
                mb={6}
                textAlign="center"
                maxW={{ base: "90%", sm: "700px" }}
            >
                {subtitle}
            </Text>
            <CustomButton
                bgColor={buttonColor}
                color={textButton}
                hover={buttonColor}
                width={buttonWidth}
                onClick={handleClick}
            >
                Learn More
            </CustomButton>
        </Box>
    );
};

export default Jumbotron;
