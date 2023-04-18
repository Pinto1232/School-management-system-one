import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Box } from "@chakra-ui/react";

const VideoPlayers = ({ src, controls = true, autoplay = false }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const player = videojs(videoRef.current, { controls, autoplay });
        return () => {
            player.dispose();
        };
    }, [controls, autoplay]);

    return (
        <Box data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered">
                <source src={src} type="video/mp4" />
            </video>
        </Box>
    );
};

export default VideoPlayers;
