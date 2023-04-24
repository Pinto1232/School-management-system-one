import * as React from "react";
import { GridItem, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import IconColumn from "./IconColumn";
import CustomButton from "./CustomButton";
import iconsData from "../../data/IconsData"; // import the iconsData array

const IconColumns = ({
  backgroundColor,
 }) => {


  const bgButtonColor = useColorModeValue('#319795', '#3182ce')
  const iconsTextColor = useColorModeValue('#fff', '#fff')

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
          textColor={iconsTextColor}
        />
      ))}
      <GridItem colSpan={[1, 2, 4]} textAlign="center">
        <CustomButton
          bgColor={bgButtonColor}
          width={200}
          textColor="#fff"
        >
          learn more
        </CustomButton>
      </GridItem>
    </SimpleGrid>
  );
};
export default IconColumns;
