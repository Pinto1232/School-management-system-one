import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Flex, Divider, Link, FormControl, HStack, IconButton } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import footerLinks from '../../data/linksFooterData'
import InputFieldComponent from './InputFieldComponent';
import CustomButton from './CustomButton';
import AdjustableColumnLayout from '../specific/twocolumns/AdjustableColumnLayout';
import CookieConsentBanner from '../specific/cookieBanner/CustomCookieBanner';

function Footer({ SubmitNewsletter, handleNewsLetterTexfield }) {
    const textColor = useColorModeValue('#4A5568', '#fff');
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');
    const buttonColor = useColorModeValue('#319795', '#3182ce');
    const textButton = useColorModeValue('#4A5568', '#fff')

    // Custom cookie banner
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('cookieConsent='));
        setShowBanner(!cookieExists);
        console.log("Cookie exists", cookieExists);
    }, []);

    const handleAccept = () => {
        setShowBanner(false);
        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
        const expires = "; expires=" + date.toGMTString();
        document.cookie = "cookieConsent=true" + expires + "; path=/";
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        SubmitNewsletter();
    };


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
                {footerLinks.map(({ title, subLinks }, index) => (
                    <Box key={index} textAlign="center" p={{ base: 4, sm: 6, md: 12 }}>
                        <VStack spacing={2} alignItems="start">
                            <Text color={textColor} fontSize={{ base: 'sm', sm: 'md', md: 'xl' }} fontWeight="bold" mb={2}>{title}</Text>
                            {subLinks.map(({ label, href }, index) => (
                                <Link key={index} href={href} color={textColor} fontSize={{ base: 'sm', sm: 'md', md: 'sm' }}>
                                    {label}
                                </Link>
                            ))}
                        </VStack>
                    </Box>
                ))}
            </Flex>

            {/* Subscribe newsletter input */}
            <Flex justifyContent={'center'} alignItems={'center'}>
                <AdjustableColumnLayout>
                    <InputFieldComponent
                        placeholder={'Subscribe for our newsletter'}
                        placeholderTextColor={'gray.600'}
                        icon={FaEnvelope}
                        inpuFieldWidth={'434px'}
                        inpuFieldBackgroundColor={'gray.200'}
                    /><CustomButton
                        bgColor={buttonColor}
                        textColor={'#fff'}
                        width={'150px'}
                    >
                        Submit
                    </CustomButton>
                </AdjustableColumnLayout>
            </Flex>

            <Divider borderColor="gray.300" my={8} />
            <Flex
                direction={{ base: 'column-reverse', sm: 'row', md: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                maxWidth="1200px"
                margin="0 auto"
                pt={4}
            >
                <Text fontSize={{ base: 'sm', sm: 'md', md: 'md' }} color="gray.500">
                    © 2023 My Company. All rights reserved.
                </Text>
                <HStack spacing={4}>
                    <IconButton
                        aria-label="Facebook"
                        icon={<FaFacebook />}
                        size="sm"
                        variant="ghost"
                        colorScheme="gray"
                    />
                    <IconButton
                        aria-label="Twitter"
                        icon={<FaTwitter />}
                        size="sm"
                        variant="ghost"
                        colorScheme="gray"
                    />
                    <IconButton
                        aria-label="Instagram"
                        icon={<FaInstagram />}
                        size="sm"
                        variant="ghost"
                        colorScheme="gray"
                    />
                    {/* Cookie */}
                    {showBanner && (
                        <CookieConsentBanner
                            onAccept={handleAccept}
                            CookieWidth={'vw'}
                            buttonColor={"blue"}
                        />
                    )}
                </HStack>
            </Flex>
        </Box>
    );
};

export default Footer;
