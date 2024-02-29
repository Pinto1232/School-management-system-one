import React, { useState } from 'react'
import {
  Box,
  Flex,
  Progress,
  Button,
  Circle,
  Text,
  Stack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'

import PersonalInfo from './PersonalInfo'
import PropertyDetails from './PropertyDetails'
import PricingOptions from './PricingOptions'

const stepsComponents = [PersonalInfo, PropertyDetails, PricingOptions]

const stepTitles = ['Personal Info', 'Package Details', 'Pricing Options']

const MultiStepForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const CurrentStep = stepsComponents[currentStepIndex]

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

  const bgColor = useColorModeValue('gray.200', 'gray.700')
  const progressValue = ((currentStepIndex + 1) / stepsComponents.length) * 100

  return (
    <Container maxW="100%">
      <Box bg={bgColor} p={8} borderRadius="lg">
        {/* Step Indicator */}
        <Flex justifyContent="space-start" gap={8} m={8}>
          {stepTitles.map((title, index) => (
            <Flex direction="row" gap={4} align="center" key={title}>
              <Circle
                size="30px"
                bg={currentStepIndex >= index ? '#319795' : 'gray.300'}
                color="white"
              >
                {index + 1}
              </Circle>
              <Text fontSize="sm" mt={2}>
                {title}
              </Text>
            </Flex>
          ))}
        </Flex>

        <CurrentStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />

        {/* Navigation Buttons */}
        <Stack
          bg={'#171923'}
          direction="row"
          mt={5}
          padding={8}
          justifyContent="space-between"
          mb={12}
        >
          {currentStepIndex > 0 && (
            <Button w={'130px'} fontSize={14} onClick={prevStep}>
              Back
            </Button>
          )}
          {currentStepIndex < stepsComponents.length - 1 ? (
            <Button
              bg="#319795"
              fontSize={14}
              color={'white'}
              w={'130px'}
              onClick={nextStep}
            >
              Next
            </Button>
          ) : (
            <Button
              bg="#319795"
              w={'130px'}
              color={'white'}
              onClick={handleSubmit}
              fontSize={14}
            >
              Submit
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  )
}

export default MultiStepForm
