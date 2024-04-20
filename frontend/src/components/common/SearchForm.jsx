// SearchForm.jsx
import React, { useState } from 'react'
import { Box, Input, Button, Flex, FormControl, Select } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const SearchForm = ({ fields, onSearch }) => {
  const [formData, setFormData] = useState(() => {
    const initialState = {}
    if (Array.isArray(fields)) {
      fields.forEach((field) => {
        initialState[field.name] = ''
      })
    }
    return initialState
  })

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSearch(formData)
  }

  return (
    <Box p={2} boxShadow="2xl"  borderRadius={8}>
      <Flex
        direction={['column', 'row']}
        alignItems="center"
        justifyContent="space-between"
      >
        {Array.isArray(fields) &&
          fields.map((field) => (
            <FormControl key={field.name} mr={4}>
              {field.type === 'select' ? (
                <Select
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  bg="gray.50"
                  borderRadius="lg"
                  fontSize={15}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={field.type}
                  fontSize={15}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  bg="gray.50"
                  borderRadius="lg"
                />
              )}
            </FormControl>
          ))}
        <Button
          colorScheme="teal"
          size="md"
          px={9}
          py={4}
          fontSize="sm"
          _hover={{ bg: 'teal.500' }}
          onClick={handleSubmit}
          leftIcon={<SearchIcon fontWeight={'bold'} fontSize={18} />}
        >
          Search
        </Button>
      </Flex>
    </Box>
  )
}

export default SearchForm
