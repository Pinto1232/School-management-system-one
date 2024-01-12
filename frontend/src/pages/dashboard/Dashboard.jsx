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
import { useNavigate } from 'react-router-dom';
import WelcomeCard from "../../components/common/WelcomeCard";
import Attendance from "../../components/common/Attendance";
import AssignmentCard from "../../components/common/AssignmentCard";
import PerformanceCard from "../../components/common/PerformanceCard";
import LeaderBoard from "../../components/common/LeaderBoard";
import Calendar from "../../components/common/Calendar";
import CourseCard from "../../components/common/CourseCard";
import StatisticsCard from "../../components/common/StatisticsCard";




const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  console.log("User Dashboard", user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Attendance
  const assignments = [
    { subject: "Mathematics", percentage: 75 },
    { subject: "Programming", percentage: 90 },
    { subject: "Biology", percentage: 50 },
  ];

  //Peformance

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

  // Define the options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


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


  /* Views model rendering */
  let content;
  switch (currentView) {
    case 'dashboard':
      content = <Box>

        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>

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
          <Flex align={"start"} px={["2em"]} >
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

        {/* Content code collumns */}
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
        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>
        <Box>
          Students
        </Box>
      </Box>;
      break;
    case 'teachers':
      content = <Box>
        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>
        <Box>Teachers</Box>
      </Box>;
      break;
    case 'courses':
      content = <Box>
        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>
        <Box>Course</Box>
      </Box>;
      break;
    case 'attendance':
      content = <Box>
        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>
        <Box>Attendance</Box>
      </Box>;
      break;
    case 'calendar/events':
      content = <Box>
        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>
        <Box>Events</Box>
      </Box>;
      break;
    case 'lesson planning':
      content = <Box>
        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>
        <Box>Lesson Planning</Box>
      </Box>;
      break;
    case 'admissions':
      content = <Box>
        <TwoColumnLayout >
          <Flex align={"start"} p={6} gap={10} >
            <Box>
              <EmailBadge
                width="40px"
                height="40px"
                bgColor="transparent"
                count={emailCount}
                textColor="white"
                iconWidth="20px"  // Custom width for the icon
                iconHeight="20px" // Custom height for the icon
              />
            </Box>
            <Box>
              <BellBadge
                count={5}
                width="40px"
                height="40px"
                bgColor="red"
                textColor="white"
              />
            </Box>
            <Box>
              <GlobeBadge count={5} />
            </Box>
            <Box>
              <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
            </Box>
          </Flex>
        </TwoColumnLayout>
        <Box>Admission</Box>
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