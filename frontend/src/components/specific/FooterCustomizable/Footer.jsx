import { Box, Flex, Heading, Input, Button, Text, Stack } from '@chakra-ui/react';
import CustomButton from '../../common/CustomButton';
import InputFieldComponent from '../../common/InputFieldComponent';

const Footer = ({ linksFooter, newsletterPlaceholder, newsletterLabel, bgFooter }) => {
    return (
        <Box
            py={10}
            bg={bgFooter}
        >
            <Box
                direction="column"
                maxW={{ xl: '1200px' }}
                mx="auto"
                px={{ base: 6, md: 0 }}
            >
                <Flex justify="start" gap={20} mb={20}>
                    {linksFooter.map((section, index) => (
                        <Box key={index} mb={4}>
                            <Flex as="h4" fontSize="lg" mb={2}>
                                {section.heading}
                            </Flex>
                            <Box direction="column">
                                {section.links.map((link, index) => (
                                    <Text key={index} fontSize="sm" color="gray.500" mb={2}>
                                        <a href={link.url}>{link.label}</a>
                                    </Text>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Flex>
                <Flex direction={{ base: 'column', md: 'row' }} alignItems="center">
                    <Box flex={{ md: 1 }}>
                        <form>
                            <Flex justify="center" gap={1} alignItems="center" justifyItems="center">
                                <InputFieldComponent
                                    type="email"
                                    placeholder={newsletterPlaceholder}
                                    size="sm"
                                    w="full"
                                    style="#fff"
                                    placeholderTextColor="#000"
                                />
                                <CustomButton
                                    colorScheme="blue"
                                    size="md"
                                    w="200px"
                                >
                                    {newsletterLabel}
                                </CustomButton>
                            </Flex>
                        </form>
                    </Box>
                    <Box flex={{ md: 1 }}>
                        <Flex justify={{ base: 'center', md: 'flex-end' }}>
                            <Stack direction="row" spacing={4}>
                                <Box as="a" href="#" w="6" h="6" borderRadius="full" bg="gray.500"></Box>
                                <Box as="a" href="#" w="6" h="6" borderRadius="full" bg="gray.500"></Box>
                                <Box as="a" href="#" w="6" h="6" borderRadius="full" bg="gray.500"></Box>
                            </Stack>
                        </Flex>
                    </Box>
                </Flex>
                <Text textAlign={{ base: 'center', md: 'left' }} mt={8} fontSize="sm" color="gray.500">
                    Copyright © {new Date().getFullYear()}
                </Text>
            </Box>
        </Box>
    );
};

export default Footer;
