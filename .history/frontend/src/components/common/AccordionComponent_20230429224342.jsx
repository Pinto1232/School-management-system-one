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
  const [showImageTwo, setShowImageTwo] = useState(false);

  const handleAccordionClick = () => {
    setShowImage(!showImage);
    setShowImageTwo(false); // Close the other accordion
  };

  const handleAccordionClickTwo = () => {
    setShowImageTwo(!showImageTwo);
    setShowImage(false); // Close the other accordion
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
          <AccordionButton onClick={handleAccordionClickTwo}>
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
          src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
          alt="placeholder image"
          width="50%"
          objectFit="contain"
        />
      )}

      {showImageTwo && (
        <Image
          src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg"
          alt="placeholder image"
          width="50%"
          objectFit="contain"
        />
      )}
    </Box>
  );
};

export default AccordionComponent;
