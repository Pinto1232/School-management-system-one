import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

const InputFieldComponent = ({ type = "text", placeholder, icon, style }) => {
  return (
    <InputGroup>
      {icon && (
        <InputLeftElement {...style} pointerEvents="none">
          {React.createElement(icon)}
        </InputLeftElement>
      )}
      <Input {...style} type={type} placeholder={placeholder} />
    </InputGroup>
  );
};

export default InputFieldComponent;
