import { useState } from 'react';
import { Accordion as ChakraAccordion, AccordionItem, AccordionButton, AccordionPanel, Box, Icon, Heading } from '@chakra-ui/react';
import { FaChevronDown } from "react-icons/fa";


const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  

    return (
        <ChakraAccordion allowMultiple>
        {items.map((item, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton onClick={() => toggleAccordion(index)}>
                <Box flex="1" textAlign="left">
                  {item.title}
                </Box>
                <Box flex="1" textAlign="right">
                  <Icon
                    as={FaChevronDown}
                    color={activeIndex === index ? "blue.500" : "gray.500"}
                    transform={activeIndex === index ? "rotate(180deg)" : null}
                  />
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{item.content}</AccordionPanel>
          </AccordionItem>
        ))}
      </ChakraAccordion>
      
    );
};

export default Accordion;
