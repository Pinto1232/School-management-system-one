import React, { useContext, useEffect, useState } from "react";
import UserMenu from "../../pages/dashboard/UserMenu";
import BreadcrumbNavigation from "../../pages/dashboard/BreadcrumbNavigation";
import ContentSections from "../../pages/dashboard/ContentSections";
import UserProfileInfo from "../../pages/dashboard/UserProfileInfo";
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
import Calendar from "../../components/common/Calendar";
import BarChart from "../../components/common/BarChart";



const Dashboard = () => {
  const { user } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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



  /* Email count */
  const emailCount = 5;

  return (
    <Box bg={dashboardBG} justifyItems={'center'} >

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
            <UserMenu onMenuToggle={handleMenuToggle} />
          </Box>
        </Flex>
      </TwoColumnLayout>

      <TwoColumnLayout isMenuOpen={isMenuOpen}>
        <Flex align={"start"} px={6} gap={10} >
          <Box>
            <Heading as="h2" size="md">
              Admin Dashboard
            </Heading>
          </Box>
        </Flex>
      </TwoColumnLayout>

      <TwoColumnLayout isMenuOpen={isMenuOpen}>
        <Flex align={"start"} px={6} gap={4} flexWrap="wrap">
          <Box shadow='md' >
            <CardInfo
              icon={<FaCoins />}
              heading="Due Fees"
              iconSize={35}
              iconBgColor="orange.400" // New prop
              iconColor="white"
              text="$4503"
              bgColor="gray.100"
              textColor="gray.700"
              width="225px"  // Custom width
              height="100px" // Custom height
            />
          </Box>
          <Box shadow='md'>
            <CardInfo
              icon={<FaBell />}
              heading="Notifications"
              iconSize={35}
              iconBgColor="red.400" // New prop
              iconColor="white"
              text="12"
              bgColor="gray.100"
              textColor="gray.700"
              width="225px"  // Custom width
              height="100px" // Custom height
            />
          </Box>
          <Box shadow='md'>
            <CardInfo
              icon={<FaGraduationCap />}
              heading="Result"
              iconBgColor="yellow.400" // New prop
              iconSize={35}
              text="16"
              bgColor="gray.100"
              textColor="gray.700"
              width="225px"  // Custom width
              height="100px" // Custom height
            />
          </Box>

          <Box shadow='md'>
            <CardInfo
              icon={<FaMoneyBillWave />}
              heading="Expenses"
              iconBgColor="purple.400" // New prop
              iconColor="white"
              iconSize={35}
              text="$193000"
              bgColor="gray.100"
              textColor="gray.700"
              width="255px"  // Custom width
              height="100px" // Custom height
            />
          </Box>
          <Box shadow='md'>
            <CardInfo
              icon={<FaUser />}
              heading="Total Students"
              iconBgColor="green.400" // New prop
              iconColor="white"
              iconSize={35}
              text="35000"
              bgColor="gray.100"
              textColor="gray.700"
              width="225px"  // Custom width
              height="100px" // Custom height
            />
          </Box>
          <Box shadow='md'>
            <CardInfo
              icon={<FaBook />}
              iconBgColor="pink.400" // New prop
              iconColor="white"
              heading="Total Exams"
              iconSize={35}
              text="19050"
              bgColor="gray.100"
              textColor="gray.700"
              width="225px"
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
            <Box mb={[2, 4]}>
              <Heading
                color={textColor}
                as='h6'
                fontSize={['md', 'lg', 'xl']}
              >
                My Students
              </Heading>
            </Box>

            <Box>
              <ThreeDotsMenu />
            </Box>

            <Box>
              <SearchComponent />
              {/* <DataTable data={studentsData} /> */}
              <DataTable data={studentsData} fetchData={fetchData} />
            </Box>
          </Box>
        </Flex>
      </TwoColumnLayout>


      <TwoColumnLayout isMenuOpen={isMenuOpen}>
        <Flex direction={['column', 'row']} w="100%" h={["50vh", "100vh"]} gap={1}>
          <Box flex={1} p={4} borderRadius="md" shadow="md" bg={tableBG}>
            <Box p={8}>
              <BarChart />
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                  <FormControl isInvalid={errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input id="firstName" {...register('firstName', { required: 'First name is required' })} />
                    <FormErrorMessage>
                      {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input id="lastName" {...register('lastName', { required: 'Last name is required' })} />
                    <FormErrorMessage>
                      {errors.lastName && errors.lastName.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" {...register('email', { required: 'Email is required' })} />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Button colorScheme="blue" type="submit">Update</Button>
                </VStack>
              </form> 
            </Box>
          </Box>
          <Box flex={1} bg={tableBG} p={4} borderRadius="md" shadow="md">
            <Calendar />
          </Box>
        </Flex>
      </TwoColumnLayout>
    </Box>

  );

};

export default Dashboard;