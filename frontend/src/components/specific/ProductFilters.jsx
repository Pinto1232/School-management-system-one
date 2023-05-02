import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const ProductFilters = ({ filters, selectedFilters, onChange }) => {
  return (
    <Box>
      {filters &&
        filters.map((filter, index) => (
          <FormControl key={index} mb={4}>
            <FormLabel fontWeight="bold" mb={2}>
              {filter.label}
            </FormLabel>
            <Stack spacing={2}>
              {filter.options.map((option, index) => (
                <Checkbox
                  key={index}
                  isChecked={selectedFilters.includes(option)}
                  onChange={(e) => onChange(e.target.checked, option)}
                >
                  <Text fontSize="sm">{option}</Text>
                </Checkbox>
              ))}
            </Stack>
          </FormControl>
        ))}
    </Box>
  );
};

export default ProductFilters;
