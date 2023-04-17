import React from 'react'
import bgImage from '../assets/images/about-us.jpg';
import Jumbotron from '../components/specific/Jumbotron';
import steps from '../utils/MultiStepFormData';
import MultistepForm from '../components/specific/MultiStepForm/MultiStepForm'; 
import { Box } from '@chakra-ui/react';
import FormMultiStep from '../components/specific/MultiStepForm/FormMultiStep';

const About = () => {

    return (
        <div>
            <Jumbotron
                title="About Us"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                {/* <MultistepForm steps={steps} /> */}
                <FormMultiStep />
            </Box> 

        </div>
    )
}

export default About
