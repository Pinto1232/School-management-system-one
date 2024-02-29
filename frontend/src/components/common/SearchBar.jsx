import React from 'react';
import { InputGroup, Input, InputRightElement, Button, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
    const bgColor = useColorModeValue('white', 'yellow.600');
    const color = useColorModeValue('gray.700', 'white');

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
                <Button h="3.1rem" size="md" bg="#000" color="white" _hover={{ bg: 'orange.600' }}>
                    Submit
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

export default SearchBar;
