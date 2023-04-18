import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

const PricingTable = ({ title, price, features, buttonText }) => {
    return (
        <Box boxShadow="md" borderRadius="md" p={6}>
            <Heading as="h3" size="lg" mb={4}>
                {title}
            </Heading>
            <Text fontSize="3xl" fontWeight="bold" mb={6}>
                {price}
            </Text>
            <Flex flexDirection="column" mb={6}>
                {features.map((feature, index) => (
                    <Text key={index} fontSize="lg" mb={2}>
                        {feature}
                    </Text>
                ))}
            </Flex>
            <Button colorScheme="blue">{buttonText}</Button>
        </Box>
    );
};

const PricingTables = () => {
    const pricingData = [
        {
            id: 1,
            title: "Basic",
            price: "$9.99/mo",
            features: ["1 user", "10 GB storage", "24/7 support"],
            buttonText: "Get Started",
        },
        {
            id: 2,
            title: "Pro",
            price: "$19.99/mo",
            features: ["5 users", "50 GB storage", "24/7 support"],
            buttonText: "Get Started",
        },
        {
            id: 3,
            title: "Premium",
            price: "$49.99/mo",
            features: ["Unlimited users", "100 GB storage", "24/7 support"],
            buttonText: "Get Started",
        },
    ];

    return (
        <Flex justifyContent="center" flexWrap="wrap" py={12}>
            {pricingData.map((pricing) => (
                <Box key={pricing.id} mx={4} mb={8} flex="1" maxW="300px">
                    <PricingTable {...pricing} />
                </Box>
            ))}
        </Flex>
    );
};

export default PricingTables;
