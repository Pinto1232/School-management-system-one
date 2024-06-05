import React, { useEffect, useState } from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import IconColumns from '../components/common/IconColumns';
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import AboutUsSection from '../components/common/AboutUsSection';
import ProductsSection from '../components/ProductsSection/ProductsSection';
import { useGetPackagesQuery } from '../slicers/packageSlicer';
import { useGetContentQuery } from '../slicers/Home/HomeContentSlicer';
import imageGB from  '../assets/images/Banner.jpg'
import { useSnackbar } from 'notistack';

const Home = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const getImageUrl = (path) => {
    if (!path) {
      console.log('No path provided, using fallback image');
      return 'path/to/fallback-image.jpg';
    }

    const relativePath = path.replace(/^.*[\\\/]/, '');
    const imageUrl = `${backendUrl}/uploads/${relativePath}`;
    console.log('Original Path:', path);
    console.log('Relative Path:', relativePath);
    console.log('Image URL:', imageUrl);
    return imageUrl;
  };

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const flexDirection = isMdUp ? 'row' : 'column';
  const imageSize = isMdUp ? '50%' : '100%';
  const headingWidth = isMdUp ? '480px' : '90%';
  const boxMaxWidth = isLgUp ? '4xl' : isMdUp ? '75%' : '90%';
  const gridCardWidth = isLgUp ? 900 : isMdUp ? 600 : 300;

  const { enqueueSnackbar } = useSnackbar();

  const {
    data: contentData,
    error: errorContent,
    isLoading: isLoadingContent,
  } = useGetContentQuery();
  console.log('Content data loaded', contentData);

  const {
    data: productsPackageData,
    error: errorPackage,
    isLoading: isLoadingPackage,
  } = useGetPackagesQuery();
  console.log('data loaded', productsPackageData);

  useEffect(() => {
    if (errorContent) {
      console.error('Error loading content data:', errorContent);
    } else {
      console.log('Content data loaded', contentData);
    }
  }, [contentData, errorContent]);

  
  const selectedImageIndices = [2, 1, 0 ]; 

  
  const images = contentData?.[0]?.images?.filter((image, index) => selectedImageIndices.includes(index)).map(image => image.path) || [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  if (isLoadingPackage || isLoadingContent) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (errorPackage) {
    enqueueSnackbar(errorPackage.message, { variant: 'error' });
    return null;
  }

  if (errorContent) {
    enqueueSnackbar(errorContent.message, { variant: 'error' });
    return null;
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Jumbotron
          title={contentData[0]?.title || 'Default Title'}
          subtitle={contentData[0]?.subTitle || 'Default Subtitle'}
          buttonText={contentData[0]?.buttonsTitle?.[0] || 'Default Button'}
          bgImage={getImageUrl(images[currentImageIndex])}
          buttonOnClick={() => console.log('Button clicked')}
        />
      </Grid>

      <Grid item
        style={{
          backgroundImage: `url(${imageGB})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <Box
          maxWidth={boxMaxWidth}
          mx="auto"
          border={0}
          p={6}
          borderRadius="md"
          mt={-10}
        >
          <ProductsSection
            heading={contentData[0]?.subHeadings || 'Default Title'}
            subheading="Check out our latest offerings"
            products={productsPackageData}
            cardBg={'#fff'}
            imageMaxWidth={'200px'}
            cardShadow="2xl"
            gridCard={gridCardWidth}
          />
        </Box>
      </Grid>

      <Grid item>
        <IconColumns
          backgroundColor="gray.600"
          iconSize="24px"
          textSize="16px"
          textColor="#000000"
          buttonStyle={{
            color: '#fff',
            width: '200px',
            maxWidth: '100%',
            padding: '20px',
            marginTop: '20px',
            backgroundColor: '#3182ce',
          }}
        />
      </Grid>

      <Grid item>
        <Box
          maxWidth={{ xs: '90%', md: '6xl' }}
          display="flex"
          flexDirection={flexDirection}
          mx="auto"
          p={6}
          borderRadius="md"
          alignItems="center"
        >
          <Box width={{ xs: '100%', md: '100%' }} pr={{ md: '2' }}>
            <AboutUsSection
              headingStyle={{
                maxWidth: headingWidth,
              }}
              heading="Our services"
              subheading={contentData[0]?.description}
            />
          </Box>
          <Box
            component="img"
            src={getImageUrl(images[0])}
            alt="About us image"
            sx={{
              width: '60%',
              height: '60%',
              objectFit: 'cover',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const MemoizedHome = React.memo(Home);
export default MemoizedHome;