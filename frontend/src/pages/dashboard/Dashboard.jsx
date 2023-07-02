// Dashboard.jsx
import React, { useContext } from "react";
import UserMenu from "../../pages/dashboard/UserMenu";
import BreadcrumbNavigation from "../../pages/dashboard/BreadcrumbNavigation";
import ContentSections from "../../pages/dashboard/ContentSections";
import UserProfileInfo from "../../pages/dashboard/UserProfileInfo";
import UserContext from "../../contexts/UserContext";
import { Box, useColorModeValue } from "@chakra-ui/react";
import TwoColumnLayout from "../../components/specific/twoColumnLayout/TwoColumnLayout";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  const dashboardBG = useColorModeValue("#e6ebee", "");

  return (
    <Box p={5} bg={dashboardBG} justify="center">
      <TwoColumnLayout
        leftContent={
          <UserProfileInfo
            avatarSrc={user.avatar}
            user={user}
            imageHeight="200px"
            imageWidth="200px"
          />
        }
        rightContent={<UserMenu />}
        gap={8}
      />
    </Box>
  );
};

export default Dashboard;
