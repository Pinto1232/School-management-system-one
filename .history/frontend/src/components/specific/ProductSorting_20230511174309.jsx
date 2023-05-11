import { Box, Flex, Select } from "@chakra-ui/react";

const ProductSorting = ({ options, selectedOption, onChange, BoxWidth }) => {
  return (
    <Box>
    <Flex gap={2} justify={'center'} alignItems={'center'}>
      <Box whiteSpace="nowrap">
        <strong>Sort by:</strong>
      </Box>
      <Select
        border={0}
        size="sm"
        w={BoxWidth}
        value={selectedOption}
        cursor={'pointer'}
        onChange={(e) => onChange(e.target.value)}
        placement="bottom"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Flex>
  </Box>
  );
};

export default ProductSorting;
