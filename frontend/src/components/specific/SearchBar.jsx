import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  const [showInput, setShowInput] = useState(false);
  const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#4A5568');
  
  

  const toggleSearchInput = () => {
    setShowInput(!showInput);
  };

  return (
    <InputGroup>
      {showInput && (
        <Input
          placeholder="Search..."
          borderRadius="md"
          w="100%"
          bg={textFieldBackgroundColor}
        />
      )}
      <InputRightElement>
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={toggleSearchInput}
          borderRadius="md"

        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
