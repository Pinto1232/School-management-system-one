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
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
        p={10}
        justifyContent="center"
        maxWidth="1200px"
        mx="auto"
        my={6}
      >
        <Text
          color={textColor}
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          my={6}
        >
          Our Packages Plans
        </Text>
      
        {['Basic', 'Pro', 'Premium'].map((plan, index) => (
          <SubscriptionCard
            key={plan}
            title={`${plan} Plan`}
            price={`${(index + 1) * 10}`}
            features={Array.from({ length: index + 3 }, (_, i) => `Feature ${i + 1}`)}
            buttonText="Subscribe"
            onSubscribe={() => console.log(`${plan} Plan subscribed`)}
            imageUrl={bgImageCardBasic}
          />
        ))}
      </Grid>
      
    )
}

export default CardGrid
