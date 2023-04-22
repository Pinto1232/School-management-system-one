import { Box, Flex, Text } from "@chakra-ui/react";

const Statistics = ({ title, value, color, icon }) => {
  return (
    <Box textAlign="center">
      <Text fontWeight="bold" mb={2}>{title}</Text>
      <Flex alignItems="center" justifyContent="center">
        <Box as={icon} fontSize="4xl" mr={2} color={color} />
        <Text fontSize="3xl" fontWeight="bold" color={color}>{value}</Text>
      </Flex>
    </Box>
  );
};

export default Statistics;
