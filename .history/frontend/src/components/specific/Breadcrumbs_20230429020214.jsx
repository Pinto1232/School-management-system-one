import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Breadcrumbs = ({ items, bgColor, BreadcPadding, separator = <ChevronRightIcon /> }) => {
    return (
        <Box>
            <Breadcrumb p={BreadcPadding} bg={bgColor} separator={separator}>
                {Array.isArray(items) && items.map((item, index) => (
                    <BreadcrumbItem key={index} isCurrentPage={item.isCurrent}>
                        {item.isCurrent ? (
                            <Text whiteSpace={'nowrap'}  fontWeight="bold">{item.label}</Text>
                        ) : (
                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Box>
    );
};

export default Breadcrumbs;
