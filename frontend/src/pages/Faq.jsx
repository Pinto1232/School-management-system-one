import { Text } from '@chakra-ui/react'
import React from 'react'
import bgImage from '../assets/images/faqs.jpg';
import Jumbotron from '../components/specific/Jumbotron';


const Faq = () => {
    return (
        <div>
            <Jumbotron
                title="Frequent asked questions"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />
        </div>
    )
}

export default Faq
