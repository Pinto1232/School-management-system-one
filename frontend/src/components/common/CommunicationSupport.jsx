import React from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Link,
    useColorModeValue,
    Icon,
    Divider,
    Stack,
} from '@chakra-ui/react';
import { MdMessage, MdForum, MdLiveHelp, MdContactMail } from 'react-icons/md';

const CommunicationSupport = ({ onMessageClick, onForumClick, faqUrl, contactUrl }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    return (
        <Box bg={bgColor} p={5} borderRadius="sm" boxShadow="xl" my={4} mx={4} h={'50vh'}>
            <VStack spacing={8} align="stretch">
                <Heading as="h3" size="lg" mb={4}>
                    Communication & Support
                </Heading>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <Button leftIcon={<Icon as={MdMessage} />} colorScheme="blue" onClick={onMessageClick} flex={1}>
                        Message Instructor
                    </Button>
                    <Button leftIcon={<Icon as={MdForum} />} colorScheme="orange" onClick={onForumClick} flex={1}>
                        Discussion Forum
                    </Button>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <Link href={faqUrl} isExternal flex={1}>
                        <Button leftIcon={<Icon as={MdLiveHelp} />} colorScheme="green" w="full">
                            FAQs
                        </Button>
                    </Link>
                    <Link href={contactUrl} isExternal flex={1}>
                        <Button leftIcon={<Icon as={MdContactMail} />} colorScheme="red" w="full">
                            Contact Advisor
                        </Button>
                    </Link>
                </Stack>
                <Divider/>
                <VStack alignItems="start" spacing={2}>
                    <Text fontWeight="bold" color={textColor}>
                        Additional Resources:
                    </Text>
                    <Link href="/academic-calendar" isExternal>
                        <Text color={textColor}>Academic Calendar</Text>
                    </Link>
                    <Link href="/library-resources" isExternal>
                        <Text color={textColor}>Library Resources</Text>
                    </Link>
                    <Link href="/technical-support" isExternal>
                        <Text color={textColor}>Technical Support</Text>
                    </Link>
                </VStack>
            </VStack>
        </Box>
    );
};

export default CommunicationSupport;