import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Image,
} from "@chakra-ui/react";

const AccordionComponent = () => {
  const [showImage, setShowImage] = useState(false);

  const handleAccordionClick = () => {
    setShowImage(!showImage);
  };

  return (
    <Box display="flex">
      <Accordion allowMultiple width="50%">
        <AccordionItem>
          <AccordionButton onClick={handleAccordionClick}>
            Accordion Item 1
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton onClick={handleAccordionClick}>
            Accordion Item 2
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {showImage && (
        <Image
          src=""
          alt="placeholder image"
          width="50%"
          objectFit="contain"
        />
      )}
    </Box>
  );
};

export default AccordionComponent;
