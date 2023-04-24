import { Switch, Text } from "@chakra-ui/react";

const Toggle = ({
    isOn,
    handleToggle,
    label,
    onColor,
    offColor,
    buttonSize,
    labelColor,
    ...rest
}) => {
    return (
        <Switch
            isChecked={isOn}
            onChange={handleToggle}
            colorScheme={isOn ? onColor : offColor}
            size={buttonSize}
            {...rest}
        >
            <Text mt={6}  style={{ color: labelColor }}>{label}</Text>
        </Switch>
    );
};

export default Toggle;
