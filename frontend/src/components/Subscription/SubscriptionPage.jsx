import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Paper,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaStripe,
  FaCcDiscover,
} from 'react-icons/fa'
import MemoizedCustomButton from '../common/CustomButton'
import { Check } from '@mui/icons-material'

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false)
  const [error] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState('monthly')
  const [paymentMethod, setPaymentMethod] = useState('visa')
  const location = useLocation()
  const { firstName, lastName, email } = location.state || {
    firstName: '',
    lastName: '',
    email: '',
  }
  const [selectedPackageData, setSelectedPackageData] = useState(null)

  useEffect(() => {
    const packageData = JSON.parse(localStorage.getItem('selectedPackage'))
    setSelectedPackageData(packageData)
    console.log('Received data:', {
      package: packageData,
      firstName,
      lastName,
      email,
    })
  }, [firstName, lastName, email])

  const handlePackageChange = (event, newPackage) => {
    if (newPackage !== null) {
      setSelectedPackage(newPackage)
    }
  }

  const handlePaymentMethodChange = (event, newPaymentMethod) => {
    if (newPaymentMethod !== null) {
      setPaymentMethod(newPaymentMethod)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    // Add your payment processing logic here
    setTimeout(() => {
      setLoading(false)
      // Handle success or error
    }, 2000)
  }

  return (
    <Box
      style={{
        backgroundColor: 'lightgray',
        padding: { xs: '20px', md: '40px' },
        borderRadius: '8px',
      }}
    >
      <Box
        py={10}
        px={2}
        mx="auto"
        maxWidth="800px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        color="#000"
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: 3,
          padding: { xs: '20px', md: '40px' },
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Subscribe to {selectedPackageData?.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          To keep using this account after the trial ends, set up a subscription
        </Typography>
        <Box style={{ backgroundColor: '#fff', padding: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  padding: '20px',
                  backgroundColor: 'rgb(245 245 245 / 41%)',
                  borderRadius: '8px',
                  boxShadow: 1,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '0px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'transparent',
                  },
                  scrollbarWidth: 'none',
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#000',
                      whiteSpace: 'nowrap',
                      marginRight: 5,
                    }}
                  >
                    Select Plan
                  </Typography>
                  <ToggleButtonGroup
                    value={selectedPackage}
                    exclusive
                    onChange={handlePackageChange}
                    sx={{ marginLeft: 'auto' }}
                  >
                    <ToggleButton
                      value="monthly"
                      sx={{
                        color: selectedPackage === 'monthly' ? '#fff' : '#000',
                        height: '30px',
                        fontSize: '12px',
                        backgroundColor:
                          selectedPackage === 'monthly'
                            ? '#0071c2'
                            : 'transparent',
                      }}
                    >
                      Monthly
                    </ToggleButton>
                    <ToggleButton
                      value="yearly"
                      sx={{
                        color: selectedPackage === 'yearly' ? '#fff' : '#000',
                        height: '30px',
                        fontSize: '12px',
                        backgroundColor:
                          selectedPackage === 'yearly' ? 'blue' : 'transparent',
                      }}
                    >
                      Yearly
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ color: '#000', marginBottom: '10px' }}
                >
                  {selectedPackageData?.name} R{selectedPackageData?.price}p/m
                </Typography>
                {selectedPackageData?.features && (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ color: '#000', marginTop: '20px' }}
                    >
                      Included Features:
                    </Typography>
                    <List sx={{ color: '#000' }}>
                      {Object.entries(selectedPackageData)
                        .filter(
                          ([key, value]) =>
                            value === true &&
                            key !== 'features' &&
                            key !== 'name' &&
                            key !== 'price' &&
                            key !== '_id' &&
                            key !== '__v'
                        )
                        .map(([key, value], index) => (
                          <ListItem key={index} sx={{ padding: 0 }}>
                            <ListItemIcon sx={{ minWidth: '20px' }}>
                              <Check
                                sx={{
                                  fontSize: '16px',
                                  color: 'darkgreen',
                                  backgroundColor: 'white',
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primaryTypographyProps={{
                                sx: {
                                  whiteSpace: 'nowrap',
                                  fontSize: '13px',
                                  color: '#000',
                                },
                              }}
                              primary={key
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())}
                            />
                          </ListItem>
                        ))}
                    </List>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  padding: { xs: '10px', md: '20px' },
                  boxShadow: 1,
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                  mb={2}
                  sx={{ gap: '4px', flexWrap: 'wrap' }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: '#000', marginRight: '5px' }}
                  >
                    Payment
                  </Typography>
                  <ToggleButtonGroup
                    value={paymentMethod}
                    exclusive
                    onChange={handlePaymentMethodChange}
                    sx={{ marginLeft: '2px', border: 'none' }}
                  >
                    <ToggleButton value="visa" sx={{ height: '30px' }}>
                      <FaCcVisa size={24} color="#1A1F71" />
                    </ToggleButton>
                    <ToggleButton value="mastercard" sx={{ height: '30px' }}>
                      <FaCcMastercard size={24} color="#EB001B" />
                    </ToggleButton>
                    <ToggleButton value="paypal" sx={{ height: '30px' }}>
                      <FaPaypal size={24} color="#1976d2" />
                    </ToggleButton>
                    <ToggleButton value="stripe" sx={{ height: '30px' }}>
                      <FaStripe size={24} color="#635BFF" />
                    </ToggleButton>
                    <ToggleButton value="payu" sx={{ height: '30px' }}>
                      <FaCcDiscover size={24} color="#FF6000" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <TextField
                  label="Credit Card Number"
                  type="text"
                  fullWidth
                  margin="normal"
                  required
                  variant="standard"
                  InputLabelProps={{
                    sx: { color: '#a2a2a2', fontSize: 13 },
                  }}
                  InputProps={{ sx: { color: '#000' } }}
                />
                <TextField
                  label="Expiration Date"
                  type="text"
                  fullWidth
                  margin="normal"
                  required
                  variant="standard"
                  InputLabelProps={{
                    sx: { color: '#a2a2a2', fontSize: 13 },
                  }}
                  InputProps={{ sx: { color: '#000' } }}
                />
                <TextField
                  label="CVV"
                  type="text"
                  fullWidth
                  margin="normal"
                  required
                  variant="standard"
                  InputLabelProps={{
                    sx: { color: '#a2a2a2', fontSize: 13 },
                  }}
                  InputProps={{ sx: { color: '#000' } }}
                />
                <Box width="100%">
                  <form
                    onSubmit={handleSubmit}
                    sx={{
                      width: '100%',
                      backgroundColor: '#fff',
                      padding: '10px',
                      borderRadius: '8px',
                      boxShadow: 3,
                    }}
                  >
                    <TextField
                      label="User name"
                      value={`${firstName} ${lastName}`}
                      fullWidth
                      margin="normal"
                      required
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: '#a2a2a2',

                          fontSize: 13,
                        },
                      }}
                      InputProps={{ sx: { color: '#000' } }}
                      disabled
                    />
                    <TextField
                      label="User email"
                      value={email}
                      type="email"
                      fullWidth
                      margin="normal"
                      required
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: '#a2a2a2',

                          fontSize: 13,
                        },
                      }}
                      InputProps={{ sx: { color: '#000' } }}
                      disabled
                    />
                  </form>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} marginTop={-1}>
              <Box
                elevation={0}
                sx={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: 1,
                  mb: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Total
                </Typography>
                <Divider style={{ backgroundColor: '#fff' }} />
                <Typography variant="body1" gutterBottom>
                  Subtotal: R{selectedPackageData?.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Discount (-5%): R
                  {(selectedPackageData?.price * 0.05).toFixed(2)}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  Total: R{(selectedPackageData?.price * 0.95).toFixed(2)}p/m
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Due on 26 April 2022 then every month
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={-3} width="100%">
            <form
              onSubmit={handleSubmit}
              style={{
                width: '100%',
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: 3,
              }}
            >
              <Box mt={2}>
                <MemoizedCustomButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  bgColor="#0071c2"
                  fullWidth
                  disabled={loading}
                  sx={{ width: '30%' }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Subscribe'
                  )}
                </MemoizedCustomButton>
              </Box>
              {error && <Typography color="error">{error}</Typography>}
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SubscriptionPage
