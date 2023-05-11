import { Box, Flex, Grid, Select, Text } from "@chakra-ui/react";

const ProductSorting = ({ options, selectedOption, onChange, BoxWidth }) => {
  return (
    <Box>
      <Box gap={8} justify={"center"} alignItems={"center"}>
        <Grid>
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
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductSorting;
