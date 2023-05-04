import React from "react";
import { Heading, Text, Button, Grid } from "@chakra-ui/react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl, title, description }) => {
    return (
        <Grid
            maxW={{ base: "100%", md: "800px" }}
            mx="auto"
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
        >
            <ReactPlayer url={videoUrl} controls width="100%" />
            <Heading as="h3" size="lg" my={4}>
                {title}
            </Heading>
            <Text my={2}>{description}</Text>
            <Button colorScheme="blue" mt={4}>
                Watch on YouTube
            </Button>
        </Grid>
    );
};

export default VideoPlayer;
