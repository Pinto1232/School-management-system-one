import {
  Box,
  Flex,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const FullWidthCard = ({ textTitle, subtitle, bulletPoints, tinyText, children }) => {
  return (
    <Box bg="white" w="100%" color="#000"  boxShadow="lg" overflow="hidden">
      <Box alignItems="center" px={[4, 6]} py={4} bg="gray.50">
      <Box mr={4} fontSize="xs">
          <Text color="gray.500">{tinyText}</Text>
        </Box>
        <Box mr={4} fontSize="xs">
          <Text color="gray.500">{subtitle}</Text>
        </Box>
        <Box>
          <Heading as="h3" size="md" fontWeight="medium" lineHeight="shorter">
            {textTitle}
          </Heading>
        </Box>
      </Box>
      <Box px={[4, 6]} py={4}>
        <UnorderedList listStyleType="circle" fontSize="sm" mb={4}>
          {Array.isArray(bulletPoints) && bulletPoints.map((point, index) => (
            <ListItem key={index}>{point}</ListItem>
          ))}
        </UnorderedList>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default FullWidthCard;
