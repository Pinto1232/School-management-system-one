import React, { useState } from 'react';
import Jumbotron from '../components/specific/Jumbotron';
import bgImage from '../assets/images/background-01.jpg';
import CardGrid from '../components/specific/CardGrid';
import IconColumns from '../components/common/IconColumns';
import { FaHome, FaUserAlt, FaBell, FaCog } from "react-icons/fa";
import { Grid } from '@chakra-ui/react';



const iconsData = [
    { id: 1, icon: FaHome, title: "Multiple Auction Types" },
    { id: 2, icon: FaUserAlt, title: "Globally Available" },
    { id: 3, icon: FaBell, title: "Real Time Environment" },
    { id: 4, icon: FaCog, title: "24/7 Support" },
];



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