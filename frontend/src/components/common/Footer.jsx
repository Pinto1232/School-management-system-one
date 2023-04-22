import React from 'react';
import { Box, Text, VStack, Flex, Divider, Link } from '@chakra-ui/react';
import { useColorModeValue, } from '@chakra-ui/react';
import SocialMedia from '../specific/socialIcons/SocialMediaIcons';
import InputFieldComponent from './InputFieldComponent';
import { EmailIcon } from '@chakra-ui/icons';


const Footer = () => {

    const textColor = useColorModeValue('#4A5568', '#fff');
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');



    return (
        <Box bg={backgroundColor} color="#4A5568" p={4} mt={8}>
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
                            <Text whiteSpace="nowrap" color={textColor} fontSize={19} textTransform="uppercase">
                                {title}
                            </Text>
                            {subLinks.map((link, i) => (
                                <Link key={i} fontSize="sm" color={textColor} whiteSpace="nowrap">
                                    {link}
                                </Link>
                            ))}
                        </VStack>
                    </Box>
                ))}
            </Flex>

            <Flex
                gap={30}
                maxW="5xl"
                border={0}
                textAlign={'center'}
                mx="auto"
                mb={4} p={2}
                borderWidth={1}
                rounded="md"
            >
                <SocialMedia
                    size={30}
                    color="gray.500"
                    align="center"
                />
                <InputFieldComponent
                    type="email"
                    placeholder="Subscribe to our newsletter"
                    icon={EmailIcon}
                    style="#F2F2F2"
                    placeholderTextColor="#000"

                />
            </Flex>
            <Divider />
            <Box bg={backgroundColor} textAlign="center" maxW="100%" border="none">
                <Text color={textColor} fontSize="sm" py={3} whiteSpace="nowrap">
                    &copy; {new Date().getFullYear()} PintoEd Management
                </Text>
            </Box>
        </Box>
    );
};

export default Footer;
