import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

const InputFieldComponent = ({ type = "text", placeholder, icon, style, placeholderTextColor }) => {
  return (
    <InputGroup>
      {icon && (
        <InputLeftElement {...style} pointerEvents="none">
          {React.createElement(icon)}
        </InputLeftElement>
      )}
      <Input style={{ backgroundColor: style }} type={type} placeholder={placeholder} _placeholder={{color: placeholderTextColor}} />
    </InputGroup>
  );
};

export default InputFieldComponent;
