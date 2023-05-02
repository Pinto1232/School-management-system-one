import React from "react";
import PropTypes from "prop-types";
import { Progress, Box, Text } from "@chakra-ui/react";

const ProgressBar = ({ value, color, ...rest }) => {
  return (
    <Box position="relative">
      <Progress
        value={value}
        size="md"
        colorScheme={color}
        borderRadius="md"
        height="12px"
        {...rest}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        hasStripe
        isAnimated
      />
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontWeight="bold"
        fontSize="sm"
        color="black"
        zIndex={1}
      >
        {`${value}%`}
      </Text>
    </Box>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ProgressBar;
