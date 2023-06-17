import React, { useEffect } from "react";
import Jumbotron from "../components/specific/Jumbotron";
import bgImage from "../assets/images/background-01.jpg";
import IconColumns from "../components/common/IconColumns";
import { Box, Grid } from "@chakra-ui/react";
import AboutUsSection from "../components/common/AboutUsSection";
import ProductsSection from "../components/common/ProductsSection";
import { useGetPackagesQuery } from "../services/packageApi";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Home = () => {
  const handleButtonClick = () => {};
  const {
    data: productsPackageData,
    error: errorPackage,
    isLoading: isLoadingPackage,
  } = useGetPackagesQuery();
  const toast = useToast();

  if (isLoadingPackage) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner size="md" color="blue.500" />
      </Box>
    );
  }

  if (errorPackage) {
    toast({
      title: "Error",
      description: errorPackage.message,
      status: "error",
      isClosable: true,
      position: "top",
    });
    return null;
  }

  return (
    <Grid>
      {/* Jumbotron */}
      <Jumbotron
        title="Elevate Education, Simplify School Management!"
        subtitle="Streamlines processes, fosters collaboration, and enhances learning outcomes for a seamless educational experience"
        /* buttonText="learn more" */
        bgImage={bgImage}
        buttonOnClick={handleButtonClick}
      />

      {/* Product section */}
      <Box maxW="4xl" mx="auto" border={0} p={6} borderWidth={1} rounded="md">
        <ProductsSection
          heading="Check Our Packages"
          subheading="Check out our latest offerings"
          products={productsPackageData}
          cardBg={"#fff"}
          imageMaxWidth={"200px"}
          cardShadow="2xl"
          gridCard={900}
        ></ProductsSection>
      </Box>

      {/* Icon component */}
      <IconColumns
        backgroundColor="gray.600"
        iconSize="24px"
        textSize="16px"
        textColor="#000000"
        buttonStyle={{
          color: "#fff",
          width: "200px",
          maxW: "100%",
          padding: "20px",
          mt: "20px",
          backgroundColor: "#3182ce",
        }}
      />

      <Box
        maxW="6xl"
        border={0}
        mx="auto"
        mt={10}
        p={6}
        borderWidth={1}
        rounded="md"
      >
        <AboutUsSection
          style={{
            padding: "16px",
            gap: "8px",
          }}
          headingStyle={{
            maxW: "480px",
          }}
          heading="Our services"
        
      </Box>
    </Grid>
  );
};

export default Home;