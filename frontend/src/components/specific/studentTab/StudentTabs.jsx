import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text } from '@chakra-ui/react';
import AssignmentManagement from '../../common/AssignmentManagement';
import CourseOverview from '../../common/CourseOverview';

// Assignment Management
const assignmentData = [
    {
        id: 'assignment1',
        name: 'Essay on History',
        dueDate: '2023-05-10',
        description: 'Write an essay on the history of...',
        isSubmitted: false,
    },
    {
        id: 'assignment2',
        name: 'Essay on History',
        dueDate: '2023-05-10',
        description: 'Write an essay on the history of...',
        isSubmitted: false,
    },
    {
        id: 'assignment3',
        name: 'Essay on History',
        dueDate: '2023-05-10',
        description: 'Write an essay on the history of...',
        isSubmitted: false,
    },
    {
        id: 'assignment4',
        name: 'Essay on History',
        dueDate: '2023-05-10',
        description: 'Write an essay on the history of...',
        isSubmitted: false,
    },
    {
        id: 'assignment5',
        name: 'Essay on History',
        dueDate: '2023-05-10',
        description: 'Write an essay on the history of...',
        isSubmitted: false,
    },
    {
        id: 'assignment6',
        name: 'Essay on History',
        dueDate: '2023-05-10',
        description: 'Write an essay on the history of...',
        isSubmitted: false,
    },
];
console.log("Assignment data", assignmentData);

const courses = [
    {
        id: 'course1',
        name: 'Introduction to Programming',
        description: 'Learn the basics of programming with this introductory course.',
        assignments: [
            { id: 'assignment1', name: 'Homework #1', dueDate: '2023-05-10' },
            { id: 'assignment2', name: 'Project #1', dueDate: '2023-05-24' },
        ],
        materialsLink: '/course1/materials',
        gradesLink: '/course1/grades',
    },
    {
        id: 'course2',
        name: 'Introduction to Programming',
        description: 'Learn the basics of programming with this introductory course.',
        assignments: [
            { id: 'assignment1', name: 'Homework #1', dueDate: '2023-05-10' },
            { id: 'assignment2', name: 'Project #1', dueDate: '2023-05-24' },
        ],
        materialsLink: '/course1/materials',
        gradesLink: '/course1/grades',
    },
    {
        id: 'course3',
        name: 'Introduction to Programming',
        description: 'Learn the basics of programming with this introductory course.',
        assignments: [
            { id: 'assignment1', name: 'Homework #1', dueDate: '2023-05-10' },
            { id: 'assignment2', name: 'Project #1', dueDate: '2023-05-24' },
        ],
        materialsLink: '/course1/materials',
        gradesLink: '/course1/grades',
    },

];
console.log("Course data", courses);



const StudentTabs = () => {
    return (
        <Tabs isFitted variant="enclosed" colorScheme="teal">
            <TabList mb="1em" border="none">
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Profile</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Grades</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Schedule</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Assignments</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Course Overview</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold">Student Profile Information</Text>
                        {/* Profile content goes here */}
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold">Student Grades</Text>
                        {/* Grades content goes here */}
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold">Student Schedule</Text>
                        {/* Schedule content goes here */}
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold">Student Assignments</Text>
                        <Box>
                            <AssignmentManagement assignmentData={assignmentData} />
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold"> Course Overview</Text>
                        <Box>
                            <CourseOverview courses={courses} onCourseClick={(courseId) => console.log(`Course clicked: ${courseId}`)} />
                        </Box>
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default StudentTabs;