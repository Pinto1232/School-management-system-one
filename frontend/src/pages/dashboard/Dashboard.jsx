import React, { useContext, useEffect, useState } from "react";
import UserMenu from "../../pages/dashboard/UserMenu";
import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack, useColorModeValue } from "@chakra-ui/react";
import TwoColumnLayout from "../../components/specific/twoColumnLayout/TwoColumnLayout";
import EmailBadge from "../../components/specific/badge/EmailBadge";
import BellBadge from "../../components/specific/badge/BellBadge";
import GlobeBadge from "../../components/specific/badge/GlobeBadge";
import CardInfo from "../../components/common/CardInfo";
import { FaBell, FaBook, FaCoins, FaGraduationCap, FaMoneyBill, FaMoneyBillWave, FaReact, FaUser } from "react-icons/fa";
import DataTable from "../../components/common/DataTable";
import SearchComponent from "../../components/common/SearchComponent";
import ThreeDotsMenu from "../../components/common/ThreeDotsMenu";
import { useUserContext } from '../../contexts/UserContext';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeCard from "../../components/common/WelcomeCard";
import Attendance from "../../components/common/Attendance";
import AssignmentCard from "../../components/common/AssignmentCard";
import PerformanceCard from "../../components/common/PerformanceCard";
import LeaderBoard from "../../components/common/LeaderBoard";
import Calendar from "../../components/common/Calendar";
import CourseCard from "../../components/common/CourseCard";
import StatisticsCard from "../../components/common/StatisticsCard";
import { TopBar } from "./TopBar";
import LearningAnalytics from "../../components/common/LearningAnalytics";
import PdfGallery from "../../components/common/PdfGallery";
import CommunicationSupport from "../../components/common/CommunicationSupport";
import BigCalendar from "../../components/common/BigCalendar";
import Collaborative from "../../components/common/Collaborative";
import StudentTabs from "../../components/specific/studentTab/StudentTabs";



// Attendance
const assignments = [
  { subject: "Mathematics", percentage: 75 },
  { subject: "Programming", percentage: 90 },
  { subject: "Biology", percentage: 50 },
];
console.log("Assignment data", assignments)

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
};
console.log("Initial data", initialData)

// Define the options for the chart
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
console.log("Chart options data", options)


// Leadership
const students = [
  {
    id: 1,
    imageUrl: 'path/to/image1.jpg',
    percentage: 85,
    changeDirection: 'up',
  },
  {
    id: 2,
    imageUrl: 'path/to/image2.jpg',
    percentage: 5,
    changeDirection: 'down',
  },
  {
    id: 3,
    imageUrl: 'path/to/image2.jpg',
    percentage: 40,
    changeDirection: 'up',
  },
  {
    id: 4,
    imageUrl: 'path/to/image2.jpg',
    percentage: 20,
    changeDirection: 'up',
  },
];
console.log("Student data", students)

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
console.log("Course data", courses)


const analyticsData = [
  {
    component: 'Videos',
    timeSpent: 120 // Time spent in minutes
  },
  {
    component: 'Quizzes',
    timeSpent: 60
  },
  {
    component: 'Discussions',
    timeSpent: 90
  },
  {
    component: 'Books',
    timeSpent: 120
  },
  {
    component: 'Public discusions',
    timeSpent: 90
  },
  {
    component: 'Oral Debate',
    timeSpent: 90
  },
  {
    component: 'Art discusions',
    timeSpent: 90
  },
  {
    component: 'Public speech',
    timeSpent: 90
  },
];
console.log("Analytics data", analyticsData)


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
console.log("Assignment data", assignmentData)

