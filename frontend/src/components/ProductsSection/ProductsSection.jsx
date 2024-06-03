import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import MemoizedCustomButton from '../common/CustomButton'
import SafetyCheck from '@mui/icons-material/SafetyCheck'
import { useNavigate } from 'react-router-dom'

const ProductsSection = ({ heading, subheading, products }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [featureKeys, setFeatureKeys] = useState([])
  const [loading, setLoading] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (products.length > 0) {
      const keys = Object.keys(products[0]).filter(
        (key) => typeof products[0][key] === 'boolean'
      )
      setFeatureKeys(keys)
    }
  }, [products])

  const renderIcon = (condition) => {
    return condition ? (
      <CheckIcon sx={{ color: theme.palette.success.main }} />
    ) : (
      <CloseIcon sx={{ color: theme.palette.error.main }} />
    )
  }

  const handleBuyNowClick = (product) => {
    console.log('Selected package:', product)
    localStorage.setItem('selectedPackage', JSON.stringify(product))

    const token = localStorage.getItem('token')

    if (!token) {
      // If not authenticated, redirect to login/registration page
      navigate('/register', { state: { packageName: product.name } })
    } else {
      // If authenticated, proceed with the subscription process
      setLoading(product.name)
      setTimeout(() => {
        setLoading(null)
        navigate('/subscribe', { state: { packageName: product.name } })
      }, 6000) // Display the loader for 2 seconds
    }
  }

  return (
    <Box
      py={10}
      px={2}
      mx="auto"
      maxWidth="1200px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="h5" component="p" color="textSecondary">
          {subheading}
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '8px',
          boxShadow: theme.shadows[1],
          overflowY: 'auto',
          width: '100%',
          maxHeight: '500px', // Set the desired height here
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  textAlign: 'start',
                }}
              >
                Feature
              </TableCell>
              {products.map((product) => (
                <TableCell
                  key={product._id}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    textAlign: 'start',
                  }}
                >
                  {product.name} (R{product.price})
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products[0].features.map((feature, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'start',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {index + 1}. {feature}
                </TableCell>
                {products.map((product) => (
                  <TableCell
                    key={product._id}
                    sx={{ textAlign: 'start', whiteSpace: 'nowrap' }}
                  >
                    {renderIcon(product.features.includes(feature))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {featureKeys.map((key) => (
              <TableRow key={key}>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'start',
                    whiteSpace: 'nowrap',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <SafetyCheck sx={{ mr: 1, color: 'lightgrey' }} />{' '}
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Box>
                </TableCell>
                {products.map((product) => (
                  <TableCell key={product._id} sx={{ textAlign: 'start' }}>
                    {renderIcon(product[key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', textAlign: 'center', background: 'lightgrey'  }}
              ></TableCell>
              {products.map((product) => (
                <TableCell key={product._id} align="center" sx={{ background: 'lightgrey' }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h6" component="p" gutterBottom>
                      (R{product.price})p/m
                    </Typography>
                    <Box mt={1}>
                      <MemoizedCustomButton
                        bgColor="#1976d2"
                        boxShadow={2}
                        fontSize={12}
                        onClick={() => handleBuyNowClick(product)}
                        disabled={loading === product.name}
                      >
                        {loading === product.name ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Buy Now'
                        )}
                      </MemoizedCustomButton>
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

const MemoizedProductsSection = React.memo(ProductsSection)
export default MemoizedProductsSection
