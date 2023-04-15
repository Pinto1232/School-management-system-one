import { Button } from '@chakra-ui/react';
import React from 'react';

const CustomButton = (props) => {
  return (
    <Button {...props} sx={{ ...props.sx, color: 'red' }}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
