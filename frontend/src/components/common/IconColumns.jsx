// IconColumns.js
import * as React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { FaHome, FaUserAlt, FaBell, FaCog } from "react-icons/fa";
import IconColumn from "./IconColumn";

const IconColumns = () => {
  return (
    <SimpleGrid bg="#3182ce" padding={40} columns={4} spacing={10}>
      <IconColumn icon={FaHome} title="Multiple Auction Types" />
      <IconColumn icon={FaUserAlt} title="Globally Available" />
      <IconColumn icon={FaBell} title="Real Time Environment" />
      <IconColumn icon={FaCog} title="24/7 Support" />
    </SimpleGrid>
  );
};

export default IconColumns;