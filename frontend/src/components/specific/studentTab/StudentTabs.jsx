import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Icon } from '@chakra-ui/react';
import AssignmentManagement from '../../common/AssignmentManagement';
import CourseOverview from '../../common/CourseOverview';
import Announcements from '../../common/Announcements';
import BigCalendar from '../../common/BigCalendar';
import { FaUserCircle, FaBookOpen, FaCalendarAlt, FaBullhorn, FaTasks, FaChalkboardTeacher } from 'react-icons/fa';
import StudentGrades from '../grade/StudentGrades';
import StudentProfileInformation from '../profileInformation/StudentProfileInformation';


const StudentTabs = ({ assignmentData, courses, announcements, myEvents, allGradeData, studentData   }) => {
    return (
        <Tabs isFitted variant="enclosed" colorScheme="teal">
            <TabList mb="1em" border="none">
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>
                    <Icon as={FaUserCircle} boxSize="2em" borderRadius="full" bg="#e2e8f0" p="2" color="teal.500" mr="2" />
                    Profile
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>
                    <Icon as={FaBookOpen} boxSize="2em" borderRadius="full" bg="#e2e8f0" p="2" color="teal.500" mr="2" />
                    Grades
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>
                    <Icon as={FaCalendarAlt} boxSize="2em" borderRadius="full" bg="#e2e8f0" p="2" color="teal.500" mr="2" />
                    Schedule/Events
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>
                    <Icon as={FaBullhorn} boxSize="2em" borderRadius="full" bg="#e2e8f0" p="2" color="teal.500" mr="2" />
                    Announcements
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>
                    <Icon as={FaTasks} boxSize="2em" borderRadius="full" bg="#e2e8f0" p="2" color="teal.500" mr="2" />
                    Assignments
                </Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.500', borderTopRadius: 'md', boxShadow: 'sm' }}>
                    <Icon as={FaChalkboardTeacher} boxSize="2em" borderRadius="full" bg="#e2e8f0" p="2" color="teal.500" mr="2" />
                    Course Overview
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold">Student Profile Information</Text>
                        <StudentProfileInformation studentData={studentData} />
                    </Box>
                </TabPanel>
                <TabPanel>
                    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                        <Text fontSize="lg" fontWeight="semibold">Student Grades</Text>
                        <StudentGrades  allGradeData={allGradeData} />
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
                            <Announcements announcements={announcements} />
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