import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Progress,
    SimpleGrid,
    List,
    ListItem,
    Link,
    useColorModeValue,
    Stack,
    Tag,
    Grid,
    Badge
} from '@chakra-ui/react';
import InteractiveCourseMap from './InteractiveCourseMap';


const CourseOverview = ({ courses = [], onCourseClick }) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    const progressColor = useColorModeValue('green.400', 'green.200');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const courseModules = [
        {
            id: 'module1',
            name: 'Module 1: Introduction',
            subModules: [
                { id: 'sub1', name: 'Lesson 1' },
                { id: 'sub2', name: 'Lesson 2' },
            ],
        },
        {
            id: 'module2',
            name: 'Module 2: Advanced Topics',
            subModules: [
                { id: 'sub3', name: 'Lesson 3' },
                { id: 'sub4', name: 'Lesson 4' },
            ],
        },
        {
            id: 'module3',
            name: 'Module 3: Main Topics',
            subModules: [
                { id: 'sub5', name: 'Lesson 5' },
                { id: 'sub6', name: 'Lesson 6' },
            ],
        },
        {
            id: 'module4',
            name: 'Module 4: Main Topics',
            subModules: [
                { id: 'sub7', name: 'Lesson 7' },
                { id: 'sub8', name: 'Lesson 8' },
            ],
        },
    ];




    return (
        <Box p={5} bg={bgColor} borderRadius="lg" boxShadow="2xl">
            <Heading as="h3" size="lg" mb={6} color={textColor} textAlign="center">
                Course Overview
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {/* Upcoming Assignments */}
                <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="md">
                    <Heading as="h4" size="md" mb={4} color={textColor}>
                        Upcoming Assignments
                    </Heading>
                    <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={4}>
                        {courses.map((course) =>
                            course.assignments.map((assignment) => (
                                <Box
                                    key={assignment.id}
                                    p={4}

                                    borderRadius="lg"
                                    boxShadow="base"
                                    border="1px solid"
                                    borderColor={borderColor}
                                >
                                    <Text fontWeight="bold" color={textColor} mb={2}>
                                        {course.name}
                                    </Text>
                                    <Link
                                        color={progressColor}
                                        onClick={() => onCourseClick(course.id)}
                                        fontWeight="medium"
                                    >
                                        {assignment.name}
                                    </Link>
                                    <Badge colorScheme="blue" mt={2}>
                                        Due: {assignment.dueDate}
                                    </Badge>
                                </Box>
                            ))
                        )}
                    </Grid>
                </Box>

                {/* Interactive Course Map */}
                <Box>
                    <InteractiveCourseMap
                        courseModules={courseModules}
                        onModuleClick={(subModuleId) => console.log(`Submodule clicked: ${subModuleId}`)}
                    />
                </Box>
                {/* Reminders and Alerts */}
                <Box>

                </Box>
                {/* Learning Analytics */}
                {/* Additional components as described in the task */}
            </SimpleGrid>
            {/* ... */}
        </Box>
    );
};

export default CourseOverview;