import React from 'react';
import {
    Box,
    Heading,
    VStack,
    HStack,
    Text,
    useColorModeValue,
    Badge,
    Link,
    Icon,
    SimpleGrid,
} from '@chakra-ui/react';
import { MdAnnouncement } from 'react-icons/md';

const AnnouncementCard = ({ announcement }) => {
    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    return (
        <VStack align="stretch" p={5} bg={cardBg} boxShadow="md" borderRadius="lg" mb={4} spacing={3}>
            <HStack justifyContent="space-between" width="100%">
                <HStack>
                    <Icon as={MdAnnouncement} color="orange.400" />
                    <Text fontWeight="bold" isTruncated>{announcement.title}</Text>
                </HStack>
                <Badge colorScheme="blue">{announcement.date}</Badge>
            </HStack>
            <Text fontSize="sm" color={textColor} noOfLines={2}>
                {announcement.content}
            </Text>
            {announcement.link && (
                <Link color="blue.500" href={announcement.link} isExternal>
                    Read more
                </Link>
            )}
        </VStack>
    );
};

const Announcements = ({ announcements }) => {
    if (!Array.isArray(announcements)) {
        // Handle the case where announcements is not an array
        return <Box p={5}>No announcements available.</Box>;
    }

    return (
        <Box p={5}>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
                {announcements.map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Announcements;