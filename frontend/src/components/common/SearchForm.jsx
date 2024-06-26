import React, { useState } from 'react'
import {
  Box,
  Input,
  Button,
  Flex,
  FormControl,
  Select,
  Collapse,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const SearchForm = ({ fields, onSearch, handleSearchCriteria, onSearchChange = () => {} }) => {
  const [formData, setFormData] = useState(() => {
    const initialState = {}
    fields.forEach((field) => {
      initialState[field.name] = ''
    })
    return initialState
  })

  const [showFields, setShowFields] = useState(false)

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (typeof onSearchChange === 'function') {
      onSearchChange({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = () => {
    handleSearchCriteria(formData);
    if (typeof onSearch === 'function') {
      onSearch(formData);
    }
    setShowFields(false);
  };

  const toggleFields = () => {
    setShowFields(!showFields) 
  }

  const shouldUseFlexLayout = fields.length > 1

  return (
    <Box p={2} boxShadow="2xl" borderRadius={8}>
      <Flex
        direction={['column', 'row']}
        alignItems="center"
        justifyContent="space-between"
      >
        <Collapse in={showFields} animateOpacity>
          <Flex
            direction={shouldUseFlexLayout ? 'row' : 'column'}
            wrap="wrap"
            gap={4}
          >
            {fields.map((field) => (
              <FormControl
                key={field.name}
                flex={shouldUseFlexLayout ? '1' : 'auto'}
                width={field.width || 'auto'}
              >
                {field.type === 'select' ? (
                  <Select
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    bg="gray.50"
                    borderRadius="md"
                    fontSize={15}
                    focusBorderColor="transparent"
                    cursor={'pointer'}
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
                    borderRadius="md"
                    focusBorderColor="transparent"
                    bgColor={'gray.100'}
                  />
                )}
              </FormControl>
            ))}
          </Flex>
        </Collapse>
        <Button
          colorScheme="teal"
          size="md"
          px={9}
          py={4}
          fontSize="sm"
          borderRadius={'md'}
          _hover={{ bg: 'teal.500' }}
          onClick={showFields ? handleSubmit : toggleFields}
          leftIcon={<SearchIcon fontWeight={'bold'} fontSize={18} />}
        >
          {showFields ? 'Search' : 'Show Search'}
        </Button>
      </Flex>
    </Box>
  )
}

export default SearchForm
