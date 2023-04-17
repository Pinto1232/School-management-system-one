import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

/* Step bar */
const StepBar = ({ steps, currentStep }) => {

    return (
        <Flex justify="space-around" gap={10} mb={8}>
            {steps.map((step, index) => (
                <Box key={step.label} textAlign="center">
                    <Box fontWeight="bold" bg="black" color="#fff" width={6} borderRadius={20}>
                        {step.label}
                    </Box>
                    {currentStep === index && (
                        <Box mt={2}>
                            <Box w={4} h={4} bg="green.500" mx="auto" borderRadius="50%" />
                            {index > 0 && (
                                <Box position="absolute" top="10px" left="-5px" bottom="10px" borderLeft="2px solid #fff" />
                            )}
                        </Box>
                    )}
                </Box>
            ))}
        </Flex>
    )
}
export default StepBar
