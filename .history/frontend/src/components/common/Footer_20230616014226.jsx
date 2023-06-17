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
      buttonColor: "#319795",
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

  return (
    <Box
  bg={colorModeStyles.backgroundColor}
  color={colorModeStyles.textColor}
  p={{ base: 4, sm: 4 }} // responsive padding
  mt={8}
  w="100%"
  mx="auto" // centers the box with automatic horizontal margins
>
  <Flex
    direction={{ base: "column", sm: "row" }} // column on mobile, row on larger screens
    wrap="wrap"
    justifyContent="center"
    alignItems="center"
    w="100%"
    mx="auto" // centers the flex container with automatic horizontal margins
    mb={4}
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

      <Flex mx="auto" justify="center" w="100%" px={8}>
        <AdjustableColumnLayout columns={1}>
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
          >
            Submit
          </CustomButton>
        </AdjustableColumnLayout>
      </Flex>

      {showBanner && (
        <CookieConsentBanner
          onAccept={handleAccept}
          CookieWidth="100%"
          buttonColor="blue"
        />
      )}
      <Divider borderColor="gray.300" my={8} />
      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        pt={4}
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
  );
};

export default Footer;
