import { useState } from 'react';
import { Box, Text, Tooltip as ChakraTooltip } from '@chakra-ui/react';

const Tooltip = ({ label, children, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <Box position="relative" {...rest}>
            <ChakraTooltip label={label} isOpen={isOpen} placement="top">
                <Text
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    onFocus={handleOpen}
                    onBlur={handleClose}
                    tabIndex={0}
                    display="inline-block"
                    cursor="help"
                >
                    {children}
                </Text>
            </ChakraTooltip>
        </Box>
    );
};

export default Tooltip;
