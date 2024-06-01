import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
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

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [planType, setPlanType] = useState('monthly')
  const [paymentMethod, setPaymentMethod] = useState('visa')
  const location = useLocation()
  const { packageName } = location.state || { packageName: 'Default Package' }

  const handlePlanTypeChange = (event, newPlanType) => {
    if (newPlanType !== null) {
      setPlanType(newPlanType)
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
      elevation={2}
      style={{
        padding: '20px',
        marginTop: '-50px',
        backgroundColor: 'rgb(247 245 245 / 53%)',
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
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Subscribe to {packageName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          To keep using this account after the trial ends, set up a subscription
        </Typography>
        <Box elevation={3} style={{ padding: '50px', backgroundColor: '#fff' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                elevation={1}
                style={{
                  padding: '20px',
                  backgroundColor: '#f5f5f5',
                  height: '260px',
                  borderRadius: '8px',
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
                    style={{
                      color: '#000',
                      whiteSpace: 'nowrap',
                      marginRight: 5,
                    }}
                  >
                    Select Plan
                  </Typography>
                  <ToggleButtonGroup
                    value={planType}
                    exclusive
                    onChange={handlePlanTypeChange}
                    style={{ marginLeft: 'auto' }}
                  >
                    <ToggleButton
                      value="monthly"
                      style={{ color: '#000', height: '13px', fontSize: '12px' }}
                    >
                      Monthly
                    </ToggleButton>
                    <ToggleButton
                      value="yearly"
                      style={{ color: '#000', height: '13px', fontSize: '12px'  }}
                    >
                      Yearly
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Typography style={{ color: '#000' }}>
                  {planType === 'monthly'
                    ? 'Plus - R5.75 User/Month'
                    : 'Plus - R57.00 User/Year'}
                </Typography>
                <Typography style={{ color: '#000' }}>
                  {planType === 'monthly'
                    ? 'Standard - R12.80 User/Month'
                    : 'Standard - R128.00 User/Year'}
                </Typography>
                <Typography style={{ color: '#000' }}>
                  {planType === 'monthly'
                    ? 'Advanced - R20.99 User/Month'
                    : 'Advanced - R209.90 User/Year'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                elevation={3}
                style={{ padding: '10px', backgroundColor: '#fff' }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    style={{ color: '#000', marginRight: '5px' }}
                  >
                    Payment
                  </Typography>
                  <ToggleButtonGroup
                    value={paymentMethod}
                    exclusive
                    onChange={handlePaymentMethodChange}
                    style={{ marginLeft: '2px', gap: '2px' }}
                  >
                    <ToggleButton
                      value="visa"
                      style={{ color: '#000', height: '30px' }}
                    >
                      <FaCcVisa size={20} />
                    </ToggleButton>
                    <ToggleButton
                      value="mastercard"
                      style={{ color: '#000', height: '30px' }}
                    >
                      <FaCcMastercard size={20} />
                    </ToggleButton>
                    <ToggleButton
                      value="paypal"
                      style={{ color: '#000', height: '30px' }}
                    >
                      <FaPaypal size={20} />
                    </ToggleButton>
                    <ToggleButton
                      value="stripe"
                      style={{ color: '#000', height: '30px' }}
                    >
                      <FaStripe size={20} />
                    </ToggleButton>
                    <ToggleButton
                      value="payu"
                      style={{ color: '#000', height: '30px' }}
                    >
                      <FaCcDiscover size={20} />
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
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#000' } }}
                />
                <TextField
                  label="Expiration Date"
                  type="text"
                  fullWidth
                  margin="normal"
                  required
                  variant="standard"
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#000' } }}
                />
                <TextField
                  label="CVV"
                  type="text"
                  fullWidth
                  margin="normal"
                  required
                  variant="standard"
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{ style: { color: '#000' } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} marginTop={-10}>
              <Box
                elevation={3}
                style={{ padding: '20px', backgroundColor: '#fff' }}
              >
                <Typography variant="h6" gutterBottom>
                  Total
                </Typography>
                <Divider style={{ backgroundColor: '#fff' }} />
                <Typography variant="body1" gutterBottom>
                  3 Users
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {planType === 'monthly' ? 'R48.65' : 'R486.50'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Discount (-20%):{' '}
                  {planType === 'monthly' ? '-R8.24' : '-R97.30'}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {planType === 'monthly' ? 'R40.42' : 'R389.20'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Due on 26 April 2022 then every{' '}
                  {planType === 'monthly' ? 'month' : 'year'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={-5} width="100%">
            <form
              onSubmit={handleSubmit}
              style={{
                width: '100%',
                backgroundColor: '#fff',
                padding: '10px',
              }}
            >
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                required
                variant="standard"
                InputLabelProps={{ style: { color: '#000' } }}
                InputProps={{ style: { color: '#000' } }}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                required
                variant="standard"
                InputLabelProps={{ style: { color: '#000' } }}
                InputProps={{ style: { color: '#000' } }}
              />
              <Box mt={2}>
                <MemoizedCustomButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  bgColor='primary'
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
