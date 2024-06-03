import React, { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import MemoizedCustomButton from '../common/CustomButton'
import { useGetContentQuery } from '../../slicers/About/AboutContentSlicer'


const Timeline = () => {
  const { data, isLoading, isError } = useGetContentQuery()
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (data) {
      // Find the object with the section "About Us"
      const aboutUsSection = data.find(item => item.section === "About Us")
      if (aboutUsSection && aboutUsSection.images?.[0]?.path) {
        const imagePath = aboutUsSection.images[0].path
        const formattedPath = imagePath.replace(/^.*[\\/]/, '')
        const fullImagePath = `http://localhost:3001/uploads/${formattedPath}`
        setImageUrl(fullImagePath)

        // Test the URL by creating a new Image object
        const img = new Image()
        img.src = fullImagePath
        img.onload = () => console.log('Image loaded successfully')
        img.onerror = () => console.log('Error loading image')
      }
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading content</div>

  const buttonsTitle = data[1]?.buttonsTitle || 'default buttonsTitle'

  return (
    <Container
      className="background-image"
      sx={{
        background: '#f6f6f6',
        maxWidth: '100%',
        disableGutters: true,
        marginBottom: '100px',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        mt: 2,
        mb: 30,
        position: 'relative', 
      }}
      maxWidth={false}
      disableGutters
    >
      {/* Overlay Box */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
          zIndex: 0,
        }}
      />
      <Box px={20} py={4} mt={5} color={'white'} sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" gutterBottom>
          Our Journey
        </Typography>
        <Typography variant="body1" gutterBottom>
          Discover the milestones that have shaped our path.
        </Typography>
        <Box display="flex" mt={2}>
          <MemoizedCustomButton variant="contained" color="primary">
            {buttonsTitle}
          </MemoizedCustomButton>
        </Box>
      </Box>
      <Container>
        <Box position="relative" mt={10} mb={10} width="100%">
          <svg
            width="100%"
            height="200"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          >
            <path
              d="M0,100 C250,0 750,200 1000,100"
              stroke="#1976d2"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={5}
            position="relative"
            sx={{ zIndex: 999 }}
            width="100%"
          >
            <Box textAlign="center" position="absolute" left="10%" top="50px">
              <Box
                width={50}
                height={50}
                borderRadius="50%"
                bgcolor="primary.main"
                color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                boxShadow={3}
                mb={2}
                sx={{ zIndex: 999 }}
              >
                <Typography variant="h6" sx={{ zIndex: 999 }}>
                  1
                </Typography>
              </Box>
              <Typography variant="h6" mt={2} sx={{ zIndex: 999 }}>
                2021 Founded
              </Typography>
              <Typography variant="body2" width={250} sx={{ zIndex: 999 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </Box>
            <Box textAlign="center" position="absolute" left="50%" top="0px">
              <Box
                width={50}
                height={50}
                borderRadius="50%"
                bgcolor="primary.main"
                color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                boxShadow={3}
                mb={2}
                sx={{ zIndex: 999 }}
              >
                <Typography variant="h6" sx={{ zIndex: 999 }}>
                  2
                </Typography>
              </Box>
              <Typography variant="h6" mt={2} sx={{ zIndex: 999 }}>
                220+ Companies
              </Typography>
              <Typography variant="body2" width={250} sx={{ zIndex: 999 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </Box>
            <Box textAlign="center" position="absolute" left="90%" top="50px">
              <Box
                width={50}
                height={50}
                borderRadius="50%"
                bgcolor="primary.main"
                color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                boxShadow={3}
                mb={2}
                sx={{ zIndex: 999 }}
              >
                <Typography variant="h6" sx={{ zIndex: 999 }}>
                  3
                </Typography>
              </Box>
              <Typography variant="h6" mt={2} sx={{ zIndex: 999 }}>
                150k+ Professionals
              </Typography>
              <Typography variant="body2" width={250} sx={{ zIndex: 999 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  )
}

const MemoizedTimeline = React.memo(Timeline)
export default MemoizedTimeline