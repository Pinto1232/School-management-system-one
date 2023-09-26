import React, { useContext, useState } from "react";
import UserMenu from "../../pages/dashboard/UserMenu";
import BreadcrumbNavigation from "../../pages/dashboard/BreadcrumbNavigation";
import ContentSections from "../../pages/dashboard/ContentSections";
import UserProfileInfo from "../../pages/dashboard/UserProfileInfo";
import UserContext from "../../contexts/UserContext";
import { Box, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import TwoColumnLayout from "../../components/specific/twoColumnLayout/TwoColumnLayout";
import EmailBadge from "../../components/specific/badge/EmailBadge";
import BellBadge from "../../components/specific/badge/BellBadge";
import GlobeBadge from "../../components/specific/badge/GlobeBadge";
import CardInfo from "../../components/common/CardInfo";
import { FaBell, FaBook, FaCoins, FaGraduationCap, FaMoneyBill, FaMoneyBillWave, FaReact, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  const handleMenuToggle = (newState) => {
    setIsMenuOpen(newState);
  };


  const dashboardBG = useColorModeValue("#319795", "#3182ce");

  return (
    <Box bg={dashboardBG} justifyItems={'center'} >
      <TwoColumnLayout isMenuOpen={isMenuOpen}>
        <Flex align={"start"} p={6} gap={10} >
          <Box>
            <EmailBadge 
              width="40px" 
              height="40px" 
              bgColor="transparent" 
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
              icon={<FaCoins/>}
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
              icon={<FaGraduationCap  />}
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
              icon={<FaUser  />}
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
            icon={<FaBook/>}
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
        <Flex direction={['column', 'row']} w="100%" h={["50vh", "100vh"]} gap={1}>
            <Box flex={1} bg="whitesmoke" p={4} borderRadius="md" shadow="md">
              Column 1
            </Box>
            <Box flex={1} bg="whitesmoke" p={4} borderRadius="md" shadow="md">
              Column 2
            </Box>
        </Flex>
      </TwoColumnLayout>
    </Box>

  );
};

export default Dashboard;
