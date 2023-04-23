import * as React from "react";
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import IconColumn from "./IconColumn";
import CustomButton from "./CustomButton";
import iconsData from "../../data/IconsData"; // import the iconsData array

const IconColumns = ({ backgroundColor, backgroundButton, buttonStyle }) => {
  return (
    <SimpleGrid
      bg={backgroundColor}
      padding={40}
      columns={[1, 2, 3, 4]}
      spacing={10}
    >
      {iconsData.map((iconData) => (
        <IconColumn
          key={iconData.id}
          icon={iconData.icon}
          title={iconData.title}
          style={iconData.style}
        />
      ))}
      <GridItem colSpan={[1, 2, 4]} textAlign="center">
        <CustomButton
          bg={backgroundButton}
          style={buttonStyle}
        >
          learn more
        </CustomButton>
      </GridItem>
    </SimpleGrid>
  );
};
export default IconColumns;
