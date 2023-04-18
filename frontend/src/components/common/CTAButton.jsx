import { Button } from "@chakra-ui/react";

const CTAButton = ({ text, colorScheme, size, variant, onClick, style }) => {
    return (
        <Button
            colorScheme={colorScheme}
            size={size}
            variant={variant}
            onClick={onClick}
            style={style}
        >
            {text}
        </Button>
    );
};

export default CTAButton;
