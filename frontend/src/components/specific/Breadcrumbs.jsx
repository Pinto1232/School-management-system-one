import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Breadcrumbs = ({ items, separator = <ChevronRightIcon /> }) => {
    return (
        <Box>
            <Breadcrumb separator={separator}>
                {items.map((item, index) => (
                    <BreadcrumbItem key={index} isCurrentPage={item.isCurrent}>
                        {item.isCurrent ? (
                            <Text fontWeight="bold">{item.label}</Text>
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
