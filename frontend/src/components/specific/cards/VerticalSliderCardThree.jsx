import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading, Text } from "@chakra-ui/react";

const VerticalSliderCardThree = ({ data, slidesToShow, slidesToScroll, autoplaySpeed }) => {
    const settings = {
        dots: false,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: slidesToShow || 1,
        slidesToScroll: slidesToScroll || 1,
        autoplay: true,
        autoplaySpeed: autoplaySpeed || 3000,
        cssEase: "linear",
    };

    return (
        <Box maxWidth="100%">
            <Slider {...settings}>
                {data.map((item, index) => (
                    <Box key={index}>
                        <Box position="relative">
                            <Box height="580px" overflow="hidden">
                                <Box
                                    as="img"
                                    src={item.imageSrc}
                                    alt={item.altText}
                                    maxWidth="100%"
                                    minHeight="100%"
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    backgroundRepeat={'no-repeat'}
                                    backgroundSize={'cover'}
                                    backgroundPosition={'center'}
                                />
                            </Box>
                            <Box
                                position="absolute"
                                top="10px"
                                left="10px"
                                zIndex="1"
                                color="white"
                                textAlign={'start'}
                            >
                                <Heading as="h3" size="md" mb="2">
                                    {item.heading}
                                </Heading>
                                <Text>{item.text}</Text>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default VerticalSliderCardThree;
