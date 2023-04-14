import React from 'react';
import Jumbotron from '../components/specific/Jumbotron';
import bgImage from '../assets/images/background-01.jpg';
import CardGrid from '../components/specific/CardGrid';
import IconColumns from '../components/common/IconColumns';




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
                title="Elevate Education, Simplify School Management!"
                subtitle="Streamlines processes, fosters collaboration, and enhances learning outcomes for a seamless educational experience"
                buttonText="learn more"
                bgImage={bgImage}
                buttonOnClick={handleButtonClick}
            />
            <CardGrid />
            <IconColumns />
        </div>
    )
};

export default Home;