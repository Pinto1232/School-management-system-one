import React, { useState } from "react";
import Slider from "react-slick";
import {
    Box,
    Flex,
    Image,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slideshow = ({ slides }) => {
    const [isPaused, setIsPaused] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        beforeChange: () => setIsPaused(true),
        afterChange: () => setIsPaused(false),
    };

    return (
        <div>
            <Slider {...settings}>
                {slides.map((slide) => (
                    <Box
                        key={slide.id}
                        position="relative"
                        onClick={onOpen}
                        _hover={{ cursor: "pointer" }}
                    >
                        <Image src={slide.imageUrl} alt={slide.altText} />
                        <Box
                            position="absolute"
                            bottom="0"
                            left="0"
                            width="100%"
                            p="4"
                            bg="blackAlpha.600"
                            color="white"
                        >
                            <Text fontSize="lg">{slide.title}</Text>
                        </Box>
                    </Box>
                ))}
            </Slider>
            <Box
                bg="blackAlpha.800"
                h={isOpen ? "100vh" : "0"}
                w="100%"
                position="fixed"
                top="0"
                left="0"
                zIndex="9999"
                transition="all 0.5s ease-in-out"
                overflowY="auto"
            >
                <Box p="4" maxW="6xl" mx="auto">
                    <Box>
                        <Slider {...settings}>
                            {slides.map((slide) => (
                                <Box key={slide.id}>
                                    <Image
                                        src={slide.imageUrl}
                                        alt={slide.altText}
                                        maxH="600px"
                                        mx="auto"
                                    />
                                    <Box mt="4">
                                        <Text fontSize="lg">{slide.title}</Text>
                                        <Text>{slide.description}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </Slider>
                        <Flex justifyContent="center" mt="4">
                            <Box
                                bg="white"
                                h="2"
                                w="6"
                                mx="1"
                                borderRadius="50%"
                                opacity={isPaused ? "0.5" : "1"}
                            />
                            <Box
                                bg="white"
                                h="2"
                                w="6"
                                mx="1"
                                borderRadius="50%"
                                opacity={!isPaused ? "0.5" : "1"}
                            />
                        </Flex>
                        <Box textAlign="center" mt="4">
                            <Text fontSize="lg">{slides[0].title }</Text>
                        </Box>
                    </Box>
                    <Box textAlign="center" mt="4">
                        <Text
                            fontSize="lg"
                            cursor="pointer"
                            onClick={onClose}
                            _hover={{ textDecoration: "underline" }}
                        >
                            Close
                        </Text>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Slideshow;
