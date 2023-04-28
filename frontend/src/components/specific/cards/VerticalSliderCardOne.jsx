import { Box, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VerticalSliderCardOne = ({ cards, CardW, CardH, CardImgWidth, CardImgHeight }) => {
    const settings = {
        dots: false,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {Array.isArray(cards) && cards.map((card) => (
                <Box
                    w={CardW}
                    h={CardH}
                    key={card.id}
                    textAlign="center"
                >
                    <Box  onClick={() => console.log("Image clicked")} cursor="pointer">
                        <Image  src={card.imageSrc} alt={card.description} mb={4} />
                    </Box>
                    <Text mt={4} fontSize="lg" fontWeight="bold">
                        {card.title}
                    </Text>
                    <Text mt={2}>{card.description}</Text>
                    <Box onClick={() => alert(`You clicked on ${card.title}`)}>
                        <Text cursor="pointer" mt={4} fontWeight="semibold">
                            More details
                        </Text>
                    </Box>
                </Box>
            ))}
        </Slider>
    );
};

export default VerticalSliderCardOne;
