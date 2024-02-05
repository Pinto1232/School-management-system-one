import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Flex,
  Divider,
  Link,
  HStack,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import footerLinks from "../../data/linksFooterData";
import InputFieldComponent from "./InputFieldComponent";
import CustomButton from "./CustomButton";
import AdjustableColumnLayout from "../specific/twocolumns/AdjustableColumnLayout";
import CookieConsentBanner from "../specific/cookieBanner/CustomCookieBanner";
import ShippingAndPaymentIcons from "../specific/ShippingAndPaymentIcons";
import ShippingAndPaymentData from "../../data/ShippingAndPaymentData";

const Footer = ({ SubmitNewsletter }) => {
  const colorModeStyles = useColorModeValue(
    {
      textColor: "#4A5568",
      backgroundColor: "#F7FAFC",
      buttonColor: "#171923",
      textButton: "#4A5568",
      footerIcons: "#319795",
    },
    {
      textColor: "#fff",
      backgroundColor: "gray.700",
      buttonColor: "#3182ce",
      textButton: "#fff",
      footerIcons: "",
    }
  );

  const [showBanner, setShowBanner] = useState(false);
  const bgButtonColor = useColorModeValue("#319795", "#3182ce");
  const innerBgFooter = useColorModeValue("#000", "#1a202c"); 

  useEffect(() => {
    const cookieExists = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("cookieConsent="));
    setShowBanner(!cookieExists);
  }, []);

  const handleAccept = () => {
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = `cookieConsent=true; expires=${date.toGMTString()}; path=/`;
    setShowBanner(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    SubmitNewsletter();
  };


  const responsivePadding = useBreakpointValue({ base: '16px', md: '263px', lg: '453px' });


  return (
    <>
      <Box
        bg={bgButtonColor}
        color={colorModeStyles.textColor}
        p={{ base: 4, md: 8 }}
        mt={8}
        w="full"

      >
        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          justifyContent="center"
          alignItems="center"
          maxW="6xl"
          mx="auto"
          mb={4}
          color={"#fff"}
        >
          {footerLinks.map(({ title, subLinks }, index) => (
            <VStack
              key={index}
              textAlign="center"
              p={{ base: 4, sm: 6, md: 12 }}
              spacing={2}
              alignItems="start"
            >
              <Text
                fontSize={{ base: "sm", sm: "md", md: "xl" }}
                fontWeight="bold"
                mb={2}
              >
                {title}
              </Text>
              {subLinks.map(({ label, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  fontSize={{ base: "sm", sm: "md", md: "sm" }}
                >
                  {label}
                </Link>
              ))}
            </VStack>
          ))}
        </Flex>

        <Flex
          justify="flex-start"
          align="flex-start"
          w="full"
          px={{ base: 4, md: 8 }}
          mb={{ base: 4, md: 8 }}
        >
          <AdjustableColumnLayout columns={{ base: 1, md: 2, lg: 5 }}>
            <Flex align="flex-start" pl={responsivePadding}>
              <InputFieldComponent
                placeholder="Subscribe for our newsletter"
                placeholderTextColor="gray.600"
                icon={FaEnvelope}
                inpuFieldWidth="280px"
                inpuFieldBackgroundColor="gray.200"
              />
              <CustomButton
                bgColor={colorModeStyles.buttonColor}
                textColor="#fff"
                width="full"
                borderRadiusTopRight="10px"
                borderRadiusBottomRight="10px"
                borderRadiusTopLeft="0px"
                borderRadiusBottomLeft="0px"

              >
                Submit
              </CustomButton>
            </Flex>
          </AdjustableColumnLayout>
        </Flex>


        {/* {showBanner && (
        <CookieConsentBanner
          onAccept={handleAccept}
          CookieWidth="full"
          buttonColor="blue"
        />
      )} */}
        <Divider borderColor="gray.300" />
      </Box>

      <Box bg={innerBgFooter}p={2} >
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          maxW="1200px"
          mx="auto"
          pt={4}
          px={{ base: 4, md: 8 }}
        >
          <Text fontSize={{ base: "sm", sm: "md" }} color="gray.500">
            © 2023 PintoEd Management. All rights reserved.
          </Text>
          <Flex gap={2}>
            <ShippingAndPaymentIcons
              icons={ShippingAndPaymentData}
              iconSize={12}
            />
            <HStack spacing={4}>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebook />}
                size="md"
                variant="ghost"
                colorScheme="gray"
                color={colorModeStyles.footerIcons}
                fontSize={25}
              />
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="md"
                variant="ghost"
                colorScheme="gray"
                color={colorModeStyles.footerIcons}
                fontSize={25}
              />
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram />}
                size="sm"
                variant="ghost"
                colorScheme="gray"
                color={colorModeStyles.footerIcons}
                fontSize={25}
              />
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
