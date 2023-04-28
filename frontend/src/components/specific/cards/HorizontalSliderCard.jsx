import { Box, Heading, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HorizontalSliderCard = ({ data, slidesToShow, slidesToScroll, autoplaySpeed }) => {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow || 3,
        slidesToScroll: slidesToScroll || 1,
        autoplay: true,
        autoplaySpeed: autoplaySpeed || 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box>
            <Slider {...sliderSettings}>
                {Array.isArray(data) && data.map((item, index) => (
                    <Box key={index} mx={2}>
                        <Box position="relative">
                            <Box
                                bgImage={`url(${item.imageSrc})`}
                                bgSize="cover"
                                bgPosition="center"
                                height="200px"
                                width="100%"
                            >
                                <Box position="absolute"
                                    top="0"
                                    left="0"
                                    right="0"
                                    bottom="0"
                                    bg="rgba(0,0,0,0.5)"
                                >
                                    <Box p={4}>
                                        <Heading size="md" color="white">
                                            {item.heading}
                                        </Heading>
                                        <Text color="white">{item.paragraph}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default HorizontalSliderCard;
