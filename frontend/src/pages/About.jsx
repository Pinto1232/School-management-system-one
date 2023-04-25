import React from 'react'
import bgImage from '../assets/images/about-us.jpg';
import Jumbotron from '../components/specific/Jumbotron';
import { Box, Flex, Grid, InputGroup } from '@chakra-ui/react';
import ServicesSections from '../components/common/ServicesSections';
import services from '../data/ServicesSectionsData'
import BlogPostSection from '../components/common/BlogPostSection';
import AdjustableColumnLayout from '../components/specific/twocolumns/AdjustableColumnLayout';
import ImageData from '../assets/images/about-us.jpg'
import InputFieldComponent from '../components/common/InputFieldComponent';
import CustomButton from '../components/common/CustomButton';



const About = () => {





    return (
        <Box>
            <Jumbotron
                title="Knowing Our Product"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />

            <Box maxW="7xl" border={0} textAlign={'start'} mx="auto" p={6} mt={-10} borderWidth={1} rounded="md">
                <ServicesSections
                    title="Product Value"
                    services={services}
                />
            </Box>


            <AdjustableColumnLayout columns={{ md: 3, sm: 2, lg: 4 }}>
                <Grid border={0} maxW="4xl" mx="auto" mt={-20} p={6} borderWidth={1} rounded="md">
                    <Box>
                        <BlogPostSection
                            title="My First Blog Post"
                            author="John Doe"
                            date="April 20, 2023"
                            excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit justo eget sem blandit, in rutrum purus interdum. Fusce aliquam, est sit amet dapibus pellentesque, lorem neque dictum mi, vel rutrum nisi urna in lectus."
                            imageUrl={ImageData}
                        />
                    </Box>

                    <Box>
                        <BlogPostSection
                            title="My First Blog Post"
                            author="John Doe"
                            date="April 20, 2023"
                            excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit justo eget sem blandit, in rutrum purus interdum. Fusce aliquam, est sit amet dapibus pellentesque, lorem neque dictum mi, vel rutrum nisi urna in lectus."
                            imageUrl={ImageData}
                        />
                    </Box>
                </Grid>
            </AdjustableColumnLayout>

            <AdjustableColumnLayout bgBoxColor="#fff" columns={{ md: 3, sm: 2, lg: 3 }}>
                <Grid shadow={'md'} maxW="4xl" mx="auto" mt={6} p="20px" borderWidth={1} rounded="md">
                    <Flex gap={4} mb={2}>
                        <InputGroup>
                            <InputFieldComponent
                                placeholder="Name"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputFieldComponent
                                placeholder="Name"
                            />
                        </InputGroup>
                    </Flex>

                    <Flex gap={4} mb={2}>
                        <InputGroup>
                            <InputFieldComponent
                                placeholder="Name"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputFieldComponent
                                placeholder="Name"
                            />
                        </InputGroup>
                    </Flex>

                    <Box maxW="xl" mx="auto" mt={3}>
                        <CustomButton
                            width={300}
                        >
                            Submit
                        </CustomButton>
                    </Box>

                </Grid>
            </AdjustableColumnLayout>
        </Box>
    )
}

export default About
