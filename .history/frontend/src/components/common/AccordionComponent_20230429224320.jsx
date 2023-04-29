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
