import { Box } from "@chakra-ui/react";
import React from "react";
import bgImage from "../assets/images/faqs.jpg";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import FaqSection from "../components/specific/Faq/FaqSection";
import faqsData from "../data/faqsData";

const Faq = () => {
  return (
    <Box>
      <Jumbotron
        title="Frequent asked questions"
        subtitle="This is a simple Jumbotron-like component built using Chakra UI."
        buttonText="learn more"
        bgImage={bgImage}
      />

      <Box
        maxW="6xl"
        border={0}
        textAlign={"start"}
        mx="auto"
        mt={10}
        p={6}
        borderWidth={1}
        rounded="md"
      >
        <FaqSection faqs={faqsData} />
      </Box>
    </Box>
  );
};

export default Faq;
