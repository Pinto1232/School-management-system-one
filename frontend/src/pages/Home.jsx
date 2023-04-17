import React, { useState } from 'react';
import Jumbotron from '../components/specific/Jumbotron';
import bgImage from '../assets/images/background-01.jpg';
import CardGrid from '../components/specific/CardGrid';
import IconColumns from '../components/common/IconColumns';
import { Grid } from '@chakra-ui/react';
import iconsData from '../data/IconsData';



const Home = () => {

    const handleButtonClick = () => {

    }
  
    return (
        <Grid>
            <Jumbotron
                title="Elevate Education, Simplify School Management!"
                subtitle="Streamlines processes, fosters collaboration, and enhances learning outcomes for a seamless educational experience"
                buttonText="learn more"
                bgImage={bgImage}
                buttonOnClick={handleButtonClick}
            />
            <CardGrid />

            {/* Icon component */}
            <IconColumns
                iconsData={iconsData}
            />
        </Grid>
    )
};

export default Home;