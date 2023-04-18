import { Button } from "@chakra-ui/react";

const CTAButton = ({ text, colorScheme, size, variant, onClick }) => {
    return (
        <Button
            colorScheme={colorScheme}
            size={size}
            variant={variant}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default CTAButton;
