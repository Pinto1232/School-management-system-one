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
import UserMenu from './UserMenu'

// Attendance
const assignments = [
  { subject: 'Mathematics', percentage: 75 },
  { subject: 'Programming', percentage: 90 },
  { subject: 'Biology', percentage: 50 },
]
console.log('Assignment data', assignments)

// Define the initial data for the chart
const initialData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Performance',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}

console.log('Initial data', initialData)

// Define the options for the chart
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}
console.log('Chart options data', options)

// Leadership
const students = [
  {
    id: 1,
    name: 'Alice Wonderland',
    imageUrl: 'path/to/image1.jpg',
    percentage: 85,
    changeDirection: 'up',
  },
  {
    id: 2,
    name: 'Bob Builder',
    imageUrl: 'path/to/image2.jpg',
    percentage: 5,
    changeDirection: 'down',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    imageUrl: 'path/to/image3.jpg',
    percentage: 40,
    changeDirection: 'up',
  },
  {
    id: 4,
    name: 'Diana Prince',
    imageUrl: 'path/to/image4.jpg',
    percentage: 20,
    changeDirection: 'up',
  },
  {
    id: 5,
    name: 'Evan Almighty',
    imageUrl: 'path/to/image5.jpg',
    percentage: 75,
    changeDirection: 'down',
  },
  {
    id: 6,
    name: 'Fiona Shrek',
    imageUrl: 'path/to/image6.jpg',
    percentage: 60,
    changeDirection: 'up',
  },
  {
    id: 7,
    name: 'George Jungle',
    imageUrl: 'path/to/image7.jpg',
    percentage: 30,
    changeDirection: 'down',
  },
  {
    id: 8,
    name: 'Hannah Montana',
    imageUrl: 'path/to/image8.jpg',
    percentage: 90,
    changeDirection: 'up',
  },
  {
    id: 9,
    name: 'Ian Lightfoot',
    imageUrl: 'path/to/image9.jpg',
    percentage: 10,
    changeDirection: 'down',
  },
  {
    id: 10,
    name: 'Judy Hopps',
    imageUrl: 'path/to/image10.jpg',
    percentage: 95,
    changeDirection: 'up',
  },
  {
    id: 11,
    name: 'Kevin McCallister',
    imageUrl: 'path/to/image11.jpg',
    percentage: 50,
    changeDirection: 'up',
  },
  {
    id: 12,
    name: 'Lilo Pelekai',
    imageUrl: 'path/to/image12.jpg',
    percentage: 45,
    changeDirection: 'down',
  },
]
console.log('Student data', students)

const courses = [
  {
    id: 'course1',
    name: 'Introduction to Programming',
    description:
      'Learn the basics of programming with this introductory course.',
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
    description:
      'Learn the basics of programming with this introductory course.',
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
    description:
      'Learn the basics of programming with this introductory course.',
    assignments: [
      { id: 'assignment1', name: 'Homework #1', dueDate: '2023-05-10' },
      { id: 'assignment2', name: 'Project #1', dueDate: '2023-05-24' },
    ],
    materialsLink: '/course1/materials',
    gradesLink: '/course1/grades',
  },
]
console.log('Course data', courses)

const analyticsData = [
  {
    component: 'Videos',
    timeSpent: 120, // Time spent in minutes
  },
  {
    component: 'Quizzes',
    timeSpent: 60,
  },
  {
    component: 'Discussions',
    timeSpent: 90,
  },
  {
    component: 'Books',
    timeSpent: 120,
  },
  {
    component: 'Public discusions',
    timeSpent: 90,
  },
  {
    component: 'Oral Debate',
    timeSpent: 90,
  },
  {
    component: 'Art discusions',
    timeSpent: 90,
  },
  {
    component: 'Public speech',
    timeSpent: 90,
  },
]
console.log('Analytics data', analyticsData)

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
]
console.log('Assignment data', assignmentData)

