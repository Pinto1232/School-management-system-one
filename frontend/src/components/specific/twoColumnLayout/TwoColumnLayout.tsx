// TwoColumnLayout.jsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const TwoColumnLayout = ({ leftContent, rightContent, gap = 4, ...props }) => {
  return (
    <Flex direction={{ base: "column", md: "row" }} justify={'center'} {...props}>
      <Box flex={{ md: 1 }} mb={{ base: gap, md: 0 }}>
        {leftContent}
      </Box>
      <Box flex={{ md: 1 }}>
        {rightContent}
      </Box>
    </Flex>
  );
};

export default TwoColumnLayout;
