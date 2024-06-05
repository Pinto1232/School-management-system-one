import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import MemoizedCustomButton from '../common/CustomButton'

const Jumbotron = ({
  title,
  subtitle,
  minHeight = '70vh',
  titleSize = '2xl',
  subtitleSize = 'xl',
  bgGradient = 'linear-gradient(to right, rgba(0, 50, 200, 0.8), rgba(0, 0, 100, 0.9))',
  textColor = 'white',
  bgImage,
  buttonOnClick,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayedTitle((prev) => {
        if (prev.length < title.length) {
          return title.slice(0, prev.length + 1)
        } else {
          return ''
        }
      })
      setIndex((prev) => (prev + 1) % (title.length + 1))
    }, 200) // Adjust the speed of the typewriter effect here

    return () => clearInterval(intervalId)
  }, [title])

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: minHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: textColor,
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${bgImage}), ${bgGradient}`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '400%',
          backgroundColor: 'rgba(0, 0, 139, 0.5)', // Darker blue with 50% opacity
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          width: '100%',
          height: '20px',
          backgroundColor: theme.palette.background.default,
          borderTopLeftRadius: '100% 80px',
          borderTopRightRadius: '100% 40px',
          transform: 'scaleX(4.5)',
          zIndex: 1,
        },
      }}
    >
      <Typography
        variant={isMobile ? 'h4' : 'h2'}
        component="h1"
        sx={{
          marginBottom: theme.spacing(2),
          whiteSpace: 'normal',
          textAlign: 'center',
          zIndex: 2,
          maxWidth: 999,
          lineHeight: 1,
        }}
      >
        {displayedTitle}
      </Typography>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        component="p"
        sx={{
          marginBottom: theme.spacing(3),
          textAlign: 'center',
          maxWidth: { xs: '90%', sm: '700px' },
          zIndex: 2,
        }}
      >
        {subtitle}
      </Typography>
      <MemoizedCustomButton
        bgColor="#1976d2"
        onClick={buttonOnClick}
        variant="contained"s
        sx={{
          zIndex: 2,
          width: 200,
          borderRadius: '50px',
        }}
      >
        Learn More
      </MemoizedCustomButton>
    </Box>
  )
}

const MemoizedJumbotron = React.memo(Jumbotron)
export default MemoizedJumbotron
