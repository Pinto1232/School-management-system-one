// IconColumn.js
import * as React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";

const IconColumn = ({ icon, title }) => {
    return (
        <Box textAlign="center">
            <Icon
                borderRadius="full"
                border="2px solid white"
                as={icon}
                boxSize={16}
                p={2}
            />
            <Text mt={2}>{title}</Text>
        </Box>
    );
};

export default IconColumn;