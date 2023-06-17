import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, useBreakpointValue } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Breadcrumbs = ({ items, bgColor, separator = <ChevronRightIcon /> }) => {
    // Add responsiveness to the font size using the useBreakpointValue hook
    const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

    return (
        <Box>
            <Breadcrumb 
                p={{ base: 2, md: 4 }} // Add responsiveness to the padding
                bg={bgColor} 
                separator={separator}
            >
                {Array.isArray(items) && items.map((item, index) => (
                    <BreadcrumbItem key={index} isCurrentPage={item.isCurrent}>
                        {item.isCurrent ? (
                            <Text whiteSpace={'nowrap'} fontSize={fontSize} fontWeight="bold">{item.label}</Text>
                        ) : (
                            <BreadcrumbLink href={item.href} fontSize={fontSize}>{item.label}</BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Box>
    );
};

export default Breadcrumbs;
