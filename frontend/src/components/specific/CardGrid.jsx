import { Grid } from '@chakra-ui/react'
import React from 'react'
import SubscriptionCard from '../common/SubscriptionCard'
import bgImageCard from '../../assets/images/basic-plan.jpg'
import { Text } from '@chakra-ui/react';

const CardGrid = () => {
    return (
        <div>
            <Text fontSize="4xl" fontWeight="bold" textAlign="center" mt={8} mb={6}>
                Our Plans
            </Text>

            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
                gap={4}
                px={{ base: 4, md: 'auto' }}
                py={6}
                justifyContent="center"
                maxWidth="1200px"
                margin="0 auto"
            >
                <SubscriptionCard
                    title="Basic Plan"
                    price="10"
                    features={["Feature 1", "Feature 2", "Feature 3"]}
                    buttonText="Subscribe"
                    onSubscribe={() => console.log("Basic Plan subscribed")}
                    imageUrl={bgImageCard}
                />
                <SubscriptionCard
                    title="Pro Plan"
                    price="20"
                    features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
                    buttonText="Subscribe"
                    onSubscribe={() => console.log("Pro Plan subscribed")}
                    imageUrl={bgImageCard}
                />
                <SubscriptionCard
                    title="Premium Plan"
                    price="30"
                    features={["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]}
                    buttonText="Subscribe"
                    onSubscribe={() => console.log("Premium Plan subscribed")}
                    imageUrl={bgImageCard}
                />
            </Grid>
        </div >
    )
}

export default CardGrid
