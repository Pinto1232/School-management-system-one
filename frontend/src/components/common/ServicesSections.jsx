import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const ServiceCard = ({ title, description, icon }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="base"
      height="100%"
    >
      <Box
        as={icon}
        fontSize={{ base: "3xl", md: "4xl" }}
        color="blue.500"
        mb={{ base: 2, md: 4 }}
      />
      <Heading as="h3" size="md" mb={{ base: 2, md: 4 }}>
        {title}
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }}>{description}</Text>
    </Box>
  );
};

const ServicesSections = ({ title, services }) => {
  return (
    <Box py={{ base: 8, md: 16 }}>
      <Heading
        as="h2"
        size={{ base: "xl", md: "2xl" }}
        mb={{ base: 4, md: 8 }}
        textAlign="center"
      >
        {title}
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center">
        {Array.isArray(services) &&
          services.map((service) => (
            <Box
              key={service.id}
              flexBasis={{ base: "100%", md: "45%", lg: "30%" }}
              m={{ base: 2, md: 4 }}
            >
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

export default ServicesSections;
