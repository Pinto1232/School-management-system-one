import { Box } from '@chakra-ui/react'
import React from 'react'
import bgImage from '../assets/images/faqs.jpg';
import Jumbotron from '../components/specific/Jumbotron';


const Faq = () => {
    return (
        <Box>
            <Jumbotron
                title="Frequent asked questions"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />
        </Box>
    )
}

export default Faq
