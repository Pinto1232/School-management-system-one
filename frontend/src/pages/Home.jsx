import React from 'react';
import Jumbotron from '../components/specific/Jumbotron';
import bgImage from '../assets/images/background-01.jpg';




const Home = () => {
    const handleButtonClick = () => {
        console.log('Button clicked');
    };


    return (
        <div>
            <Jumbotron
                title="Welcome to the Jumbotron"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
                buttonOnClick={handleButtonClick}
            />
        </div>
    )
};

export default Home;