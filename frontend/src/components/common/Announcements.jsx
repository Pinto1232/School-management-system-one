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
  Flex,
} from '@chakra-ui/react';
import { MdAnnouncement } from 'react-icons/md';

const AnnouncementCard = ({ announcement }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Flex align="stretch" p={5} bg={cardBg} boxShadow="md" borderRadius="lg" mb={4} spacing={3}>
      <HStack justifyContent="space-between">
        <HStack>
          <Icon as={MdAnnouncement} color="orange.400" />
          <Text fontWeight="bold">{announcement.title}</Text>
        </HStack>
        <Badge colorScheme="blue">{announcement.date}</Badge>
      </HStack>
      <Text fontSize="sm" color={textColor}>
        {announcement.content}
      </Text>
      {announcement.link && (
        <Link color="blue.500" href={announcement.link} isExternal>
          Read more
        </Link>
      )}
    </Flex>
  );
};

const Announcements = ({ announcements }) => {
  return (
    <Box>
      <Heading as="h3" size="lg" mb={6}>
        Announcements
      </Heading>
      <VStack p={4}>
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </VStack>
    </Box>
  );
};

export default Announcements;