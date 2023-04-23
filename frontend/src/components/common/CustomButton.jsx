import { Button } from '@chakra-ui/react';
import React from 'react';

const CustomButton = ({ children, bgColor, size, textColor, fontSize, width, margin, padding, ...rest }) => {

  const buttonStyle = {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: fontSize,
    width: width,
    margin: margin,
    padding: padding,
  };

  return (
    <Button {...rest} sx={{ ...rest.sx, ...buttonStyle }} size={size}>
      {children}
    </Button>
  );
};

export default CustomButton;
