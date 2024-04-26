import React, { useEffect, useState } from 'react'
import { FaUserGraduate } from 'react-icons/fa'
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import {
  FaBell,
  FaBook,
  FaCoins,
  FaGraduationCap,
  FaMoneyBillWave,
  FaUser,
} from 'react-icons/fa'
import { useUserContext } from '../../contexts/UserContext'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { TopBar } from './TopBar'

import {
  AssignmentCard,
  AttendanceTracker,
  Calendar,
  CardInfo,
  ClassOverview,
  CommunicationSupport,
  CourseCard,
  DataTable,
  LeaderBoard,
  LessonPlanner,
  PerformanceCard,
  SearchForm,
  StatisticsCard,
  StudentRoster,
  StudentTabs,
  TwoColumnLayout,
  WelcomeCard,
} from '../dashboard/index'
import {
  Confirmation,
  UserInfo,
  UserPlan,
  UserSummary,
} from '../../components/specific/MultiStepForm'
import { initialData } from '../../data/chartData'
import { assignmentData } from '../../data/assignmentData'
import { announcements } from '../../data/announcements'
import { allGradeData } from '../../data/allGradeData'
import { studentData } from '../../data/studentData'
import { studentsRoastData } from '../../data/studentsRoastData'
import { classesData } from '../../data/classesData'
import { assignments } from '../../data/assignments'
import { pdfFiles } from '../../data/pdfFiles'
import { students } from '../../data/students'
import { options } from '../../data/options'
import { courses } from '../../data/courses'
import UserMenu from './UserMenu'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, isLoadingUser } = useUserContext()
  console.log('User Dashboard', user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [showWelcomeCard, setShowWelcomeCard] = useState(true)
  const steps = [UserInfo, UserPlan, UserSummary, Confirmation]
  const [myIsLoading, setMyIsLoading] = useState(true)
  const [attendance, setAttendance] = useState([])
  const [, setSearchCriteria] = useState({})

  const handleSearchCriteria = (criteria) => {
    setSearchCriteria(criteria)
  }

  const myGetColorScheme = (percentage) => {
    if (percentage <= 25) {
      return 'red'
    } else if (percentage <= 50) {
      return 'yellow'
    } else if (percentage <= 75) {
      return 'orange'
    } else {
      return 'green'
    }
  }

  const handleClose = () => {
    setShowWelcomeCard(false)
  }

  useEffect(() => {
    if (!isLoadingUser && !user) {
      navigate('/login')
    }
  }, [user, isLoadingUser, navigate])

  const handleMenuToggle = (newState) => {
    setIsMenuOpen(newState)
  }

  const dashboardBG = useColorModeValue('', '')
  const tableBG = useColorModeValue('', '#2d3748')
  const textColor = useColorModeValue('#fff', '#fff')
  const [studentsData, setStudentsData] = useState([])
  const [currentView, setCurrentView] = useState('dashboard')

  const changeView = (view) => {
    setCurrentView(view)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users')
      console.log('Response data:', response.data)
      setStudentsData(response.data)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const {
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    // Process the form data
    console.log(data)
  }

  // Class data api
  /* useEffect(() => {
    const fetchClassesData = async () => {
      try {
        const response = await fetch('/api/classes');
        const data = await response.json();
        setClassesData(data);
      } catch (error) {
        console.error('Failed to fetch classes data:', error);
      }
    };
    fetchClassesData();
  }, []); */

  // Attendance code
  const [presentCount, setPresentCount] = useState(0)
  const [absentCount, setAbsentCount] = useState(0)

  /* Email count */
  const emailCount = 5

  // My events
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  // myEvents data
  const myEvents = [
    {
      title: 'Meeting with Prof. Smith',
      start: new Date(currentYear, currentMonth, currentDay, 10, 30),
      end: new Date(currentYear, currentMonth, currentDay, 11, 30),
      description: 'Discussing the project updates and next steps.',
    },
    {
      title: 'Chemistry Lab Session',
      start: new Date(currentYear, currentMonth, currentDay + 1, 13, 0),
      end: new Date(currentYear, currentMonth, currentDay + 1, 15, 0),
      description: 'Lab session for the chemistry course.',
    },
    {
      title: 'Math Study Group',
      start: new Date(currentYear, currentMonth, currentDay - 1, 16, 0),
      end: new Date(currentYear, currentMonth, currentDay - 1, 17, 30),
      description: 'Weekly study group for Calculus II.',
    },
    {
      title: 'History Lecture',
      start: new Date(currentYear, currentMonth, currentDay + 2, 9, 0),
      end: new Date(currentYear, currentMonth, currentDay + 2, 10, 0),
      description: 'Lecture on Ancient Civilizations.',
    },
    {
      title: 'Software Engineering Project Demo',
      start: new Date(currentYear, currentMonth, currentDay + 3, 14, 0),
      end: new Date(currentYear, currentMonth, currentDay + 3, 15, 30),
      description:
        'Final project demonstration for the software engineering class.',
    },
    {
      title: 'Art Workshop',
      start: new Date(currentYear, currentMonth, currentDay + 4, 11, 0),
      end: new Date(currentYear, currentMonth, currentDay + 4, 12, 30),
      description: 'Workshop on modern art techniques.',
    },
    {
      title: 'Physics Exam Review',
      start: new Date(currentYear, currentMonth, currentDay + 5, 18, 0),
      end: new Date(currentYear, currentMonth, currentDay + 5, 19, 30),
      description: 'Review session for the upcoming physics exam.',
    },
  ]
  console.log('My events', myEvents)

  // Class Overview function
  const handleClassClick = (classItem) => {
    // Perform any additional actions here, such as:
    console.log('Class clicked:', classItem)
    // You can also use analytics tracking here, for example:
    // trackEvent('view_class_details', { classId: classItem.id });
  }

  //Attendance tracker
  const handleAttendanceRecorded = (studentId) => {
    console.log(`Attendance recorded for student ${studentId}`)
    // Update local state
    setAttendance([...attendance, studentId])
  }

  /* Views model rendering */
  let content
  switch (currentView) {
    case 'dashboard':
      content = (
        <Box>
          <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
          <TwoColumnLayout isMenuOpen={isMenuOpen}>
            <Flex>
              {showWelcomeCard && <WelcomeCard onClose={handleClose} />}
            </Flex>
          </TwoColumnLayout>

          <TwoColumnLayout isMenuOpen={isMenuOpen}>
            <Flex
              align={'start'}
              px={['2em']}
              justifyContent={'start'}
              alignItems={'start'}
            ></Flex>
          </TwoColumnLayout>

          <TwoColumnLayout isMenuOpen={isMenuOpen}>
            <Flex
              align={'start'}
              justifyContent={'center'}
              px={6}
              gap={4}
              flexWrap="wrap"
            >
              <Box shadow="md">
                <CardInfo
                  icon={<FaCoins />}
                  heading="Due Fees"
                  iconSize={35}
                  iconBgColor="orange.400"
                  iconColor="white"
                  price="4503"
                  bgColor="gray.100"
                  textColor="gray.700"
                  height="100px"
                />
              </Box>
              <Box shadow="md">
                <CardInfo
                  icon={<FaBell />}
                  heading="Notifications"
                  iconSize={35}
                  iconBgColor="red.400"
                  iconColor="white"
                  price="12"
                  bgColor="gray.100"
                  textColor="gray.700"
                  height="100px"
                />
              </Box>
              <Box shadow="md">
                <CardInfo
                  icon={<FaGraduationCap />}
                  heading="Result"
                  iconBgColor="yellow.400"
                  iconSize={35}
                  price="16"
                  bgColor="gray.100"
                  textColor="gray.700"
                  height="100px"
                />
              </Box>

              <Box shadow="md">
                <CardInfo
                  icon={<FaMoneyBillWave />}
                  heading="Expenses"
                  iconBgColor="purple.400"
                  iconColor="white"
                  iconSize={35}
                  price="193000"
                  bgColor="gray.100"
                  textColor="gray.700"
                  height="100px"
                />
              </Box>
              <Box shadow="md">
                <CardInfo
                  icon={<FaUser />}
                  heading="Total Students"
                  iconBgColor="green.400"
                  iconColor="white"
                  iconSize={35}
                  price="35000"
                  bgColor="gray.100"
                  textColor="gray.700"
                  height="100px"
                />
              </Box>
              <Box shadow="md">
                <CardInfo
                  icon={<FaBook />}
                  iconBgColor="pink.400"
                  iconColor="white"
                  heading="Total Exams"
                  iconSize={35}
                  price="19050"
                  bgColor="gray.100"
                  textColor="gray.700"
                  height="100px"
                />
              </Box>
            </Flex>
          </TwoColumnLayout>

          <TwoColumnLayout isMenuOpen={isMenuOpen}>
            <Flex
              direction={['column', 'column', 'row']}
              overflowX={['auto', 'auto', 'visible']}
              style={{ paddingLeft: '5px', paddingRight: '5px' }}
            >
              <Box
                flex={1}
                bg={tableBG}
                p={[2, 4]}
                borderRadius="md"
                shadow="md"
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mb={[2, 4]}
                >
                  <Box>
                    <Heading
                      color={textColor}
                      as="h6"
                      fontSize={['md', 'lg', 'xl']}
                      style={{ color: 'black' }}
                    >
                      <Flex alignItems="center">
                        <FaUserGraduate />
                        <span style={{ marginLeft: '0.5rem' }}>
                          My Students
                        </span>
                      </Flex>
                    </Heading>
                  </Box>
                </Flex>

                <Box boxShadow={'xl'}>
                  <SearchForm
                    fields={[
                      {
                        name: 'search',
                        placeholder: 'Search...',
                        type: 'text',
                        width: '1300px',
                      },
                    ]}
                    handleSearchCriteria={handleSearchCriteria}
                    onSearch={(data) => console.log('Search data:', data)}
                  />
                </Box>
                <DataTable data={studentsData} fetchData={fetchData} />
              </Box>
            </Flex>
          </TwoColumnLayout>

          <TwoColumnLayout isMenuOpen={isMenuOpen}>
            <Flex
              direction={['column', 'column', 'column', 'row']}
              w="100%"
              gap={1}
            >
              <Box flex={1} bg={tableBG} p={4} borderRadius="md" shadow="md">
                <PerformanceCard
                  title="Performance"
                  initialData={initialData}
                  options={options}
                />
              </Box>
              <Box flex={1} bg={tableBG} p={2} borderRadius="md" shadow="md">
                <LeaderBoard students={students} />
              </Box>
            </Flex>
          </TwoColumnLayout>
          <TwoColumnLayout isMenuOpen={isMenuOpen} isFullWidth={false}>
            <Flex direction={['column', 'column', 'row']} w="100%" gap={5}>
              <Box
                w={['100%', '100%', '70%']}
                p={4}
                bg={tableBG}
                borderRadius="md"
                shadow="md"
              >
                <Heading as="h3" size="md">
                  Available Course For You
                </Heading>
                <Flex
                  direction={['column', 'column', 'row']}
                  w="100%"
                  gap={4}
                  my={2}
                  wrap="wrap"
                >
                  {/* Example with multiple CourseCards */}
                  {courses.map((course) => (
                    <Box
                      key={course.id}
                      w={['100%', '100%', 'calc(33.333% - 16px)']} // Adjust width for 3 items per row, accounting for gap
                      p={4}
                      bg="gray.100"
                      borderRadius="md"
                      shadow="md"
                    >
                      <Box>
                        <CourseCard
                          title="Introduction to React"
                          description="Learn the basics of React, including components, state, and props."
                          imageUrl="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/5923684/og_image/optimized/react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png"
                          duration="4 weeks"
                          level="Beginner"
                          onFavoriteToggle={(isFav) =>
                            console.log('Favorite status:', isFav)
                          }
                          isFavorite={false}
                        />
                      </Box>
                    </Box>
                  ))}
                </Flex>

                <Flex w="100%" gap={4}>
                  <Box
                    w="100%"
                    p={4}
                    bg="gray.100"
                    borderRadius="md"
                    shadow="md"
                  >
                    <StatisticsCard
                      totalCourses={10}
                      hoursSpent={120}
                      achievements={5}
                    />
                  </Box>
                </Flex>
              </Box>
              <Box
                w={['100%', '100%', '30%']}
                p={4}
                bg={tableBG}
                borderRadius="md"
                shadow="md"
              >
                <Box h="50%" bg="gray.100" borderRadius="md" shadow="md" mb={2}>
                  <Calendar />
                </Box>
                {/* Additional content for this column */}
              </Box>
            </Flex>
          </TwoColumnLayout>
        </Box>
      )
      break

    case 'students':
      content = (
        <Box>
          <TwoColumnLayout isMenuOpen={isMenuOpen}>
            <Box>
              <TopBar
                emailCount={emailCount}
                handleMenuToggle={handleMenuToggle}
                changeView={changeView}
              />
            </Box>

            <Box>
              <WelcomeCard />
            </Box>
            <Box p={5} bg={'white'} direction={{ base: 'column', md: 'row' }}>
              <StudentTabs
                assignmentData={assignmentData}
                courses={courses}
                announcements={announcements}
                myEvents={myEvents}
                allGradeData={allGradeData}
                studentData={studentData}
                pdfFiles={pdfFiles}
              />
            </Box>
            <Flex w="100%">
              <Box flex="3" minW="0">
                <CommunicationSupport
                  onMessageClick={() => console.log('Open messaging system')}
                  onForumClick={() =>
                    console.log('Navigate to discussion forum')
                  }
                  faqUrl="https://www.example.com/faqs"
                  contactUrl="https://www.example.com/contact"
                />
              </Box>
            </Flex>
          </TwoColumnLayout>
        </Box>
      )
      break
    case 'teachers':
      content = (
        <Box>
          <TwoColumnLayout isMenuOpen={isMenuOpen}>
            <Box>
              <TopBar
                emailCount={emailCount}
                handleMenuToggle={handleMenuToggle}
                changeView={changeView}
              />
            </Box>
            <Box>
              <StudentRoster initialStudentsData={studentsRoastData} />
            </Box>
            <Box p={5} bg={'gray.200'}>
              <ClassOverview
                classes={classesData}
                headingSize="md"
                classTextSize="lg"
                detailTextSize="sm"
                badgeColorScheme="blue"
                buttonColorScheme="orange"
                onClassClick={(classItem) =>
                  console.log('Class clicked:', classItem)
                }
              />
            </Box>

            <Flex gap={2} p={1}>
              <Box flex={3}>
                <AssignmentCard
                  assignments={assignments}
                  isLoading={myIsLoading}
                  getColorScheme={myGetColorScheme}
                  backgroundColor="linear-gradient(to right, #90EEEE90, #D8BFD7)"
                />
              </Box>
              <Box flex={4} bg={'gray.100'}>
                <AttendanceTracker
                  students={students}
                  onAttendanceRecorded={handleAttendanceRecorded}
                />
                <LessonPlanner />
              </Box>
            </Flex>
          </TwoColumnLayout>
        </Box>
      )
      break
    case 'courses':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box bg={'gray.200'}>
            {/* <MultiStepPaymentForm steps={steps} /> */}
          </Box>
        </Box>
      )
      break
    case 'attendance':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Attendance</Box>
        </Box>
      )
      break
    case 'calendar/events':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Events</Box>
        </Box>
      )
      break
    case 'lesson planning':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Lesson Planning</Box>
        </Box>
      )
      break
    case 'admissions':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Admission</Box>
        </Box>
      )
      break
    case 'reports':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Reports</Box>
        </Box>
      )
      break
    case 'fees':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Fees</Box>
        </Box>
      )
    case 'grading':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Grading</Box>
        </Box>
      )
      break
    case 'task':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Task</Box>
        </Box>
      )
      break
    case 'parent portal':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Parent Portal</Box>
        </Box>
      )
      break
    case 'staff':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Staff</Box>
        </Box>
      )
      break
    case 'timetable':
      content = (
        <Box>
          <Box>
            <TopBar
              emailCount={emailCount}
              handleMenuToggle={handleMenuToggle}
              changeView={changeView}
            />
          </Box>
          <Box>Time Table</Box>
        </Box>
      )
      break
    default:
      content = <div>Default Content</div>
  }

  return (
    <Box bg={dashboardBG} justifyItems={'center'}>
      {content}
    </Box>
  )
}

export default Dashboard
