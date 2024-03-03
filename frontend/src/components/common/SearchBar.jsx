import React from 'react';
import { InputGroup, Input, InputRightElement, Button, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
    const bgColor = useColorModeValue('white', 'gray.510');
    const Textcolor = useColorModeValue('#000', '#000');

    return (
        <InputGroup size="lg" w="full">
            <Input
                pr="4.5rem"
                placeholder="Newsletter"
                bg={bgColor}
                color={Textcolor}
                h="3.1rem"
                border="0"
                _placeholder={{ color: useColorModeValue('gray.600', 'gray.200') }}
            />
            <InputRightElement width="5.5rem">
                <Button h="3.3rem" size="md" bg="#000" color="white" borderRadius={' 0px 10px 10px 0px '} _hover={{ bg: 'orage.600' }}>
                    Submit
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

export default SearchBar;
