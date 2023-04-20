import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const ServiceCard = ({ title, description, icon }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            bg="white"
            boxShadow="base"
        >
            <Box as={icon} fontSize="4xl" color="blue.500" mb={4} />
            <Heading as="h3" size="md" mb={4}>
                {title}
            </Heading>
            <Text fontSize="md">{description}</Text>
        </Box>
    );
};

const ServicesSection = ({ title, services }) => {
    return (
        <Box py={16}>
            <Heading as="h2" size="xl" mb={8} textAlign="center">
                {title}
            </Heading>
            <Flex flexWrap="wrap" justifyContent="center">
                {services.map((service) => (
                    <Box key={service.id} flexBasis={{ base: "100%", md: "45%", xl: "30%" }} m={4}>
                        <ServiceCard
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                        />
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default ServicesSection;
