import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

const AdjustableColumnLayout = ({ columns, children, bgBoxColor }) => {
  // Removed the additional columns for larger screens to keep a consistent layout
  const numColumns = columns || 2;

  return (
    <Grid
      templateColumns={`repeat(${numColumns}, 1fr)`} // Keep the column count consistent across breakpoints
      gap={4}
      color={bgBoxColor}
    >
      {React.Children.map(children, (child, i) => (
        <GridItem key={i} colSpan={1}> 
          {child}
        </GridItem>
      ))}
    </Grid>
  );
};

export default AdjustableColumnLayout;
