import * as React from "react";
import {
  GridItem,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import IconColumn from "./IconColumn";
import CustomButton from "./CustomButton";
import iconsData from "../../data/IconsData"; // import the iconsData array

const ICON_COLUMNS = [1, 2, 3, 4];
const BUTTON_WIDTH = ["100%", "150px", "200px"];

const IconColumns = ({ backgroundColor }) => {
  const bgButtonColor = useColorModeValue("#319795", "#3182ce");
  const iconsTextColor = useColorModeValue("#fff", "#fff");
  const buttonWidth = useBreakpointValue(BUTTON_WIDTH);

  return (
    <>
      <SimpleGrid bg={backgroundColor} padding={30} columns={ICON_COLUMNS}>
        <GridItem colSpan={ICON_COLUMNS} textAlign="center">
          <Heading as={'h2'}>Pinto Manuel</Heading>
        </GridItem>
        {Array.isArray(iconsData) &&
          iconsData.map((iconData) => (
            <IconColumn
              key={iconData.id}
              icon={iconData.icon}
              title={iconData.title}
              style={iconData.style}
              textColor={iconsTextColor}
            />
          ))}
        <Box mb={10} />
        <GridItem colSpan={ICON_COLUMNS} textAlign="center">
          <CustomButton
            bgColor={bgButtonColor}
            width={buttonWidth}
            textColor="#fff"
          >
            learn more
          </CustomButton>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default IconColumns;
