import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Step1 = ({ values, handleChange }) => (
    <Box>
        <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={values.name} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={values.email} onChange={handleChange} />
        </FormControl>
    </Box>
);

export default Step1;
