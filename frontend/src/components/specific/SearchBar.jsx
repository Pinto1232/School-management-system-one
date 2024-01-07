import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton, useColorModeValue, ScaleFade } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  const [showInput, setShowInput] = useState(false);
  const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#4A5568');
  const iconsColorBg = useColorModeValue('#319795', '#3182ce');

  const toggleSearchInput = () => {
    setShowInput(!showInput);
  };

  return (
    <InputGroup maxW='100%'>
      <ScaleFade in={showInput} initialScale={0.9}>
        <Input
          placeholder="Search..."
          borderRadius="md"
          w={['100%', '100%', '100%', '73em']}
          bg={textFieldBackgroundColor}
        />
      </ScaleFade>
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