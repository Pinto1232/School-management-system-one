import React from "react";
import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

const CardCustom = ({ data, cardsPerRow, paragraphWidth }) => {
  const cardWidth = `${100 / cardsPerRow}%`;

  const rows = [];

  for (let i = 0; i < data.length; i += cardsPerRow) {
    const row = data.slice(i, i + cardsPerRow);
    rows.push(row);
  }

  return (
    <Flex alignItems="center" justifyContent="center" marginTop={4}>
      {rows.map((row, rowIndex) => (
        <Flex key={rowIndex} flexWrap="wrap">
          {row.map((card, cardIndex) => (
            <Box key={`${rowIndex}-${cardIndex}`} width={cardWidth} padding={2}>
              <Flex>
                <Image
                  src={card.image}
                  alt={card.title}
                  boxSize="100px"
                  objectFit="cover"
                />
                <Box marginLeft={2}>
                  <Heading size="sm">{card.heading}</Heading>
                  <Text w={paragraphWidth}>{card.paragraphText}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default CardCustom;
