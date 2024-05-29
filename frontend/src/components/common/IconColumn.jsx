// IconColumn.js
import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const StyledIcon = styled('div')(({ theme, bgcolor, color }) => ({
  borderRadius: '50%',
  border: '2px solid white',
  backgroundColor: bgcolor,
  color: color,
  padding: theme.spacing(1),
  fontSize: theme.spacing(8),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[6],
  },
}));

const IconColumn = ({ icon: IconComponent, title, textColor, bgColor }) => {
  const theme = useTheme();
  const IconColor = theme.palette.mode === 'light' ? "#fff" : "#3182ce";
  const IncosBgColor = theme.palette.mode === 'light' ? "#319795" : "#fff";

  return (
    <Box
      textAlign="center"
      bgcolor={bgColor}
      p={3}
      boxShadow={3}
      borderRadius={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <StyledIcon
        bgcolor={IncosBgColor}
        color={IconColor}
        sx={{ width: '80px', height: '80px' }}
      >
        <IconComponent />
      </StyledIcon>
      <Typography mt={2} fontSize="1.2rem" color={textColor} fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

const MemoizedIconColumn = React.memo(IconColumn)
export default MemoizedIconColumn;
