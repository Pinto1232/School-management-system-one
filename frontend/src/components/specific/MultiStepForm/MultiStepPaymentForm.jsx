import React, { useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Circle,
  Text,
  Stack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'
import { UserInfo, UserPlan, UserSummary, Confirmation } from './index'

import { FaCcVisa } from 'react-icons/fa'

const stepsComponents = [UserInfo, UserPlan, UserSummary, Confirmation]

const stepTitles = ['Your Info', 'Select Plan', 'Summary', 'Confirmation']

const MultiStepPaymentForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const CurrentStep = stepsComponents[currentStepIndex]
  const [isFormValid, setIsFormValid] = useState(false)

  const nextStep = () => {
    if (currentStepIndex < stepsComponents.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  // This is a new code added
  const handleUserInfoValidity = (isValid) => {
    setIsFormValid(isValid)
  }

  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const progressValue = ((currentStepIndex + 1) / stepsComponents.length) * 100

  return (
    <Container maxW="100%">
      <Box bg={bgColor} p={2} borderRadius="lg" boxShadow={'sm'}>
        <Flex
          justifyContent={{ base: 'center', sm: 'center' }}
          gap={{ base: 2, sm: 2, md: 5 }}
          m={{ base: 4, sm: 3 }}
          wrap="wrap"
        >
          {stepTitles.map((title, index) => (
            <Flex
              direction={{ base: 'column', sm: 'column-reverse' }}
              gap={2}
              align="center"
              key={title}
              mt={index === stepTitles.length - 1 ? '-28px' : '0'}
            >
              <Circle
                size={{ base: '24px', md: '24px' }}
                bg={currentStepIndex >= index ? '#319795' : 'gray.300'}
                fontSize={{ sm: '12px' }}
                textAlign={{ sm: 'center' }}
                color="white"
              >
                {index + 1}
              </Circle>
              <Text
                fontSize={{ base: 'xs', sm: 'sm' }}
                mt={{ base: 1, sm: 2 }}
                align={{ sm: 'center' }}
                whiteSpace={{ sm: 'nowrap' }}
              >
                {title}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Box
          mt={currentStepIndex === stepsComponents.length - 1 ? '20px' : '0'}
        >
          <CurrentStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        </Box>

        <Stack
          bg={'gray.800'}
          direction={{ base: 'column', sm: 'row' }}
          padding={8}
          justifyContent="space-between"
          mb={12}
          spacing={{ base: 4, md: 0 }}
        >
          {currentStepIndex > 0 && (
            <Button
              w={'130px'}
              fontSize={14}
              borderRadius={2}
              onClick={prevStep}
            >
              Back
            </Button>
          )}
          {currentStepIndex < stepsComponents.length - 1 ? (
            <Button
              bg="#319795"
              fontSize={14}
              color={'white'}
              /* onClick={nextStep} */
              onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
              disabled={!isFormValid}
              borderRadius={2}
              w={currentStepIndex === 0 ? '100%' : '130px'}
            >
              Next
            </Button>
          ) : (
            <Button
              leftIcon={<FaCcVisa fontSize={20} width={20} />}
              bg="transparent"
              _hover={{ bg: '#319795' }}
              borderRadius={2}
              w={'130px'}
              color={'white'}
              onClick={handleSubmit}
              fontSize={14}
            >
              Pay
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  )
}

export default MultiStepPaymentForm
