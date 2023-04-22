import React from "react";
import { Box } from "@chakra-ui/react";

const Maps = ({ latitude, longitude, zoom }) => {
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${latitude},${longitude}&zoom=${zoom}`;

    return (
        <Box position="relative" height="0" paddingTop="56.25%">
            <Box
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                height="100%"
                width="100%"
            >
                <iframe
                    title="map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={mapUrl}
                    allowFullScreen
                />
            </Box>
        </Box>
    );
};

export default Maps;
