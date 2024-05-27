import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Modal,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import CustomButton from './CustomButton'

const ProductsSection = ({ heading, subheading, products }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [featureKeys, setFeatureKeys] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const keys = Object.keys(products[0]).filter(
        (key) => typeof products[0][key] === 'boolean'
      )
      setFeatureKeys(keys)
    }
  }, [products])

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const renderIcon = (condition) => {
    return condition ? (
      <CheckIcon sx={{ color: theme.palette.success.main }} />
    ) : (
      <CloseIcon sx={{ color: theme.palette.error.main }} />
    )
  }

  return (
    <Box py={10} px={2} mx="auto" maxWidth="1200px">
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" component="h2" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="h5" component="p" color="textSecondary">
          {subheading}
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: '8px', boxShadow: theme.shadows[1], overflow: 'hidden' }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  textAlign: 'center',
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
                    textAlign: 'center',
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
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {index + 1}. {feature}
                </TableCell>
                {products.map((product) => (
                  <TableCell key={product._id} sx={{ textAlign: 'center' }}>
                    {renderIcon(product.features.includes(feature))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {featureKeys.map((key) => (
              <TableRow key={key}>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                </TableCell>
                {products.map((product) => (
                  <TableCell key={product._id} sx={{ textAlign: 'center' }}>
                    {renderIcon(product[key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}></TableCell>
              {products.map((product) => (
                <TableCell key={product._id} align="center">
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Typography variant="h6" component="p" gutterBottom>
                      {product.name} (R{product.price})p/m
                    </Typography>
                    <Box mt={1}>
                      <CustomButton>Buy Now</CustomButton>
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
export default MemoizedProductsSection;