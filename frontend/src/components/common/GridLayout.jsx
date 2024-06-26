import { Box, Grid } from '@chakra-ui/react'


const  GridLayout = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <Box w="100%" h="10" bg="blue.500">
      </Box>
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
      <Box w="100%" h="10" bg="blue.500" />
    </Grid>
  )
}

export default GridLayout
