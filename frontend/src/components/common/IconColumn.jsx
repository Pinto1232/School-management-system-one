// IconColumn.js
import * as React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useColorModeValue, } from '@chakra-ui/react';


const IconColumn = ({ icon, title, style }) => {
    const textColor = useColorModeValue('#fff', '#3182ce');
    const IncosBgColor = useColorModeValue('#319795', '#fff');




    return (
        <Box textAlign="center">
            <Icon
                borderRadius="full"
                border="2px solid white"
                as={icon}
                boxSize={16}
                bg={IncosBgColor}
                color={textColor}
                p={2}
            />
            <Text mt={2}>{title}</Text>
        </Box>
    );
};

export default IconColumn;