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
    <Grid>
      <Jumbotron
        title="Elevate Education, Simplify School Management!"
        subtitle="Streamlines processes, fosters collaboration, and enhances learning outcomes for a seamless educational experience"
        bgImage={bgImage}
      />

      <Box maxW="4xl" mx="auto" p={6} border="1px" rounded="md">
        <ProductsSection
          heading="Check Our Packages"
          subheading="Check out our latest offerings"
          products={productsPackageData}
          cardBg="#fff"
          imageMaxWidth="200px"
          cardShadow="2xl"
          gridCard={900}
        />
      </Box>

      <IconColumns
        backgroundColor="gray.600"
        iconSize="24px"
        textSize="16px"
        textColor="#000"
        buttonColor="#3182ce"
        buttonWidth={{base: "full", sm: "200px"}}
        buttonPadding="20px"
        buttonMarginTop="20px"
      />

      <Box maxW="6xl" mx="auto" mt={10} p={6} border="1px" rounded="md">
        <AboutUsSection
          heading="Our services"
          subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod aliquam commodo. Vestibulum pharetra semper urna, ac dapibus felis ultricies ut. Duis pharetra sapien non magna ullamcorper, ut scelerisque enim sagittis. Nullam at ipsum quis nibh posuere ultrices. Nam posuere, purus sed finibus venenatis, enim urna commodo mauris, at aliquet metus lorem vitae mauris."
          imageUrl="https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc="
          altText="About us image"
          containerPadding="16px"
          gap="8px"
          headingMaxWidth="480px"
        />
      </Box>
    </Grid>
  );
};

export default Home;
