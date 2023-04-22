import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SpecificValueCounter = ({ title, initialCount, color, maxCount }) => {
    const [count, setCount] = useState(initialCount);
  
    useEffect(() => {
      const timer = setInterval(() => {
        if (count < maxCount) {
          setCount((prevCount) => prevCount + 1);
        } else {
          clearInterval(timer);
        }
      }, 50);
  
      return () => clearInterval(timer);
    }, [count, maxCount]);
  
    return (
      <Box textAlign="center">
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color={color}>
          {count}
        </Text>
        <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold" color="gray.600">
          {title}
        </Text>
      </Box>
    );
  };

export default SpecificValueCounter;
  
