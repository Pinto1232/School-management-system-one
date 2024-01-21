import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text } from '@chakra-ui/react';
import AssignmentManagement from '../../common/AssignmentManagement';
import CourseOverview from '../../common/CourseOverview';
import Announcements from '../../common/Announcements';
import BigCalendar from '../../common/BigCalendar';

const StudentTabs = ({ assignmentData, courses, announcements, myEvents }) => {
    return (
        <Tabs isFitted variant="enclosed" colorScheme="teal">
            <TabList mb="1em" border="none">
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Profile</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Grades</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Schedule/Events</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>Announcements</Tab>
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
                        <Text fontSize="lg" fontWeight="semibold">Event Calendar</Text>
                        <BigCalendar events={myEvents} />
                    </Box>
                </TabPanel>
                
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold">Announcements</Text>
                        <Box>
                            <Announcements  announcements={announcements}/>
                        </Box>
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
                        <Text fontSize="lg" fontWeight="semibold">Course Overview</Text>
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