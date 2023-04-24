import { Button } from "@chakra-ui/react";
import { useState } from "react";

const ToggleButton = ({ defaultIsOn = false, onText = "On", offText = "Off", onToggle, ...rest }) => {
    const [isOn, setIsOn] = useState(defaultIsOn);

    const handleToggle = () => {
        setIsOn(!isOn);
        onToggle && onToggle(!isOn);
    };

    return (
        <Button
            onClick={handleToggle}
            colorScheme={isOn ? "green" : "gray"}
            {...rest}
        >
            {isOn ? onText : offText}
        </Button>
    );
};

export default ToggleButton;
