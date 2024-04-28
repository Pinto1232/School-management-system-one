import React from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FaUserCircle,
  FaBookOpen,
  FaCalendarAlt,
  FaBullhorn,
  FaTasks,
  FaChalkboardTeacher,
} from 'react-icons/fa'
import AssignmentManagement from '../../common/AssignmentManagement'
import CourseOverview from '../../common/CourseOverview'
import Announcements from '../../common/Announcements'
import BigCalendar from '../../common/BigCalendar'
import StudentGrades from '../grade/StudentGrades'
import StudentProfileInformation from '../profileInformation/StudentProfileInformation'
import  tasks  from '../../../data/tasks'
import PdfGallery from '../../common/PdfGallery'
import TaskDashboard from '../../common/TaskDashboard'

const StudentTabs = ({
  assignmentData,
  courses,
  announcements,
  myEvents,
  allGradeData,
  pdfFiles,
  studentData,
}) => {
  const tabBackgroundColor = useColorModeValue('gray.100', 'gray.700')
  const tabSelectedColor = useColorModeValue('teal.600', 'teal.200')

  return (
    <Tabs isFitted variant="enclosed" colorScheme="teal">
      <TabList mb="1em" border="none">
        {[
          { icon: FaUserCircle, label: 'Profile' },
          { icon: FaBookOpen, label: 'Grades' },
          { icon: FaCalendarAlt, label: 'Schedule/Events' },
          { icon: FaBullhorn, label: 'Announcements' },
          { icon: FaTasks, label: 'Assignments' },
          { icon: FaChalkboardTeacher, label: 'Course Overview' },
          { icon: FaChalkboardTeacher, label: 'Course Streamming' },
        ].map((tab, index) => (
          <Tab
            key={index}
            _selected={{ color: 'white', bg: tabSelectedColor }}
            _focus={{ boxShadow: 'none' }}
            bg={tabBackgroundColor}
            borderRadius="md"
            mr={2}
            py={2}
            px={4}
            boxShadow={'2xl'}
          >
            <Icon as={tab.icon} boxSize="1.5em" mr="2" />
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <StudentProfileInformation studentData={studentData} />
        </TabPanel>
        <TabPanel>
          <StudentGrades allGradeData={allGradeData} />
        </TabPanel>
        <TabPanel>
          <BigCalendar events={myEvents} />
        </TabPanel>
        <TabPanel>
          <Announcements announcements={announcements} />
        </TabPanel>
        <TabPanel>
          <Box>
            <TaskDashboard tasks={tasks} />
          </Box>
        </TabPanel>
        <TabPanel>
          <CourseOverview
            courses={courses}
            onCourseClick={(courseId) =>
              console.log(`Course clicked: ${courseId}`)
            }
          />
        </TabPanel>
        <TabPanel>
          <Box bg={'gray.50'} py={5}>
            <PdfGallery files={pdfFiles} />
          </Box>
          <Box bg={'gray.50'} py={5}>
            <PdfGallery files={pdfFiles} />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default StudentTabs
