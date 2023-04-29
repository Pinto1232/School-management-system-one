import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";

const TableWithIcons = ({ productsImages, ThBgColor, ThColor }) => {
  console.log("Color", ThColor);

  return (
    <Table variant="simple">
      <Thead bg={ThBgColor}>
        <Tr whiteSpace={"nowrap"} color={ThColor}>
          <Th>Photo</Th>
          <Th>Name</Th>
          <Th>ID Number</Th>
          <Th>Year</Th>
          <Th>Marks</Th>
          <Th>Rank</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array.isArray(productsImages) &&
          productsImages.map((product) => (
            <Tr key={product.id}>
              <Td>
                <Image
                  borderRadius={25}
                  boxSize="50px"
                  objectFit="cover"
                  src={product.image}
                  alt={product.name}
                />
              </Td>
              <Td>{product.name}</Td>
              <Td>{product.idNumber}</Td>
              <Td>{product.year}</Td>
              <Td>{product.marks}</Td>
              <Td>{product.rank}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default TableWithIcons;
