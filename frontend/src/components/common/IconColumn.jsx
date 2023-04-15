// IconColumn.js
import * as React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useColorModeValue, } from '@chakra-ui/react';


const IconColumn = ({ icon, title, style }) => {
    const textColor = useColorModeValue('#fff', '#3182ce');
    const backgroundColor = useColorModeValue('#3182ce', '#fff');
    const backgroundButton = useColorModeValue('#3182CE', '#2C5282');

    return (
        <Box textAlign="center">
            <Icon
                borderRadius="full"
                border="2px solid white"
                as={icon}
                boxSize={16}
                bg={backgroundColor}
                color={textColor}
                p={2}
            />
            <Text mt={2}>{title}</Text>
        </Box>
    );
};

export default IconColumn;