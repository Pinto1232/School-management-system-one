import React from "react";
import servicesData from "../../data/servicesData";
import {
  Flex,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";

const ServicesSection = () => {
  return (
    <Box py={12} maxW="1200px" mx="auto">
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
        {Array.isArray(servicesData) &&
          servicesData.map((service, index) => (
            <GridItem key={index}>
              <Flex alignItems="center" mb={4}>
                <Icon as={service.icon} fontSize="2xl" mr={4} />
                <Heading as="h3" size="md">
                  {service.title}
                </Heading>
              </Flex>
              <Text fontSize="md">{service.description}</Text>
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default ServicesSection;
