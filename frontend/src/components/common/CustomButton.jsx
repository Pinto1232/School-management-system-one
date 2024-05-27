import React from 'react';
import { Button, Box } from '@mui/material';

const CustomButton = ({
  children,
  icon: Icon,
  bgColor = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  textColor = '#fff',
  fontSize = '16px',
  width = 'auto',
  margin = '10px',
  padding = '10px 20px',
  btnHover = 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  borderRadiusTopRight = '25px',
  borderRadiusBottomRight = '25px',
  borderRadiusTopLeft = '25px',
  borderRadiusBottomLeft = '25px',
  boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.1)',
  zIndex = '1',
  ...rest
}) => {
  return (
    <Button
      {...rest}
      sx={{
        background: bgColor,
        color: textColor,
        fontSize: fontSize,
        width: width,
        margin: margin,
        padding: padding,
        borderTopRightRadius: borderRadiusTopRight,
        borderBottomRightRadius: borderRadiusBottomRight,
        borderTopLeftRadius: borderRadiusTopLeft,
        borderBottomLeftRadius: borderRadiusBottomLeft,
        boxShadow: boxShadow,
        zIndex: zIndex,
        textTransform: 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        gap: 1,
        '&:hover': {
          background: btnHover,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {Icon && <Box component={Icon} sx={{ mr: 1 }} />}
      {children}
    </Button>
  );
};


const MemoizedCustomButton = React.memo(CustomButton)
export default MemoizedCustomButton;