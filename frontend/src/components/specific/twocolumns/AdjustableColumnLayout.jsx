import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

const AdjustableColumnLayout = ({ columns, children, bgBoxColor }) => {
  const numColumns = columns || 2;

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: `repeat(${numColumns}, 1fr)`,
      }}
      gap={4}
      color={bgBoxColor}
    >
      {React.Children.map(children, (child, i) => (
        <GridItem key={i} colSpan={{ base: 1, sm: 1 }}>
          {child}
        </GridItem>
      ))}
    </Grid>
  );
};

export default AdjustableColumnLayout;
