import React from "react";
import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";

const CardCustom = ({
  data,
  cardsPerRow,
  CardWidth,
  paragraphWidth,
  rows,
  columns,
}) => {
  const cardWidth = `${20 / columns}%`;
  const totalCards = rows * columns;

  const rowsArray = [];

  for (let i = 0; i < totalCards; i += columns) {
    const row = data.slice(i, i + columns);
    rowsArray.push(row);
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      marginTop={4}
      gap={4}
      w={CardWidth}
    >
      {rowsArray.map((row, rowIndex) => (
        <Box shadow={"lg"} key={rowIndex} flexWrap="wrap">
          {row.map((card, cardIndex) => (
            <Box
              key={`${rowIndex}-${cardIndex}`}
              width={`calc(100%/${columns})`}
              padding={2}
            >
              <Flex>
                <Image
                  src={card.image}
                  alt={card.title}
                  fontSize={["50px", "100px"]}
                  objectFit="cover"
                  borderRadius={"50%"}
                />
                <Box marginLeft={5}>
                  <Heading size="sm" fontSize={["md", "lg"]}>
                    {card.heading}
                  </Heading>
                  <Text w={paragraphWidth} fontSize={["sm", "md"]}>
                    {card.paragraphText}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      ))}
    </Flex>
  );
};
export default CardCustom;
