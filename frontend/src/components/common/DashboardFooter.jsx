import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const DashboardFooter = ({ children, ...props }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box as="footer" w="100%" bg={bgColor} p={4} {...props}>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        {children ? (
          children
        ) : (
          <Text fontSize="sm" color={textColor}>
            © {new Date().getFullYear()} Pisval Tech. All rights reserved.
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default DashboardFooter;