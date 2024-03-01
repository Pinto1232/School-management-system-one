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
  useBreakpointValue,
} from '@chakra-ui/react'

import PersonalInfo from './UserInfo'
import PropertyDetails from './UserSummary'
import PricingOptions from './UserPlan'

const stepsComponents = [PersonalInfo, PropertyDetails, PricingOptions]

const stepTitles = ['Your Info', 'Select Plan', 'Summary']

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

  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const progressValue = ((currentStepIndex + 1) / stepsComponents.length) * 100

  return (
    <Container maxW="100%">
      <Box bg={bgColor} p={6} borderRadius="lg" boxShadow={'sm'}>
        <Flex
          justifyContent={{ base: 'center', sm: 'space-between' }}
          gap={{ base: 2, sm: 4, md: 8 }}
          m={{ base: 4, sm: 8 }}
        >
          {stepTitles.map((title, index) => (
            <Flex
              direction={{ base: 'column', sm: 'column-reverse' }}
              gap={2}
              align="center"
              key={title}
            >
              <Circle
                size={{ base: '24px', md: '34px' }}
                bg={currentStepIndex >= index ? '#319795' : 'gray.300'}
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

        <CurrentStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />

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
              onClick={nextStep}
              w={currentStepIndex === 0 ? '100%' : '130px'}
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
              Pay
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  )
}

export default MultiStepForm
