import React from 'react';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ children, onClick, colorScheme = 'blue', ...rest }) => {
    return (
        <Button colorScheme={colorScheme} onClick={onClick} {...rest}>
            {children}
        </Button>
    );
};

export default CustomButton;
