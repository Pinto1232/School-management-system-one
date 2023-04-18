import React from "react";
import { Flex, Box, Heading, Text, Grid, GridItem, Icon } from "@chakra-ui/react";
import { FaLaptopCode, FaMobileAlt, FaSearch, FaChartBar } from "react-icons/fa";

const servicesData = [
    {
        icon: FaLaptopCode,
        title: "Web Development",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis consectetur nisl a pretium.",
    },
    {
        icon: FaMobileAlt,
        title: "Mobile Development",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis consectetur nisl a pretium.",
    },
    {
        icon: FaSearch,
        title: "SEO Optimization",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis consectetur nisl a pretium.",
    },
    {
        icon: FaChartBar,
        title: "Analytics",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis consectetur nisl a pretium.",
    },
];

const ServicesSection = () => {
    return (
        <Box py={12} maxW="1200px" mx="auto">
            <Heading as="h2" size="xl" textAlign="center" mb={8}>
                Our Services
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
                {servicesData.map((service, index) => (
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
