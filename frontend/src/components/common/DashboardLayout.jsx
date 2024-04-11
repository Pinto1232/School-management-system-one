import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";

function DashboardLayout() {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "240px 1fr" }} gap={6}>
      <Box w="100%" h="10" bg="black">
        Sidebar
      </Box>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        <Box w="100%" h="10" bg="red.500">
          Main Content 1
        </Box>
        <Box w="100%" h="10" bg="yellow.500">
          Main Content 2
        </Box>
        {isWideVersion && (
          <Box w="100%" h="10" bg="green.500">
            Main Content 3
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default DashboardLayout;
