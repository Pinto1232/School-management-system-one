import React from 'react'
import { Box } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

const chunkArray = (array, size) => {
  if (!array) return []
  const chunkedArr = []
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size))
  }
  return chunkedArr
}

const CustomCarousel = ({ icons = [] }) => {
  // Chunk the icons array into smaller arrays of 5 items each
  const chunkedIcons = chunkArray(icons, 5)

  return (
    <Carousel autoPlay interval={3000} sx={{ marginTop: 7 }}>
      {chunkedIcons.map((chunk, index) => (
        <Box key={index} display="flex" justifyContent="center">
          {chunk.map((icon, i) => (
            <img
              key={i}
              src={`http://localhost:3001/uploads/${icon}`}
              alt={`Icon ${i + 1}`}
              style={{
                margin: '0 10px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}
        </Box>
      ))}
    </Carousel>
  )
}

export default CustomCarousel