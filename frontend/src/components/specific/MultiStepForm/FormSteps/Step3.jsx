import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Step3 = ({ values, handleChange }) => (
  <Box>
    <FormControl mb={4}>
      <FormLabel>Phone Number</FormLabel>
      <Input name="phone" value={values.phone} onChange={handleChange} />
    </FormControl>
  </Box>
);

export default Step3;
