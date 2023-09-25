import React, { useContext, useState } from "react";
import UserMenu from "../../pages/dashboard/UserMenu";
import BreadcrumbNavigation from "../../pages/dashboard/BreadcrumbNavigation";
import ContentSections from "../../pages/dashboard/ContentSections";
import UserProfileInfo from "../../pages/dashboard/UserProfileInfo";
import UserContext from "../../contexts/UserContext";
import { Box, Center, Flex, useColorModeValue } from "@chakra-ui/react";
import TwoColumnLayout from "../../components/specific/twoColumnLayout/TwoColumnLayout";
import EmailBadge from "../../components/specific/badge/EmailBadge";
import BellBadge from "../../components/specific/badge/BellBadge";
import GlobeBadge from "../../components/specific/badge/GlobeBadge";

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

      <TwoColumnLayout>
        
      </TwoColumnLayout>

      {/* Content code collumns */}
      <TwoColumnLayout isMenuOpen={isMenuOpen}>
      <Flex direction={['column', 'row']} w="100%" h="100vh" gap={1} >
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
