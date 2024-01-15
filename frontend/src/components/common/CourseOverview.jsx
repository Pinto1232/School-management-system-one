import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Link,
  useColorModeValue,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';

const CourseCard = ({ course }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box p={5} bg={cardBg} boxShadow="md" borderRadius="lg">
      <Heading size="md" fontWeight="bold" mb={2}>
        {course.name}
      </Heading>
      <Text fontSize="sm" color={textColor} mb={3}>
        {course.description}
      </Text>
      <Stack direction="row" mb={3}>
        {course.assignments.map((assignment) => (
          <Badge key={assignment.id} colorScheme="blue" borderRadius="full" px={2}>
            {assignment.name} - Due: {assignment.dueDate}
          </Badge>
        ))}
      </Stack>
      <SimpleGrid columns={2} spacing={2}>
        <Button as={Link} href={course.materialsLink} colorScheme="teal" size="sm">
          Materials
        </Button>
        <Button as={Link} href={course.gradesLink} colorScheme="purple" size="sm">
          Grades
        </Button>
      </SimpleGrid>
    </Box>
  );
};

const CourseOverview = ({ courses }) => {
  return (
    <Box p={3}>
      <Heading as="h3" size="lg" mb={6}>
        Course Overview
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CourseOverview;