import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

const InputField = ({ type, placeholder, leftIcon, value, onChange, style  }) => {
  return (
    <InputGroup>
      {leftIcon && (
        <InputLeftElement children={leftIcon} color="gray.500"  />
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        focusBorderColor="#3182ce"
        style={style}
      />
    </InputGroup>
  );
};

export default InputField;
