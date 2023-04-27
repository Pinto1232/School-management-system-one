import { Box, Flex, Select } from "@chakra-ui/react";

const ProductSorting = ({ options, selectedOption, onChange }) => {
    return (
        <Box>
            <Flex alignItems="center" justify={'center'}>
                <Box whiteSpace="nowrap" mr={2}>
                    <strong >Sort by:</strong>
                </Box>
                <Select
                    size="sm"
                    value={selectedOption}
                    onChange={(e) => onChange(e.target.value)}
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
