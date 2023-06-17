import * as React from "react";
import {
  GridItem,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Heading,
  Center,
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
      <SimpleGrid bg={backgroundColor} padding={35} columns={ICON_COLUMNS} gap={2}> // Adjust gap here
        <GridItem colSpan={ICON_COLUMNS} textAlign="center" mb={15}>
          <Heading as={'h2'}>What We Offer</Heading>
        </GridItem>
        {Array.isArray(iconsData) &&
          iconsData.map((iconData) => (
            <Center>
              <IconColumn
                key={iconData.id}
                icon={iconData.icon}
                title={iconData.title}
                style={iconData.style}
                textColor={iconsTextColor}
              />
            </Center>
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
