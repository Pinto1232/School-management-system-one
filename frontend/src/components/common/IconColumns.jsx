import * as React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import IconColumn from "./IconColumn";

const IconColumns = ({ iconsData }) => {
  return (
    <SimpleGrid bg="#3182ce" padding={40} columns={4} spacing={10}>
      {iconsData.map((iconData) => (
        <IconColumn key={iconData.id} icon={iconData.icon} title={iconData.title} />
      ))}
    </SimpleGrid>
  );
};

export default IconColumns;
