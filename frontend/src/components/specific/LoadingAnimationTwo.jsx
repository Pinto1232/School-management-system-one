import { Box, Spinner } from "@chakra-ui/react";

const LoadingAnimationTwo = ({ size = "xl", color = "blue.500", message = "Loading..." }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Spinner size={size} color={color} thickness="4px" speed="0.65s" emptyColor="gray.200" />
      {message && <Box mt={2} fontWeight="semibold">{message}</Box>}
    </Box>
  );
};

export default LoadingAnimationTwo;
