import { Text } from '@chakra-ui/react'
import React from 'react'
import bgImage from '../assets/images/about-us.jpg';
import Jumbotron from '../components/specific/Jumbotron';

const About = () => {

    return (
        <div>
            <Jumbotron
                title="About Us"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />
        </div>
    )
}

export default About
