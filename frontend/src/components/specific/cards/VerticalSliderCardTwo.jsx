import { Box, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";

const VerticalSliderCardTwo = ({ slidesToShow, slidesToScroll, autoplaySpeed, data }) => {

    const settings = {
        dots: true,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: slidesToShow || 1,
        slidesToScroll: slidesToScroll || 1,
        autoplay: true,
        autoplaySpeed: autoplaySpeed || 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {Array.isArray(data) && data.map((item, index) => (
                <Box key={index} p={4} backgroundColor="white">
                    <Box onClick={() => console.log("Image clicked")} cursor="pointer">
                        <Image src={item.imageUrl} alt={item.altText} mb={4} />
                    </Box>
                    <Text fontSize="md">{item.title}</Text>
                    <Text fontSize="sm" color="gray.500">
                        {item.description}
                    </Text>
                </Box>
            ))}
        </Slider>
    );
};

export default VerticalSliderCardTwo;
