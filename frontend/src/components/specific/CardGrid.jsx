import { Grid, useColorModeValue, Text } from '@chakra-ui/react'
import React from 'react'
import SubscriptionCard from '../common/SubscriptionCard'
import bgImageCardBasic from '../../assets/images/basic.jpg'
import bgImageCardPro from '../../assets/images/pro.jpg'
import bgImageCardPremium from '../../assets/images/Premium.jpg'


const CardGrid = () => {
    const textColor = useColorModeValue('#4A5568', '#fff');

    return (
        <Grid
            templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
            }}
            gap={4}
            px={{ base: 4, md: 'auto' }}
            py={6}
            justifyContent="center"
            maxWidth="1200px"
            margin="0 auto"
            p={10}
        >
            <Text
                color={textColor}
                fontSize="4xl"
                fontWeight="bold"
                textAlign="center"
                mt={8} mb={6}
            >
                Our Packages Plans
            </Text>

            <SubscriptionCard
                title="Basic Plan"
                price="10"
                features={["Feature 1", "Feature 2", "Feature 3"]}
                buttonText="Subscribe"
                onSubscribe={() => console.log("Basic Plan subscribed")}
                imageUrl={bgImageCardBasic}
            />
            <SubscriptionCard
                title="Pro Plan"
                price="20"
                features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
                buttonText="Subscribe"
                onSubscribe={() => console.log("Pro Plan subscribed")}
                imageUrl={bgImageCardPro}
            />
            <SubscriptionCard
                title="Premium Plan"
                price="30"
                features={["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]}
                buttonText="Subscribe"
                onSubscribe={() => console.log("Premium Plan subscribed")}
                imageUrl={bgImageCardPremium}
            />
        </Grid >
    )
}

export default CardGrid
