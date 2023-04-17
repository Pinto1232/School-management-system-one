import React, { useState } from "react";
import {
    Button, VStack, FormControl, FormLabel, Input, Textarea, Flex,
} from "@chakra-ui/react";
import FormPanel from './FormPanel'

const ReusableForm = () => {
    const [activeButton, setActiveButton] = useState(1);

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    return (
        <VStack spacing={4} >
            <Flex gap={4}>
                <Button onClick={() => handleButtonClick(1)}>Items1</Button>
                <Button onClick={() => handleButtonClick(2)}>Items2</Button>
                <Button onClick={() => handleButtonClick(3)}>Items3</Button>
            </Flex>
            <FormPanel isActive={activeButton === 1}>
                <FormControl id="item1-name">
                    <FormLabel>Item 1 Name</FormLabel>
                    <Input type="text" placeholder="Enter item name" />
                </FormControl>
                <FormControl id="item1-description">
                    <FormLabel>Item 1 Description</FormLabel>
                    <Textarea placeholder="Enter item description" />
                </FormControl>
            </FormPanel>

            <FormPanel isActive={activeButton === 2}>
                <FormControl id="item2-name">
                    <FormLabel>Item 2 Name</FormLabel>
                    <Input type="text" placeholder="Enter item name" />
                </FormControl>
                <FormControl id="item2-description">
                    <FormLabel>Item 2 Description</FormLabel>
                    <Textarea placeholder="Enter item description" />
                </FormControl>
            </FormPanel>

            <FormPanel isActive={activeButton === 3}>
                <FormControl id="item3-name">
                    <FormLabel>Item 3 Name</FormLabel>
                    <Input type="text" placeholder="Enter item name" />
                </FormControl>
                <FormControl id="item3-description">
                    <FormLabel>Item 3 Description</FormLabel>
                    <Textarea placeholder="Enter item description" />
                </FormControl>
            </FormPanel>
        </VStack>
    );
};

export default ReusableForm
