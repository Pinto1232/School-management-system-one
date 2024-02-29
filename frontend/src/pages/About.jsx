import React from 'react';
import { Box, Text, VStack, Heading, Image, Button, Container, Flex, useColorModeValue } from '@chakra-ui/react';

const About = () => {
  // Use color mode value to adjust colors based on the theme (light or dark mode)
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Container maxW="container.xl" py={10}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" bg={bgColor} p={8} borderRadius="lg" boxShadow="2xl">
        <VStack spacing={5} align="flex-start" flex="1">
          <Heading as="h1" size="2xl" color={textColor}>
            About Us
          </Heading>
          <Text fontSize="lg" color={textColor} textAlign="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse
            lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
            ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
          </Text>
          <Text fontSize="lg" color={textColor} textAlign="justify">
            Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam
            nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in,
            pretium a, enim. Pellentesque congue.
          </Text>
          <Button colorScheme="teal" size="lg">
            Learn More
          </Button>
        </VStack>
        <Box flexShrink={0} mt={{ base: 6, md: 0 }} ml={{ md: 6 }} align="center">
          <Image
            borderRadius="lg"
            width={{ md: '80%' }}
            src="https://via.placeholder.com/600"
            alt="Placeholder image"
            boxShadow="lg"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default About;