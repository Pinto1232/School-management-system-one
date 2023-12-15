import { Button } from "@chakra-ui/react";
import React from "react";

const CustomButton = ({
  children,
  bgColor,
  textColor,
  fontSize,
  width,
  margin,
  padding,
  btnHover,
  borderRadiusTopRight,
  borderRadiusBottomRight,

  borderRadiusTopLeft,
  borderRadiusBottomLeft,
  zIndex,
  ...rest
}) => {
  const buttonStyle = {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: fontSize,
    width: width,
    margin: margin,
    padding: padding,
    _hover: btnHover,
    borderTopRightRadius: borderRadiusTopRight,
    borderBottomRightRadius: borderRadiusBottomRight,

    borderTopLeftRadius: borderRadiusTopLeft,
    borderBottomLeftRadius: borderRadiusBottomLeft,
    zIndex: zIndex,
  };

  return (
    <Button {...rest} sx={buttonStyle}>
      {children}
    </Button>
  );
};

export default CustomButton;
