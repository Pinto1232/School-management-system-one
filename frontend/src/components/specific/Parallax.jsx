import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";

const Parallax = ({ image, height }) => {
    const [offset, setOffset] = useState(0);

    const handleScroll = () => {
        const yOffset = window.pageYOffset;
        setOffset(yOffset);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Box position="relative" overflow="hidden" height={height}>
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                overflow="hidden"
                transform={`translateY(${offset * 0.5}px)`}
            >
                <Image src={image} height={height} width="100%" objectFit="cover" />
            </Box>
            <Box
                position="absolute"
                top={0}
              
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(to-b, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.3) 100%)"
            />

        </Box>
    );
};

export default Parallax;
