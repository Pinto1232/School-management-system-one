import React from 'react'
import bgImage from '../assets/images/about-us.jpg';
import Jumbotron from '../components/specific/Jumbotron';
import { Box } from '@chakra-ui/react';
import FormMultiStep from '../components/specific/MultiStepForm/FormMultiStep';
import FormToogle from '../components/specific/FormToogle';
import MultiToggleForm from '../components/specific/MultiToggleForm';
import ReusableForm from '../components/specific/FormPanel/ReusableForm';

const About = () => {

    return (
        <Box>
            <Jumbotron
                title="About Us"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FormMultiStep />
            </Box>
            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FormToogle />
            </Box>
            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <MultiToggleForm/>
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ReusableForm />
            </Box>

        </Box>
    )
}

export default About
