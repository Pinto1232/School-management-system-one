import React, { useState } from "react";
import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    IconButton,
    useDisclosure,
    Slide,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ style }) => {
    const { isOpen, onToggle } = useDisclosure();
    const [searchValue, setSearchValue] = useState("");

    return (
        <Box width="100%">
            <IconButton
                icon={<FaSearch />}
                onClick={onToggle}
                aria-label="Search"
                variant="ghost"
                size="lg"
                mr={2}
            />
            <Slide in={isOpen} direction="top" style={{ zIndex: 10 }}>
                <InputGroup width="100%" mt={2}>
                    <InputLeftElement pointerEvents="none">
                        <FaSearch color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        {...style}
                    />
                </InputGroup>
            </Slide>
        </Box>
    );
};

export default SearchBar;
