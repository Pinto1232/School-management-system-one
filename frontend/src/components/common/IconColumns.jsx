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
  Flex,
} from "@chakra-ui/react";
import IconColumn from "./IconColumn";
import CustomButton from "./CustomButton";
import iconsData from "../../data/IconsData"; // import the iconsData array

const ICON_COLUMNS = [4, 3, 2, 1];
const BUTTON_WIDTH = ["100%", "150px", "200px"];

const IconColumns = () => {
  const bgButtonColor = useColorModeValue("#319795", "#3182ce");
  const iconsTextColor = useColorModeValue("#fff", "#fff");
  const buttonWidth = useBreakpointValue(BUTTON_WIDTH);
  const textColor = useColorModeValue("#fff", "#fff");
  const containerBackground = useColorModeValue("#319795", "#3182ce");
  const iconColors = ['#e53e3e', '#dd6b20', '#38a169', '#3182ce']; 


  return (
    <>
      <Flex
        direction="column" 
        bg={containerBackground}
        padding={10}
        align="center"
        justify="space-between" 
        wrap="wrap"
        gap={20}
      >
        <Heading color={textColor} as={'h3'} mb={15}>What We Offer</Heading>
        <Flex
          wrap="wrap"
          justify="center"
          align="center"
          gap={10}
        >
          {Array.isArray(iconsData) &&
            iconsData.map((iconData, index) => (
              <IconColumn
                key={iconData.id}
                icon={iconData.icon}
                title={iconData.title}
                textColor={iconsTextColor}
                bgColor={iconColors[index % iconColors.length]}
              />
            ))}
        </Flex>
        <CustomButton
          bgColor={bgButtonColor}
          width={buttonWidth}
          textColor="#fff"
          mt={10}
          boxShadow="sm"
        >
          learn more
        </CustomButton>
      </Flex>
    </>
  );
};

export default IconColumns;
