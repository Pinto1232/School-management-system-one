import React from 'react';
import { InputGroup, Input, InputRightElement, Button, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
    const bgColor = useColorModeValue('white', 'gray.200');
    const color = useColorModeValue('gray.700', 'gray.700');

    return (
        <InputGroup size="lg" w="full">
            <Input
                pr="4.5rem"
                placeholder="newsletter"
                bg={bgColor}
                color={color}
                border="0"
                _placeholder={{ color: useColorModeValue('gray.600', 'gray.200') }}
            />
            <InputRightElement width="5.5rem">
                <Button h="3.1rem" size="md" bg="#000" color="white" _hover={{ bg: 'orage.600' }}>
                    Submit
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

export default SearchBar;
