import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from "react-icons/fa";

const AudioPlayer = ({ src }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const audioElement = new Audio(src);
    setAudio(audioElement);
    return () => audioElement.pause();
  }, [src]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (value) => {
    audio.volume = value / 100;
    setVolume(value);
  };

  return (
    <Box>
      <Flex alignItems="center">
        <IconButton
          aria-label="Play/Pause"
          onClick={togglePlayPause}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          mr="2"
        />
        <Box w="100%">
          <Slider
            defaultValue={0}
            aria-label="audio slider"
            min={0}
            max={audio ? audio.duration : 100}
            onChange={(value) => {
              audio.currentTime = value;
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex justifyContent="space-between">
            <Text fontSize="sm" fontWeight="bold">
              {audio ? `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)}` : "0:00"}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {audio ? `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)}` : "0:00"}
            </Text>
          </Flex>
        </Box>
        <Flex alignItems="center">
          <IconButton
            aria-label="Volume Up"
            icon={<FaVolumeUp />}
            mr="2"
            onClick={() => handleVolumeChange(volume + 10)}
          />
          <IconButton
            aria-label="Volume Down"
            icon={<FaVolumeDown />}
            onClick={() => handleVolumeChange(volume - 10)}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AudioPlayer;
