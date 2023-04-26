import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  const [showInput, setShowInput] = useState(false);
  const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#4A5568');
  const iconsColorBg = useColorModeValue('#319795', '#3182ce')



  const toggleSearchInput = () => {
    setShowInput(!showInput);
  };

  return (
    <InputGroup maxW='100%'>
      {showInput && (
        <Input
          placeholder="Search..."
          borderRadius="md"
          minW="100%"
          w='400px'
          bg={textFieldBackgroundColor}
          
        />
      )}
      <InputRightElement>
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={toggleSearchInput}
          borderRadius="md"
          bg={iconsColorBg}
          color={'white'}

        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
