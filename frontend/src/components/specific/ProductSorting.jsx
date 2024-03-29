import { Box, Flex, Select, Text } from "@chakra-ui/react";

const ProductSorting = ({ options, selectedOption, onChange, BoxWidth }) => {
  return (
    <Box>
      <Flex gap={2} justify={"center"} alignItems={"center"}>
        <Flex>
        <Text whiteSpace="nowrap">Sort by:</Text>
        <Select
          border={0}
          size="sm"
          w={BoxWidth}
          value={selectedOption}
          cursor={"pointer"}
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
      </Flex>
    </Box>
  );
};

export default ProductSorting;
