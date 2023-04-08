import React from 'react';
import { Box, Text, VStack, Flex, Divider, Link } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg="gray.700" color="white" p={4} mt={8}>
            <Flex
                direction={{ base: 'column', sm: 'row', md: 'row' }}
                wrap="wrap"
                justifyContent="center"
                alignItems="center"
                maxWidth="1200px"
                margin="0 auto"
                mb={4}
            >
                {[
                    {
                        title: 'About Us',
                        subLinks: [
                            'Our Team',
                            'Our Mission and Vision',
                            'Meet the Team',
                            'Company History',
                            'Core Values and Principles',
                            'Community Involvement',
                            'Career Opportunities',
                        ],
                    },
                    {
                        title: 'Policy',
                        subLinks: [
                            'Privacy Policy',
                            'Cookie Policy',
                            'Terms and Conditions',
                            'Refund Policy',
                            'Shipping Policy',
                            'Data Retention Policy',
                            'Accessibility Policy',
                        ],
                    },
                    {
                        title: 'Contact',
                        subLinks: [
                            'Get in Touch',
                            'Contact Information',
                            'Customer Support',
                            'Sales Inquiry',
                            'Technical Support',
                            'Feedback and Suggestions',
                            'Report an Issue',
                        ],
                    },
                    {
                        title: 'Licence',
                        subLinks: [
                            'Certifications',
                            'Types of Licences',
                            'Licence Activation/Renewal',
                            'Licence Pricing',
                            'Licence Upgrades/Downgrades',
                            'Licence Transfer',
                            'Licence FAQs',
                        ],
                    },
                ].map(({ title, subLinks }, index) => (
                    <Box key={index} textAlign="center" p={{ base: 4, sm: 6, md: 12 }}>
                        <VStack spacing={2} alignItems="start">
                                <Text whiteSpace="nowrap" fontSize={19} textTransform="uppercase">
                                    {title}
                                </Text>
                            {subLinks.map((link, i) => (
                                <Link key={i} fontSize="sm" whiteSpace="nowrap">
                                    {link}
                                </Link>
                            ))}
                        </VStack>
                    </Box>
                ))}
            </Flex>
            <Divider />
            <Box bg="white" textAlign="center" maxW="100%" border="none">
                <Text color="black" fontSize="sm" whiteSpace="nowrap">
                    &copy; {new Date().getFullYear()} PintoEd Management
                </Text>
            </Box>
        </Box>
    );
};

export default Footer;
