import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, IconButton } from "@chakra-ui/react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const ProductComparisonTable = ({ products, features }) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedProducts = products.sort((a, b) => {
    if (sortColumn === "") {
      return 0;
    }

    const aValue = a.features[sortColumn];
    const bValue = b.features[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });

  return (
    <Box  shadow={"6xl"} bg={'#fff'} color={'#000'} >
      <Flex justify="center" mb={8}>
        <Heading as="h2" size="lg">
          Product Comparison
        </Heading>
      </Flex>
      <Table variant="simple" size="sm" borderWidth="1px">
        <Thead >
          <Tr>
            <Th>Product</Th>
            {features.map((feature, index) => (
              <Th key={index}>
                {feature}
                <Flex justify={'center'}>
                  <IconButton
                    size="xs"
                    variant="ghost"
                    aria-label="Sort ascending"
                    icon={<FiChevronUp />}
                    onClick={() => handleSort(feature)}
                    isDisabled={sortColumn === feature && sortOrder === "asc"}
                  />
                  <IconButton
                    size="xs"
                    variant="ghost"
                    aria-label="Sort descending"
                    icon={<FiChevronDown />}
                    onClick={() => handleSort(feature)}
                    isDisabled={sortColumn === feature && sortOrder === "desc"}
                  />
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedProducts.map((product, index) => (
            <Tr key={index}>
              <Td>{product.name}</Td>
              {features.map((feature, index) => (
                <Td key={index}>{product.features[feature]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductComparisonTable;
