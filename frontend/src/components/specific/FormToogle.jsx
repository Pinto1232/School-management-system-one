import React from 'react'
import { useState } from "react";
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";


const FormToogle = () => {
    const [showPanel, setShowPanel] = useState(false);

    const handleTogglePanel = () => {
        setShowPanel(!showPanel);
    };

    return (
        <VStack spacing={4}>
            <Button onClick={handleTogglePanel}>{showPanel ? "Hide Panel" : "Show Panel"}</Button>
            {showPanel && (
                <FormControl>
                    <FormLabel>Panel Content</FormLabel>
                    <Input placeholder="Enter something..." />
                </FormControl>
            )}
            <FormControl>
                <FormLabel>Input Field 1</FormLabel>
                <Input placeholder="Enter something..." />
            </FormControl>
            <FormControl>
                <FormLabel>Input Field 2</FormLabel>
                <Input placeholder="Enter something..." />
            </FormControl>
        </VStack>
    );
}

export default FormToogle
