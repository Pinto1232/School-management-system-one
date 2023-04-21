import { Box, Flex, Text, IconButton, useColorMode, Link } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";


const DashboardHeader = ({
    title,
    isDarkMode,
    subtitle,
    onToggle,
    breadcrumbItems = []
}) => {
    const { colorMode } = useColorMode();

    return (
        <Box
            as="header"
            w="100%"
            borderBottom="1px"
            borderBottomColor="gray.200"
            py={4}
            px={6}
        >
            <Flex alignItems="center" justifyContent="space-between">
                <Box>
                    <Text fontWeight="bold" fontSize="xl" mt={2} mb={4}>
                        {title}
                    </Text>
                    {breadcrumbItems && (
                        <Flex alignItems="center">
                            {breadcrumbItems.map((item, index) => (
                                <Box key={index} display="flex" alignItems="center">
                                    {index > 0 && (
                                        <Box mx={2}>
                                            <Text fontSize="sm" fontWeight="bold">/</Text>
                                        </Box>
                                    )}
                                    <Link href={item.href}>
                                        <Text fontSize="sm" fontWeight="bold">{item.label}</Text>
                                    </Link>
                                </Box>
                            ))}
                        </Flex>
                    )}
                    {/* <Text fontWeight="bold" fontSize="xl" mt={2} mb={4}>
                        {subtitle}
                    </Text> */}
                </Box>

                <Flex alignItems="center">
                    <IconButton
                        size="sm"
                        fontSize="md"
                        variant="ghost"
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        icon={isDarkMode ? <FiSun /> : <FiMoon />}
                        onClick={onToggle}
                    />
                    <Text ml={2} fontSize="md">
                        {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default DashboardHeader;
