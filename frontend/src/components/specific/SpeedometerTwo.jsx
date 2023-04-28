import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const SpeedometerTwo = ({ value, max, size, strokeWidth, color, label }) => {
  const percentage = (value / max) * 100;

  return (
    <CircularProgress
      value={percentage}
      size={size}
      strokeWidth={strokeWidth}
      color={color}
    >
      <CircularProgressLabel>
        {label || Math.round(percentage)}%
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default SpeedometerTwo;