// Anouncement Data
const announcements = [
  {
    id: 'announcement1',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content:
      'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
  {
    id: 'announcement2',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content:
      'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
  {
    id: 'announcement3',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content:
      'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
  {
    id: 'announcement4',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content:
      'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
]
console.log('Announcement', announcements)

//pdf Viewer
const pdfFiles = [
  {
    id: 'pdf1',
    title: 'Introduction to Algorithms',
    thumbnail: 'src/assets/images/about-us.jpg',
    url: '/pdfs/introduction-to-algorithms.pdf',
    isFree: true,
  },
  {
    id: 'pdf2',
    title: 'Introduction to Java',
    thumbnail: 'src/assets/images/faqs.jpg',
    url: '/pdfs/introduction-to-algorithms.pdf',
    isFree: true,
  },
  {
    id: 'pdf3',
    title: 'Advanced Chemistry',
    thumbnail: 'src/assets/images/basic-plan.jpg',
    url: '/pdfs/advanced-chemistry.pdf',
    isFree: false,
    price: '30.99',
    onPurchase: () => {
      console.log('Initiate purchase for Advanced Chemistry')
    },
  },
  {
    id: 'pdf4',
    title: 'Advanced React Js',
    thumbnail: 'src/assets/images/basic-plan.jpg',
    url: '/pdfs/advanced-chemistry.pdf',
    isFree: false,
    price: '20.99',
    onPurchase: () => {
      console.log('Initiate purchase for Advanced Chemistry')
    },
  },
  {
    id: 'pdf5',
    title: 'Introduction to MuSQL',
    thumbnail: 'src/assets/images/school.jpg',
    url: '/pdfs/introduction-to-algorithms.pdf',
    isFree: true,
  },
  {
    id: 'pdf6',
    title: 'Advanced JavaScript',
    thumbnail: 'src/assets/images/background-01.jpg',
    url: '/pdfs/advanced-chemistry.pdf',
    isFree: false,
    price: '19.99',
    onPurchase: () => {
      console.log('Initiate purchase for Advanced Chemistry')
    },
  },
]
console.log('pdf files', pdfFiles)

// All grade data  by semester
const allGradeData = {
  'Fall 2022': {
    studentName: 'John Doe',
    GPA: 3.8,
    cumulativeGrade: 'A',
    courses: [
      {
        name: 'Mathematics',
        grade: 'A',
        assessments: [
          {
            type: 'Assignment',
            name: 'Homework 1',
            grade: 'A',
            dueDate: '2022-09-10',
            submitted: true,
            feedback: 'Great work!',
          },
          {
            type: 'Quiz',
            name: 'Quiz 1',
            grade: 'A-',
            dueDate: '2022-09-15',
            submitted: true,
            feedback: 'Good effort!',
          },
        ],
      },
    ],
  },
  'Spring 2023': {
    studentName: 'John Doe',
    GPA: 3.9,
    cumulativeGrade: 'A',
    courses: [
      {
        name: 'History',
        grade: 'B+',
        assessments: [
          {
            type: 'Essay',
            name: 'Essay on WWI',
            grade: 'B',
            dueDate: '2023-02-20',
            submitted: true,
            feedback: 'Well-researched essay.',
          },
          {
            type: 'Exam',
            name: 'Midterm Exam',
            grade: 'A-',
            dueDate: '2023-03-25',
            submitted: true,
            feedback: 'Excellent understanding of the material.',
          },
        ],
      },
    ],
  },
}
console.log('Grade data', allGradeData)

// Student profile data
const studentData = {
  name: 'Jane Doe',
  avatarUrl: 'https://via.placeholder.com/150',
  major: 'Computer Science',
  email: 'jane.doe@example.com',
  bio: 'A passionate computer science student with an interest in AI and machine learning.',
  enrollmentDate: 'August 23, 2020',
  GPA: '3.8',
  phone: '(123) 456-7890',
  address: '123 Main St, Anytown, USA',
}

// Define some example class data
const classesData = [
  {
    id: 'class1',
    name: 'Introduction to Programming',
    numberOfStudents: 30,
    upcomingAssignments: [
      { id: 'assignment1', name: 'Homework #1', dueDate: '2023-05-10' },
      { id: 'assignment2', name: 'Project #1', dueDate: '2023-05-24' },
    ],
    recentActivity: 'New lecture material available',
  },
  {
    id: 'class2',
    name: 'Advanced Mathematics',
    numberOfStudents: 25,
    upcomingAssignments: [
      { id: 'assignment1', name: 'Calculus Homework', dueDate: '2023-05-15' },
      { id: 'assignment2', name: 'Algebra Quiz', dueDate: '2023-05-20' },
    ],
    recentActivity: 'Graded the midterm exam',
  },
  {
    id: 'class3',
    name: 'World History',
    numberOfStudents: 28,
    upcomingAssignments: [
      {
        id: 'assignment1',
        name: 'Essay on Ancient Civilizations',
        dueDate: '2023-05-18',
      },
      { id: 'assignment2', name: 'Group Presentation', dueDate: '2023-06-01' },
    ],
    recentActivity: 'Discussion on World War II',
  },
  {
    id: 'class4',
    name: 'Chemistry Lab',
    numberOfStudents: 20,
    upcomingAssignments: [
      {
        id: 'assignment1',
        name: 'Lab Report on Acids and Bases',
        dueDate: '2023-05-12',
      },
      { id: 'assignment2', name: 'Periodic Table Quiz', dueDate: '2023-05-26' },
    ],
    recentActivity: 'Lab safety video uploaded',
  },
  {
    id: 'class5',
    name: 'Chemistry Lab',
    numberOfStudents: 20,
    upcomingAssignments: [
      {
        id: 'assignment1',
        name: 'Lab Report on Acids and Bases',
        dueDate: '2023-05-12',
      },
      { id: 'assignment2', name: 'Periodic Table Quiz', dueDate: '2023-05-26' },
    ],
    recentActivity: 'Lab safety video uploaded',
  },
  {
    id: 'class6',
    name: 'Chemistry Lab',
    numberOfStudents: 20,
    upcomingAssignments: [
      {
        id: 'assignment1',
        name: 'Lab Report on Acids and Bases',
        dueDate: '2023-05-12',
      },
      { id: 'assignment2', name: 'Periodic Table Quiz', dueDate: '2023-05-26' },
    ],
    recentActivity: 'Lab safety video uploaded',
  },
  {
    id: 'class7',
    name: 'Chemistry Lab',
    numberOfStudents: 20,
    upcomingAssignments: [
      {
        id: 'assignment1',
        name: 'Lab Report on Acids and Bases',
        dueDate: '2023-05-12',
      },
      { id: 'assignment2', name: 'Periodic Table Quiz', dueDate: '2023-05-26' },
    ],
    recentActivity: 'Lab safety video uploaded',
  },
  {
    id: 'class8',
    name: 'Chemistry Lab',
    numberOfStudents: 20,
    upcomingAssignments: [
      {
        id: 'assignment1',
        name: 'Lab Report on Acids and Bases',
        dueDate: '2023-05-12',
      },
      { id: 'assignment2', name: 'Periodic Table Quiz', dueDate: '2023-05-26' },
    ],
    recentActivity: 'Lab safety video uploaded',
  },
  {
    id: 'class9',
    name: 'Chemistry Lab',
    numberOfStudents: 20,
    upcomingAssignments: [
      {
        id: 'assignment1',
        name: 'Lab Report on Acids and Bases',
        dueDate: '2023-05-12',
      },
      { id: 'assignment2', name: 'Periodic Table Quiz', dueDate: '2023-05-26' },
    ],
    recentActivity: 'Lab safety video uploaded',
  },
]

const studentsRoastData = [
  {
    id: 1,
    name: 'John Doe',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'johndoe@example.com',
    age: 20,
    class: '10A',
    course: 'Mathematics',
  },
  {
    id: 2,
    name: 'Jane Doe',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'janedoe@example.com',
    age: 19,
    class: '10B',
    course: 'Science',
  },
  {
    id: 3,
    name: 'Jane Doe',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'janedoe@example.com',
    age: 19,
    class: '10B',
    course: 'Science',
  },
  {
    id: 4,
    name: 'Jane Doe',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'janedoe@example.com',
    age: 19,
    class: '10B',
    course: 'Science',
  },
  {
    id: 5,
    name: 'Jane Doe',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'janedoe@example.com',
    age: 19,
    class: '10B',
    course: 'Science',
  },
  {
    id: 6,
    name: 'Jane Doe',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'janedoe@example.com',
    age: 19,
    class: '10B',
    course: 'Science',
  },
  {
    id: 7,
    name: 'Jane Doe',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'janedoe@example.com',
    age: 19,
    class: '10B',
    course: 'Science',
  },
  {
    id: 8,
    name: 'Pinto Manuel',
    profilePicture: 'https://via.placeholder.com/150',
    contactInformation: 'pintotnet@gmail.com',
    age: 19,
    class: '10B',
    course: 'Science',
  },
]
console.log('Teacher Classes data', classesData)

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  console.log('User Dashboard', user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { view } = useParams()

  const [showWelcomeCard, setShowWelcomeCard] = useState(true)
  const steps = [UserInfo, UserPlan, UserSummary, Confirmation]
  const [myIsLoading, setMyIsLoading] = useState(true)
  const [attendance, setAttendance] = useState([])

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

  const handleAnalyticsClick = () => {
    // Handle the analytics click event
    // For example, navigate to the analytics page or display analytics
  }

  const handleClose = () => {
    setShowWelcomeCard(false)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

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
              {showWelcomeCard && (
                <WelcomeCard
                  onAnalyticsClick={handleAnalyticsClick}
                  onClose={handleClose}
                />
              )}
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

                <Box>
                  <SearchForm/>
                  <DataTable data={studentsData} fetchData={fetchData} />
                </Box>
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
              <Box flex={1} bg={tableBG} p={4} borderRadius="md" shadow="md">
                <LeaderBoard students={students} />
              </Box>
            </Flex>
          </TwoColumnLayout>

          <TwoColumnLayout>
            <Flex w="100%" gap={2}>
              <Box w="70%" p={4} bg={tableBG} borderRadius="md" shadow="md">
                <Heading as="h3" size="md">
                  Available Course For You
                </Heading>
                <Flex w="100%" gap={4} my={2}>
                  <Box
                    w="50%"
                    p={4}
                    bg="gray.100"
                    borderRadius="md"
                    shadow="md"
                  >
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
                  <Box
                    w="50%"
                    p={4}
                    bg="gray.100"
                    borderRadius="md"
                    shadow="md"
                  >
                    <CourseCard
                      title="Object Oriented Programming"
                      description="Learn the basics of OBJ."
                      imageUrl="https://qph.cf2.quoracdn.net/main-qimg-4af0af5b88b278ab393a969b2c30ce28-lq"
                      duration="4 weeks"
                      level="Advance"
                      onFavoriteToggle={(isFav) =>
                        console.log('Favorite status:', isFav)
                      }
                      isFavorite={false}
                    />
                  </Box>
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
              <Box w="30%" p={4} bg={tableBG} borderRadius="md" shadow="md">
                <Box h="50%" bg="gray.100" borderRadius="md" shadow="md" mb={2}>
                  {/* Content for the first 50% height box */}
                  <Calendar />
                </Box>
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
            <Box p={5} bg={'white'} direction={{ base: 'column', md: 'row' }} >
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
