import React from 'react';
import Jumbotron from '../components/specific/Jumbotron';
import bgImage from '../assets/images/background-01.jpg';
import CardGrid from '../components/specific/CardGrid';
import Footer from '../components/common/Footer';



const Home = () => {
    const handleButtonClick = () => {
        console.log('Button clicked');
    };

    const handleSubscribe = () => {
        // handle subscription logic here
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
            <CardGrid />
            <Footer />
        </div>
    )
};

export default Home;