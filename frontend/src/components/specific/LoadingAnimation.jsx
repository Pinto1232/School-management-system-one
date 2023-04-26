import { Spinner } from "@chakra-ui/react";

const LoadingAnimation = ({ size, thickness, speed, color, label }) => {
    return (
        <Spinner
            size={size ? size : "md"}
            thickness={thickness ? thickness : "4px"}
            speed={speed ? speed : "0.65s"}
            color={color ? color : "blue.500"}
            label={label ? label : "Loading..."}
        />
    );
};

export default LoadingAnimation;
