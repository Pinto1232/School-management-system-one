import { Box } from "@chakra-ui/react";
import React from "react";

const StepTwo = ({ values, handleChange }) => {
  return (
    <Box>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={values.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={values.password}
        onChange={handleChange}
      />
    </Box>
  );
};

export default StepTwo;
