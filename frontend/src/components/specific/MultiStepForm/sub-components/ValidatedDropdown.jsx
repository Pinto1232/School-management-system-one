import React from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Icon,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const ValidatedDropdown = ({ label, value, onChange, isValid }) => {
  return (
    <FormControl mt={6}>
      <InputGroup
        bg={'gray.200'}
        p={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Input value={value} onChange={onChange} isReadOnly={!onChange} />
        {isValid && (
          <InputRightElement children={<CheckIcon color="green.500" />} />
        )}
      </InputGroup>
    </FormControl>
  )
}

export default ValidatedDropdown
