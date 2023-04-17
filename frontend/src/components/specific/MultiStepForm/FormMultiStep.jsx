//“FormMultiStep.jsx
import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Input, useColorModeValue } from '@chakra-ui/react';
import StepBar from './StepBar'
import steps from '../../../data/StepData'


const FormMultiStep = ({ values, isSubmitting, setFieldValue }) => {


    const [currentStep, setCurrentStep] = useState(0);
    const currentStepObject = steps[currentStep];
    const [totalSteps, setTotalSteps] = useState(3);

    const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#EDF2F7');
    const textFieldColor = useColorModeValue('#4A5568', '#fff');
    const buttonColor = useColorModeValue('#319795', '#3182ce');
    const textButton = useColorModeValue('#fff', '#fff')
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');


    const handleSubmit = (values, { setSubmitting }) => {
        console.log("handleSubmit function called");
        setSubmitting(false);
        if (currentStep === steps.length - 1) {
            // Perform final submission action here
            alert('Form submitted successfully!');
            console.log(currentStep);
        } else {
            setCurrentStep(currentStep + 1);
            console.log(currentStep);
        }
    };

    return (
        <Box bg={backgroundColor} borderWidth={1} borderRadius={8} p={8}>
            <StepBar steps={steps} currentStep={currentStep} />
            <Formik
                initialValues={steps[currentStep]?.initialValues}
                validationSchema={steps[currentStep]?.validationSchema}
                onSubmit={(values, actions) => {
                    console.log('Formik onSubmit function called');
                    handleSubmit(values, actions);
                }}
            >

                {({ values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <Box bg={backgroundColor} borderRadius={4} gap={10} w='full' color={textFieldColor} mb={10}>
                            {steps[currentStep].fields.map((field) => (
                                <Box key={field.name} mb={4}>
                                    <label htmlFor={field.name} >{field.label}</label>
                                    <Input
                                        type={field.type}
                                        name={field.name}
                                        value={values[field.name]}
                                        bg={textFieldBackgroundColor}
                                        color={textFieldColor}
                                        maxW='full'
                                        onChange={(e) => setFieldValue(field.name, e.target.value)}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Flex justify="space-between">
                            {currentStep > 0 && (
                                <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
                            )}
                            <Button
                                onClick={() => {
                                    if (currentStep < steps.length - 1) {
                                        setCurrentStep(currentStep + 1);
                                    }
                                }}
                                disabled={currentStep === steps.length - 1}
                            >
                                Next
                            </Button>

                        </Flex>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default FormMultiStep;
