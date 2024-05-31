import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Link,
  Grid,
  TextField,
  IconButton,
  Container,
} from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import footerLinks from '../../data/linksFooterData';
import MemoizedCustomButton from '../common/CustomButton';

const Footer = ({
  newsletterPlaceholder,
  bgFooter = '#000',
}) => {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 10 },
        background: `linear-gradient(135deg, ${bgFooter} 30%, #333 90%)`,
        color: 'white',
        minHeight: '200px',
        mb: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} mb={4}>
          {footerLinks.map(({ title, subLinks }, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="start" p={{ xs: 2, sm: 3, md: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={2} color="white">
                  {title}
                </Typography>
                {subLinks.map(({ label, href }, subIndex) => (
                  <Link
                    key={subIndex}
                    href={href}
                    variant="body2"
                    display="block"
                    mb={1}
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem', md: '0.875rem' },
                      color: 'gray.400',
                      '&:hover': {
                        color: 'white',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <form>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  p: 2,
                  boxShadow: 1,
                }}
              >
                <TextField
                  type="email"
                  placeholder={newsletterPlaceholder}
                  size="small"
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    mr: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                />
                <MemoizedCustomButton
                  variant="contained"
                  color="primary"
                  size="medium"
                  bgColor='#1976d2'
                >
                  Sign Up
                </MemoizedCustomButton>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent={{ xs: 'center', md: 'flex-end' }}
            >
              <Stack direction="row" spacing={2}>
                <IconButton href="#" sx={{ color: 'white', '&:hover': { color: '#3b5998' } }}>
                  <FaFacebook />
                </IconButton>
                <IconButton href="#" sx={{ color: 'white', '&:hover': { color: '#00acee' } }}>
                  <FaTwitter />
                </IconButton>
                <IconButton href="#" sx={{ color: 'white', '&:hover': { color: '#C13584' } }}>
                  <FaInstagram />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Typography
          textAlign={{ xs: 'center', md: 'left' }}
          mt={4}
          fontSize="0.875rem"
          color="gray.500"
        >
          Copyright © {new Date().getFullYear()} Educate Management
        </Typography>
      </Container>
    </Box>
  );
};

const MemoizedFooter = React.memo(Footer);
export default MemoizedFooter;