import React from 'react';
import { Box, Text, Grid, Spacer } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg="gray.700" color="white" p={4} height="100px" mt={8}>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(6, 1fr)',
                }}
                gap={4}
                px={{ base: 4, md: 'auto' }}
                py={6}
                justifyContent="center"
                maxWidth="1200px"
                margin="0 auto"
                marginBottom="10px"
            >
                <Box textAlign="center">
                    <Text fontSize={20} whiteSpace="nowrap">
                        About Us
                    </Text>
                </Box>

                <Box textAlign="center">
                    <Text fontSize={20} whiteSpace="nowrap">
                        Policy
                    </Text>
                </Box>

                <Box textAlign="center">
                    <Text fontSize={20}whiteSpace="nowrap">
                        Products
                    </Text>
                </Box>

                <Box textAlign="center">
                    <Text fontSize="md" whiteSpace="nowrap">
                         <Text fontSize={20}>
                         Contact
                        </Text>
                    </Text>
                </Box>
                <Box textAlign="center">
                    <Text fontSize="md" whiteSpace="nowrap">
                        <Text fontSize={20}>
                            Licence
                        </Text>
                    </Text>
                </Box>

                <Box textAlign="center">
                    <Text fontSize="md" whiteSpace="nowrap">
                        <Text fontSize={20}>
                            Quality
                        </Text>
                    </Text>
                </Box>
            </Grid>
            <Spacer />
            <Box textAlign="center">
                <Text fontSize="md" whiteSpace="nowrap">
                    &copy; {new Date().getFullYear()} PintoEd Management
                </Text>
            </Box>
        </Box>
    );
};

export default Footer;
