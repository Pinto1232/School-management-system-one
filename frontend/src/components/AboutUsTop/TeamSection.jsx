import React from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MemoizedCustomButton from '../common/CustomButton'

const teamMembers = [
  {
    name: 'Blake Matthews',
    title: 'CEO & Co-Founder',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jack Newman',
    title: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Sarinia Martins',
    title: 'Marketing',
    image: 'https://via.placeholder.com/150',
  },
]

const TeamSection = () => {
  return (
    <Container sx={{ mb: 10 }}>
      <Box textAlign="center" mt={5} mb={5}>
        <Typography variant="h4" gutterBottom>
          Our Talented Team
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" mb={5}>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        {teamMembers.map((member, index) => (
          <Card key={index} sx={{ textAlign: 'center' }}>
            <CardMedia
              component="img"
              height="200"
              image={member.image}
              alt={member.name}
            />
            <CardContent>
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {member.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          backgroundImage: 'url(https://via.placeholder.com/800x200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '50px 20px',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Join a team of change-makers.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Join a team of Engineers & Researchers.
        </Typography>
        <MemoizedCustomButton>
        View Job Openings
        </MemoizedCustomButton>
      </Box>
    </Container>
  )
}

const MemoizedTeamSection = React.memo(TeamSection)
export default MemoizedTeamSection
