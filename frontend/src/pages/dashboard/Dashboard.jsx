// Dashboard.jsx
import React, { useContext } from 'react';
import UserMenu from '../../pages/dashboard/UserMenu';
import BreadcrumbNavigation from '../../pages/dashboard/BreadcrumbNavigation';
import ContentSections from '../../pages/dashboard/ContentSections';
import UserProfileInfo from '../../pages/dashboard/UserProfileInfo';
import UserContext from '../../contexts/UserContext';
import { Box } from '@chakra-ui/react';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  // This is an example breadcrumb items, replace with your actual navigation
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <Box p={5}>
      <UserMenu />
      <BreadcrumbNavigation items={breadcrumbItems} />
      <UserProfileInfo 
        avatarSrc={user.avatar} 
        user={user}
        imageHeight="200px"
        imageWidth="200px" 
      />
      <ContentSections user={user} />
    </Box>
  );
};

export default Dashboard;
