import React, { useState } from 'react'
import bgImage from '../assets/images/about-us.jpg';
import Jumbotron from '../components/specific/Jumbotron';
import { Box } from '@chakra-ui/react';

const About = () => {

   



    return (
        <Box>
            <Jumbotron
                title="About Us"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
        />
        </Box>
    )
}

export default About
