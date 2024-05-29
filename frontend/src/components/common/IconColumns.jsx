import * as React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Button,
} from "@mui/material";
import IconColumn from "./IconColumn";
import CustomButton from "./CustomButton";
import iconsData from "../../data/IconsData";
import imageBg from "../../assets/images/about-us.jpg";

const ICON_COLUMNS = [4, 3, 2, 1];
const BUTTON_WIDTH = ["100%", "150px", "200px"];

const IconColumns = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const bgButtonColor = theme.palette.mode === 'light' ? "#1976d2" : "#3182ce";
  const iconsTextColor = "#fff";
  const buttonWidth = isMobile ? BUTTON_WIDTH[0] : BUTTON_WIDTH[1];
  const textColor = "#fff";
  const containerBackground = theme.palette.mode === 'light' ? "#319795" : "#3182ce";
  const iconColors = ['#e53e3e', '#dd6b20', '#38a169', '#3182ce'];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: containerBackground,
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imageBg})`,
        padding: 10,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      <Typography variant="h2" color={textColor} mb={3} fontSize="2.5rem">
        What We Offer
      </Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {Array.isArray(iconsData) &&
          iconsData.map((iconData, index) => (
            <Grid item key={iconData.id}>
              <Box
                sx={{
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <IconColumn
                  icon={iconData.icon}
                  title={iconData.title}
                  textColor={iconsTextColor}
                  bgColor={iconColors[index % iconColors.length]}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
      <CustomButton
        bgColor={bgButtonColor}
        width={buttonWidth}
        textColor="#fff"
        mt={3}
        boxShadow="sm"
      >
        learn more
      </CustomButton>
    </Box>
  );
};

const MemoizedIconColumns = React.memo(IconColumns)
export default MemoizedIconColumns;
