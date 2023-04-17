import React from 'react'
import { Box } from "@chakra-ui/react";


const FormPanel = ({ isActive, children }) => {
    return (
        <Box display={isActive ? "block" : "none"} mt={4}>
            {children}
        </Box>
    )
};

export default FormPanel
