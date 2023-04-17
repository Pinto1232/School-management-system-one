import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Step2 = ({ values, handleChange }) => (
  <Box>
    <FormControl mb={4}>
      <FormLabel>Address</FormLabel>
      <Input name="address" value={values.address} onChange={handleChange} />
    </FormControl>
    <FormControl mb={4}>
      <FormLabel>City</FormLabel>
      <Input name="city" value={values.city} onChange={handleChange} />
    </FormControl>
  </Box>
);

export default Step2;
