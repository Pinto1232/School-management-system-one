import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MegaMenus from '../components/specific/megamenu/MegaMenus'
import MegamenuData from '../data/MegamenuData'
import ProgressIndicator from '../components/specific/ProgressIndicator'
import LoadingAnimation from '../components/specific/LoadingAnimation'
import LoadingAnimationTwo from '../components/specific/LoadingAnimationTwo'
import PageTransition from '../components/specific/pagetransition/PageTransition'
import Parallax from '../components/specific/Parallax'
import parallaxImage from '../assets/images/pro.jpg'

console.log("Paralax image", parallaxImage);

const TestPageTwo = () => {
    const orientation = "horizontal";


    // Loading two
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Do some async operation here...
        setIsLoading(false);
    }, []);


    return (
        <Box>
            <Grid mt={'20px'}>
                {/* Mega menu */}
                <MegaMenus
                    megamenudata={MegamenuData}
                    orientation={orientation}
                />
            </Grid>

            <Box border={0} maxW="3xl" textAlign={'center'} mx="auto" mt={'20px'} p={6} borderWidth={1} rounded="md">
                <Flex gap={'5'}>
                    <ProgressIndicator value={50} maxValue={100} />
                    <ProgressIndicator value={75} maxValue={100} color="red.500" />
                    <ProgressIndicator value={25} maxValue={50} height="16px" color="orange.500" />
                </Flex>
            </Box>


            {/* Laoding one */}
            <Box border={0} maxW="sm" textAlign={'center'} mx="auto" mt={'20px'} p={6} borderWidth={1} rounded="md">
                <LoadingAnimation size="50px" color="red" thickness="6px" speed="1s" />
                <p>Loading...</p>
            </Box>

            {/* Loading two */}
            <Box border={0} maxW="3xl" textAlign={'center'} mx="auto" mt={'20px'} p={6} borderWidth={1} rounded="md">
                {isLoading ? <LoadingAnimationTwo /> : <Box>This is the content that loaded.</Box>}
            </Box>


            {/* Page transition */}
            <Box maxW="7xl" textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <PageTransition duration={6000} direction="up" easing="cubic-bezier(.17,.67,.83,.67)">
                    {/* Your page content goes here */}
                    <Text textAlign={'center'}>
                        What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset

                        sheets containing Lorem Ipsum passages, and more
                        recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                        Why do we use it?
                        It is a long established fact that a reader will
                        be distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of letters,
                        as opposed to using 'Content here, content here',
                        making it look like readable English. Many desktop
                        publishing packages and web page editors now use Lorem Ipsum
                        as their default model text, and a search for 'lorem ipsum'
                        will uncover many web sites still in their infancy.
                        Various versions have evolved over the years, sometimes by accident,
                        sometimes on purpose (injected humour and the like).


                        Where does it come from?
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                        It has roots in a piece of classical Latin literature from 45 BC,
                        making it over 2000 years old. Richard McClintock,
                        a Latin professor at Hampden-Sydney College in Virginia,
                        looked up one of the more obscure Latin words, consectetur,
                        from a Lorem Ipsum passage, and going through the cites of
                        the word in classical literature, discovered the undoubtable source.
                        Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                        Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                        written in 45 BC. This book is a treatise on the theory of ethics,
                        very popular during the Renaissance. The first line of Lorem Ipsum,
                        "Lorem ipsum dolor sit amet..", comes from a line in section
                        1.10.32.

                        The standard chunk of Lorem Ipsum used since the 1500s is
                        reproduced below for those interested. Sections 1.10.32 and 1.10.33
                        from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
                        in their exact original form, accompanied by English versions from
                        the 1914 translation by H. Rackham.

                        Where can I get some?
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form, by injected
                        humour, or randomised words which don't look even slightly believable.
                        If you are going to use a passage of Lorem Ipsum, you need to be sure
                        there isn't anything embarrassing hidden in the middle of text.
                        All the Lorem Ipsum generators on the Internet tend to repeat
                        predefined chunks as necessary, making this the first true generator
                        on the Internet. It uses a dictionary of over 200 Latin words,
                        combined with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
                        therefore always free from repetition, injected humour, or
                        non-characteristic words etc.
                    </Text>
                </PageTransition>
            </Box>

            {/* Parallax */}
            <Box
                position="relative"
            >
                <Box
                    backgroundImage={`url(${parallaxImage})`}
                    backgroundSize="cover"
                    backgroundPosition="center center"
                    height="400px"
                    position="relative"
                >
                    <Parallax height="400px" />
                </Box>
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    maxW='7xl'
                    mx="auto"
                    textAlign={'center'}
                >
                    <Text fontSize={'x-large'} as="h1" maxW='7xl' mx="auto" textAlign={'center'} >
                        in the middle of text. All the Lorem Ipsum generators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet.
                        It uses a dictionary of over 200 Latin words, combined with
                    </Text>
                </Box>
            </Box>

        </Box>
    )
}

export default TestPageTwo
