import React, { useState } from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, AspectRatio, Image, Text } from '@chakra-ui/react';

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Video 1', placeholder: 'https://via.placeholder.com/150' },
  { id: 'M7lc1UVf-VE', title: 'Video 2', placeholder: 'https://via.placeholder.com/150' },
  { id: 'sNPnbI1arSE', title: 'Video 3', placeholder: 'https://via.placeholder.com/150' },
];

const VideoSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleChange = (value) => {
    setSliderValue(value);
    setVideoLoaded(false); // Reset video loaded state on slide change
  };

  return (
    <Box width="full" p={5}>
      <Text mb={3}>{videos[sliderValue].title}</Text>
      <AspectRatio ratio={16 / 9} mb={5}>
        {!videoLoaded && (
          <Image src={videos[sliderValue].placeholder} alt="Video Placeholder" />
        )}
        <iframe
          title="YouTube video player"
          src={`https://www.youtube.com/embed/${videos[sliderValue].id}`}
          allowFullScreen
          onLoad={() => setVideoLoaded(true)}
          style={{ display: videoLoaded ? 'block' : 'none' }}
        />
      </AspectRatio>
      <Slider aria-label="video-slider" value={sliderValue} min={0} max={videos.length - 1} onChange={handleChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default VideoSlider;
