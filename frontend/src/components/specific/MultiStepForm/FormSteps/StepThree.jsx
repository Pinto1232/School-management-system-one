import { Box } from "@chakra-ui/react";
import React from "react";

const StepThree = ({ values, handleChange }) => {
  return (
    <Box>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={values.firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={values.lastName}
        onChange={handleChange}
      />
    </Box>
  );
};

export default StepThree;
