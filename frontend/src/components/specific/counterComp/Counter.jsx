import { Flex, Text, Box } from "@chakra-ui/react";
import { useState } from "react";

const Counter = ({ title, count, color }) => {
    return (
        <Box textAlign="center" mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 4 }}>
            <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color={color}>
                {count}
            </Text>
            <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold" color="gray.600">
                {title}
            </Text>
        </Box>
    );
};

const Counters = ({ counters }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <Box bg="gray.100" py={{ base: 4, md: 8 }}>
            <Flex
                maxWidth="6xl"
                m="0 auto"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
            >
                {counters.map((counter, index) => (
                    <Counter
                        key={index}
                        title={counter.title}
                        count={counter.count}
                        color={counter.color}
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default Counters;
