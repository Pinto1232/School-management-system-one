import * as React from "react";
import { Center, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import IconColumn from "./IconColumn";
import CustomButton from "./CustomButton";
import { useColorModeValue, } from '@chakra-ui/react';


const IconColumns = ({ iconsData }) => {
  const backgroundColor = useColorModeValue('#E2E8F0', '#718096');
  const backgroundButton = useColorModeValue('#319795', '#3182ce');


  

  return (
    <SimpleGrid  bg={backgroundColor} padding={40} columns={4} spacing={10}>
      {iconsData.map((iconData) => (
        <IconColumn
          key={iconData.id}
          icon={iconData.icon}
          title={iconData.title}
          style={iconData.style}
        />
      ))}
      <GridItem colSpan={4} textAlign="center">
        <CustomButton
          bg={backgroundButton}
          style={{
            width: "200px",
            color: "#fff"
          }}
        >
          learn more
        </CustomButton>
      </GridItem>
    </SimpleGrid>
  );
};

export default IconColumns;
