import React, { useEffect } from "react";
import Jumbotron from "../components/specific/Jumbotron";
import bgImage from "../assets/images/background-01.jpg";
import IconColumns from "../components/common/IconColumns";
import { Flex, Box, Image, useBreakpointValue, Grid } from "@chakra-ui/react";
import AboutUsSection from "../components/common/AboutUsSection";
import ProductsSection from "../components/common/ProductsSection";
import { useGetPackagesQuery } from "../services/packageApi";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Home = () => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const imageSize = useBreakpointValue({ base: "100%", md: "50%" });
  const paddingSize = useBreakpointValue({ base: "16px", md: "32px" });
  const gapSize = useBreakpointValue({ base: "8px", md: "16px" });
  const headingWidth = useBreakpointValue({ base: "90%", md: "480px" });

  const boxMaxWidth = useBreakpointValue({ base: "90%", md: "75%", lg: "4xl" });
  const gridCardWidth = useBreakpointValue({ base: 300, md: 600, lg: 900 });

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
      <Box
        maxW={boxMaxWidth}
        mx="auto"
        border={0}
        p={6}
        borderWidth={1}
        rounded="md"
      >
        <ProductsSection
          heading="Check Our Packages"
          subheading="Check out our latest offerings"
          products={productsPackageData}
          cardBg={"#fff"}
          imageMaxWidth={"200px"}
          cardShadow="2xl"
          gridCard={gridCardWidth}
        />
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

      <Flex
        maxW={{ base: "90%", md: "6xl" }}
        flexDirection={flexDirection}
        border={0}
        mx="auto"
        mt={10}
        p={6}
        borderWidth={1}
        rounded="md"
        align="center"
      >
        <Box w={{ base: "100%", md: "50%" }} pr={{ md: "2" }}>
          <AboutUsSection
            style={{
              padding: paddingSize,
              gap: gapSize,
            }}
            headingStyle={{
              maxW: headingWidth,
            }}
            heading="Our services"
            subheading="
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod aliquam commodo. 
                    Vestibulum pharetra semper urna, ac dapibus felis ultricies ut.
                    Duis pharetra sapien non magna ullamcorper, ut scelerisque enim sagittis.
                    Nullam at ipsum quis nibh posuere ultrices. Nam posuere, purus sed finibus venenatis, 
                    enim urna commodo mauris, at aliquet metus lorem vitae mauris."
          />
        </Box>
        <Box w={imageSize} position="relative">
          <Image
            src="https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc="
            layout="fill"
            objectFit="cover"
            alt="About us image"
          />
        </Box>
      </Flex>
    </Grid>
  );
};

export default Home;
