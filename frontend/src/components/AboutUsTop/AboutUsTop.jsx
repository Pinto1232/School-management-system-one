import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, CircularProgress } from '@mui/material'
import MemoizedTimeline from './Timeline'
import MemoizedTeamSection from './TeamSection'
import { useGetContentQuery } from '../../slicers/About/AboutContentSlicer'

const chunkArray = (array, size) => {
  const chunkedArr = []
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size))
  }
  return chunkedArr
}

const AboutUsTop = () => {
  const { data, isLoading, isError } = useGetContentQuery()
  const [imageUrl, setImageUrl] = useState('')
  console.log('data', data)

  useEffect(() => {
    if (data && data[0]?.images?.[1]?.path) {
      const imagePath = data[0].images[1].path
      const formattedPath = imagePath.replace(/^.*[\\/]/, '')
      const fullImagePath = `http://localhost:3001/uploads/${formattedPath}`
      setImageUrl(fullImagePath)

      // Test the URL by creating a new Image object
      const img = new Image()
      img.src = fullImagePath
      img.onload = () => console.log('Image loaded successfully')
      img.onerror = () => console.log('Error loading image')
    }
  }, [data])

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (isError) return <div>Error loading content</div>

  const icons = data[1]?.icons || []
  const title = data[1]?.title || 'default Title'
  const description = data[1]?.description || 'default description'
  const section = data[1]?.section || 'default section'

  console.log('Background Image URL:', imageUrl)

  // Chunk the icons array into smaller arrays of 5 items each
  const chunkedIcons = chunkArray(icons, 5)

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        textAlign="center"
        className="about-us-top"
        sx={{
          width: '100%',
          height: '120px',
          margin: '0',
          position: 'relative',
          padding: '15px 5px',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Box
          className="background-image"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
          }}
        />
        {/* Content Box */}
        <Typography variant="h4" gutterBottom>
          {section}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Home • {section}
        </Typography>
      </Box>
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            width: '80%',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {description}
        </Typography>
      </Box>
      <MemoizedTimeline />
      <MemoizedTeamSection />
    </Container>
  )
}

const MemoizedAboutUsTop = React.memo(AboutUsTop)
export default MemoizedAboutUsTop