import React from "react";
import Jumbotron from "../components/specific/Jumbotron";
import bgImage from "../assets/images/background-01.jpg";
import IconColumns from "../components/common/IconColumns";
import { Box, Grid, Spinner, useToast } from "@chakra-ui/react";
import AboutUsSection from "../components/common/AboutUsSection";
import ProductsSection from "../components/common/ProductsSection";
import { useGetPackagesQuery } from "../services/packageApi";

const Home = () => {
  const {
    data: productsPackageData,
    error: errorPackage,
    isLoading: isLoadingPackage,
  } = useGetPackagesQuery();

  const toast = useToast();

  if (isLoadingPackage) {
    return (
      <Box d="flex" justifyContent="center" alignItems="center" h="100vh">
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
    <Grid px={{ base: '4', md: '10', lg: '16' }} py='10'>
      <Jumbotron
        title="Elevate Education, Simplify School Management!"
        subtitle="Streamlines processes, fosters collaboration, and enhances learning outcomes for a seamless educational experience"
        bgImage={bgImage}
      />

      <Box maxW={{ base: "xl", md: "2xl", lg: "4xl" }} mx="auto" p={6} border="1px" rounded="md">
        <ProductsSection
          heading="Check Our Packages"
          subheading="Check out our latest offerings"
          products={productsPackageData}
          cardBg="#fff"
          imageMaxWidth={{ base: "150px", md: "200px" }}
          cardShadow="2xl"
        />
      </Box>

      <IconColumns
        backgroundColor="gray.600"
        iconSize={{ base: "20px", md: "24px" }}
        textSize={{ base: "14px", md: "16px" }}
        textColor="#000"
        buttonColor="#3182ce"
        buttonWidth={{ base: "full", sm: "200px" }}
        buttonPadding="20px"
        buttonMarginTop="20px"
      />

      <Box maxW={{ base: "xl", md: "2xl", lg: "6xl" }} mx="auto" mt={10} p={6} border="1px" rounded="md">
        <AboutUsSection
          heading="Our services"
          subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod aliquam commodo. Vestibulum pharetra semper urna, ac dapibus felis ultricies ut. Duis pharetra sapien non magna ullamcorper, ut scelerisque enim sagittis. Nullam at ipsum quis nibh posuere ultrices. Nam posuere, purus sed finibus venenatis, enim urna commodo mauris, at aliquet metus lorem vitae mauris."
          imageUrl="https://media.istockphoto.com/id/1402604850
