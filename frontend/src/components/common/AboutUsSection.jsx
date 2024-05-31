import React from 'react'
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import MemoizedCustomButton from './CustomButton'

const AboutUsSection = ({
  heading,
  subheading,
  image,
  altText,
  children,
  style,
  headingStyle,
}) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const bgButtonColor = isDarkMode ? '#3182ce' : '#319795'

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      py={12}
      maxWidth="1200px"
      mx="auto"
      gap={8}
      style={style}
    >
      <Box flex="1" textAlign={{ xs: 'center', md: 'left' }}>
        <Typography variant="h3" component="h3" mb={4}>
          {heading}
        </Typography>
        <Typography style={headingStyle} fontSize="md" width={600} mb={8}>
          {subheading}
        </Typography>
        {children}
        <MemoizedCustomButton bgColor="#1976d2">
          Learn more
        </MemoizedCustomButton>
      </Box>
      <Box
        flex="1"
        textAlign={{ xs: 'center', md: 'right' }}
        mb={{ xs: 8, md: 0 }}
      >
        <Box
          component="img"
          width="100%"
          height="100%"
          src={image}
          alt={altText}
          borderRadius="md"
          boxShadow={3}
        />
      </Box>
    </Box>
  )
}

const MemoizedAboutUsSection = React.memo(AboutUsSection)
export default MemoizedAboutUsSection
