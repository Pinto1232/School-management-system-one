import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";

const FaqSection = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <Box maxW="1200px" mx="auto" py={12}>
      <Heading textAlign="center" mb={12}>
        Frequently Asked Questions
      </Heading>
      <Accordion allowMultiple={true}>
        {faqs.map((faq, index) => (
          <AccordionItem key={index}>
            <AccordionButton onClick={() => handleAccordionClick(index)}>
              <Box flex="1" textAlign="left">
                {faq.question}
              </Box>
              <Box flex="1" textAlign="right">
                {activeIndex === index ? "-" : "+"}
              </Box>
            </AccordionButton>
            <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FaqSection;
