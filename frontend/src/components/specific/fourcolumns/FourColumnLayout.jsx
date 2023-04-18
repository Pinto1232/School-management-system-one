import { Flex, Box } from "@chakra-ui/react";

const FourColumnLayout = ({ children }) => {
    return (
        <Flex flexWrap="wrap">
            {children.map((child, index) => (
                <Box key={index} width={{ base: "100%", md: "50%", lg: "25%" }}>
                    {child}
                </Box>
            ))}
        </Flex>
    );
};

export default FourColumnLayout;