// Anouncement Data
const announcements = [
  {
    id: 'announcement1',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content: 'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
  {
    id: 'announcement2',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content: 'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
  {
    id: 'announcement3',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content: 'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
  {
    id: 'announcement4',
    title: 'Campus Event Next Week',
    date: '2023-04-25',
    content: 'Join us for an exciting campus event next week. There will be guest speakers, workshops, and food!',
    link: 'https://www.example.com/event-details',
  },
];
console.log("Announcement", announcements)

//pdf Viewer
const pdfFiles = [
  {
    id: 'pdf1',
    title: 'Introduction to Algorithms',
    thumbnail: '/thumbnails/algorithms-thumbnail.jpg',
    url: '/pdfs/introduction-to-algorithms.pdf',
    isFree: true
  },
  {
    id: 'pdf2',
    title: 'Introduction to Algorithms',
    thumbnail: '/thumbnails/algorithms-thumbnail.jpg',
    url: '/pdfs/introduction-to-algorithms.pdf',
    isFree: true
  },
  {
    id: 'pdf3',
    title: 'Advanced Chemistry',
    thumbnail: '/thumbnails/advanced-chemistry-thumbnail.jpg',
    url: '/pdfs/advanced-chemistry.pdf',
    isFree: false,
    price: '30.99',
    onPurchase: () => {
      console.log('Initiate purchase for Advanced Chemistry');
    }
  },
  {
    id: 'pdf4',
    title: 'Advanced Chemistry',
    thumbnail: '/thumbnails/advanced-chemistry-thumbnail.jpg',
    url: '/pdfs/advanced-chemistry.pdf',
    isFree: false,
    price: '20.99',
    onPurchase: () => {
      console.log('Initiate purchase for Advanced Chemistry');
    }
  },
  {
    id: 'pdf5',
    title: 'Introduction to Algorithms',
    thumbnail: '/thumbnails/algorithms-thumbnail.jpg',
    url: '/pdfs/introduction-to-algorithms.pdf',
    isFree: true
  },
  {
    id: 'pdf6',
    title: 'Advanced Chemistry',
    thumbnail: '/thumbnails/advanced-chemistry-thumbnail.jpg',
    url: '/pdfs/advanced-chemistry.pdf',
    isFree: false,
    price: '19.99',
    onPurchase: () => {
      console.log('Initiate purchase for Advanced Chemistry');
    }
  },
];
console.log("pdf files", pdfFiles)





const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  console.log("User Dashboard", user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { view } = useParams();

  const [showWelcomeCard, setShowWelcomeCard] = useState(true);

  const handleAnalyticsClick = () => {
    // Handle the analytics click event
    // For example, navigate to the analytics page or display analytics
  };

  const handleClose = () => {
    setShowWelcomeCard(false); // Hide the WelcomeCard
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  const handleMenuToggle = (newState) => {
    setIsMenuOpen(newState);
  };


  const dashboardBG = useColorModeValue("#319795", "#3182ce");
  const tableBG = useColorModeValue("#171923", "#2d3748");
  const textColor = useColorModeValue("#fff", "#fff");
  const [studentsData, setStudentsData] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');


  const changeView = (view) => {
    setCurrentView(view);
  };



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      console.log('Response data:', response.data);
      setStudentsData(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    // Process the form data
    console.log(data);
  };


  // Attendance code
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  const handleDateRangeChange = (selectedRange) => {
    // Fetch and update attendance counts based on the selected range
    // For example:
    // setPresentCount(fetchedPresentCount);
    // setAbsentCount(fetchedAbsentCount);
  };

  /* Email count */
  const emailCount = 5;


  // My events
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Note: January is 0, February is 1, and so on.
  const currentDay = currentDate.getDate();

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
      description: 'Final project demonstration for the software engineering class.',
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
  ];
  console.log("My events", myEvents)


  /* Views model rendering */
  let content;
  switch (currentView) {
    case 'dashboard':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>

        <TwoColumnLayout isMenuOpen={isMenuOpen} w="100%">
          <Flex justifyContent="center" alignItems="center" w="100%">
            {showWelcomeCard && (
              <WelcomeCard
                backgroundImage="/path-to-your-background-image.jpg"
                onAnalyticsClick={handleAnalyticsClick}
                onClose={handleClose}
              />
            )}
          </Flex>
        </TwoColumnLayout>

        <TwoColumnLayout isMenuOpen={isMenuOpen}>
          <Flex align={"start"} px={["2em"]} justifyContent={'center'} alignItems={'center'} >
            <Heading as="h2" size="md">
              Admin Dashboard
            </Heading>
          </Flex>
        </TwoColumnLayout>

        <TwoColumnLayout isMenuOpen={isMenuOpen}>
          <Flex align={"start"} justifyContent={'center'} px={6} gap={4} flexWrap="wrap">
            <Box shadow='md' >
              <CardInfo
                icon={<FaCoins />}
                heading="Due Fees"
                iconSize={35}
                iconBgColor="orange.400"
                iconColor="white"
                text="$4503"
                bgColor="gray.100"
                textColor="gray.700"
                height="100px"
              />
            </Box>
            <Box shadow='md'>
              <CardInfo
                icon={<FaBell />}
                heading="Notifications"
                iconSize={35}
                iconBgColor="red.400"
                iconColor="white"
                text="12"
                bgColor="gray.100"
                textColor="gray.700"
                height="100px"
              />
            </Box>
            <Box shadow='md'>
              <CardInfo
                icon={<FaGraduationCap />}
                heading="Result"
                iconBgColor="yellow.400"
                iconSize={35}
                text="16"
                bgColor="gray.100"
                textColor="gray.700"
                height="100px"
              />
            </Box>

            <Box shadow='md'>
              <CardInfo
                icon={<FaMoneyBillWave />}
                heading="Expenses"
                iconBgColor="purple.400"
                iconColor="white"
                iconSize={35}
                text="$193000"
                bgColor="gray.100"
                textColor="gray.700"
                height="100px"
              />
            </Box>
            <Box shadow='md'>
              <CardInfo
                icon={<FaUser />}
                heading="Total Students"
                iconBgColor="green.400"
                iconColor="white"
                iconSize={35}
                text="35000"
                bgColor="gray.100"
                textColor="gray.700"
                height="100px"
              />
            </Box>
            <Box shadow='md'>
              <CardInfo
                icon={<FaBook />}
                iconBgColor="pink.400"
                iconColor="white"
                heading="Total Exams"
                iconSize={35}
                text="19050"
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
              <Flex justifyContent="space-between" alignItems="center" mb={[2, 4]}>
                <Heading
                  color={textColor}
                  as='h6'
                  fontSize={['md', 'lg', 'xl']}
                >
                  My Students
                </Heading>
                <Box>
                  <ThreeDotsMenu />
                </Box>
              </Flex>

              <Box>
                <SearchComponent />
                <DataTable data={studentsData} fetchData={fetchData} />
              </Box>
            </Box>
          </Flex>
        </TwoColumnLayout>

        <TwoColumnLayout isMenuOpen={isMenuOpen}>
          <Flex direction={['column', 'row']} w="100%" gap={1}>
            <Box flex={1} p={4} borderRadius="md" shadow="md" bg={tableBG}>
              <Attendance
                onDateRangeChange={handleDateRangeChange}
                presentCount={presentCount}
                absentCount={absentCount}
                bgBack={'linear(to-r, #ff7e5f, #feb47b)'}
                bordeRad={4}

              />
            </Box>
            <Box flex={1} bg={tableBG} p={4} borderRadius="md" shadow="md">
              <AssignmentCard
                assignments={assignments}
              />
            </Box>
          </Flex>
        </TwoColumnLayout>

        <TwoColumnLayout isMenuOpen={isMenuOpen}>
          <Flex direction={['column', 'row']} w="100%" gap={1}>
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
              <Heading as="h3" size="md">Available Course For You</Heading>
              <Flex w="100%" gap={4} my={2}>
                <Box w="50%" p={4} bg="gray.100" borderRadius="md" shadow="md">
                  <CourseCard
                    title="Introduction to React"
                    description="Learn the basics of React, including components, state, and props."
                    imageUrl="path-to-image.jpg"
                    duration="4 weeks"
                    level="Beginner"
                    onFavoriteToggle={(isFav) => console.log('Favorite status:', isFav)}
                    isFavorite={false}
                  />
                </Box>
                <Box w="50%" p={4} bg="gray.100" borderRadius="md" shadow="md">
                  <CourseCard
                    title="Object Oriented Programming"
                    description="Learn the basics of OBJ."
                    imageUrl="path-to-image.jpg"
                    duration="4 weeks"
                    level="Advance"
                    onFavoriteToggle={(isFav) => console.log('Favorite status:', isFav)}
                    isFavorite={false}
                  />
                </Box>
              </Flex>

              <Flex w="100%" gap={4}>
                <Box w="100%" p={4} bg="gray.100" borderRadius="md" shadow="md">
                  <StatisticsCard
                    totalCourses={10}
                    hoursSpent={120}
                    achievements={5}
                  />
                </Box>
              </Flex>
            </Box>
            <Box w="30%" p={4} bg={tableBG} borderRadius="md" shadow="md" >
              <Box h="50%" bg="gray.100" borderRadius="md" shadow="md" mb={2}>
                {/* Content for the first 50% height box */}
                <Calendar />
              </Box>
            </Box>
          </Flex>
        </TwoColumnLayout>
      </Box>;
      break;

    case 'students':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <TwoColumnLayout>
          <LearningAnalytics analyticsData={analyticsData} />
        </TwoColumnLayout>
        <Box p={5} bg={'white'}>
          <StudentTabs
            assignmentData={assignmentData}
            courses={courses}
            announcements={announcements}
            events={myEvents}
          />
        </Box>
        <Box p={4} bg={'gray.200'}>
          <PdfGallery files={pdfFiles} />
        </Box>
        <Flex w="100%">
          <Box flex="3" minW="0">
            <CommunicationSupport
              onMessageClick={() => console.log('Open messaging system')}
              onForumClick={() => console.log('Navigate to discussion forum')}
              faqUrl="https://www.example.com/faqs"
              contactUrl="https://www.example.com/contact"
            />
          </Box>
        </Flex>
      </Box>;
      break;
    case 'teachers':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Teachers</Box>
      </Box>;
      break;
    case 'courses':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Course</Box>
      </Box>;
      break;
    case 'attendance':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Attendance</Box>
      </Box>;
      break;
    case 'calendar/events':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Events</Box>
      </Box>;
      break;
    case 'lesson planning':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Lesson Planning</Box>
      </Box>;
      break;
    case 'admissions':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Admission</Box>
      </Box>;
      break;
    case 'reports':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Reports</Box>
      </Box>;
      break;
    case 'fees':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Fees</Box>
      </Box>;
    case 'grading':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Grading</Box>
      </Box>;
      break;
    case 'task':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Task</Box>
      </Box>;
      break;
    case 'parent portal':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Parent Portal</Box>
      </Box>;
      break;
    case 'staff':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Staff</Box>
      </Box>;
      break;
    case 'timetable':
      content = <Box>
        <Box>
          <TopBar emailCount={emailCount} handleMenuToggle={handleMenuToggle} changeView={changeView} />
        </Box>
        <Box>Time Table</Box>
      </Box>;
      break;
    default:
      content = <div>Default Content</div>;
  }


  return (
    <Box bg={dashboardBG} justifyItems={'center'} >
      {content}
    </Box>
  );
};

export default Dashboard;