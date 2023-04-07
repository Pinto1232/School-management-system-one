import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  const [showInput, setShowInput] = useState(false);

  const toggleSearchInput = () => {
    setShowInput(!showInput);
  };

  return (
    <InputGroup>
      {showInput && (
        <Input
          placeholder="Search..."
          borderRadius="md"
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
