import React, { useState } from 'react'
import bgImage from '../assets/images/about-us.jpg';
import Jumbotron from '../components/specific/Jumbotron';
import { Box } from '@chakra-ui/react';
import ServicesSections from '../components/common/ServicesSections';
import services from '../data/ServicesSectionsData'

const About = () => {





    return (
        <Box>
            <Jumbotron
                title="About Us"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />

            <Box maxW="7xl" border={0} textAlign={'start'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ServicesSections
                    title="Our Services"
                    services={services}
                />
            </Box>
        </Box>
    )
}

export default About
