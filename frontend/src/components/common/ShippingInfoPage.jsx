import { Box, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react";

const ShippingInfoPage = ({
  title,
  subtitle,
  steps,
  shippingInfo,
  contactInfo,
}) => {
  return (
    <Box py={10} maxW="1000px" mx="auto">
      <Heading as="h1" mb={5} fontSize={["2xl", "4xl"]}>
        {title}
      </Heading>
      <Text fontSize="lg" mb={10}>
        {subtitle}
      </Text>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={[5, 10]}
      >
        <GridItem>
          <VStack align="flex-start" spacing={5}>
            {Array.isArray(steps) &&
              steps.map((step, index) => (
                <Box
                  key={step.title}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={5}
                  shadow="md"
                  w="100%"
                  h="100%"
                >
                  <Heading
                    as="h2"
                    fontSize={["md", "lg"]}
                    mb={2}
                    textAlign="start"
                  >
                    {`Step ${index + 1}: ${step.title}`}
                  </Heading>
                  <Text>{step.description}</Text>
                </Box>
              ))}
          </VStack>
        </GridItem>
        <GridItem>
          <Box
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            p={5}
            shadow="md"
            w="100%"
            h="100%"
          >
            <Heading as="h2" fontSize={["xl", "2xl"]} mb={5} textAlign="start">
              Shipping Information
            </Heading>
            <Text>{shippingInfo}</Text>
          </Box>
          {/* <Box
                        mt={[5, 10]}
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={5}
                        shadow="md"
                        w="100%"
                        h="100%"
                    >
                        <Heading as="h2" fontSize={["xl", "2xl"]} mb={5} textAlign="center">
                            Contact Information
                        </Heading>
                        <Text>{contactInfo}</Text>
                    </Box> */}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ShippingInfoPage;
