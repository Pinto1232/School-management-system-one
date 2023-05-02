import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const DropdownButton = ({
  options,
  menuListWidth,
  buttonWidth,
  buttonDropDownText,
  buttonSize,
  buttonColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Menu isOpen={isOpen}>
        <MenuButton
          as={Button}
          size={buttonSize}
          colorScheme={buttonColor}
          onClick={() => setIsOpen(!isOpen)}
          width={buttonWidth}
        >
          {buttonDropDownText}
        </MenuButton>
        <MenuList minWidth="100%">
          {Array.isArray(options) &&
            options.map((option, index) => (
              <MenuItem key={index} onClick={() => console.log(option)}>
                {option}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default DropdownButton;
