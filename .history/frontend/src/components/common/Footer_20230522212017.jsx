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
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import footerLinks from "../../data/linksFooterData";
import InputFieldComponent from "./InputFieldComponent";
import CustomButton from "./CustomButton";
import AdjustableColumnLayout from "../specific/twocolumns/AdjustableColumnLayout";
import CookieConsentBanner from "../specific/cookieBanner/CustomCookieBanner";
import ShippingAndPaymentIcons from "../specific/ShippingAndPaymentIcons";
import ShippingAndPaymentData from "../../data/ShippingAndPaymentData";

const Footer = ({ SubmitNewsletter }) => {
  const textColor = useColorModeValue("#4A5568", "#fff");
  const backgroundColor = useColorModeValue("#F7FAFC", "gray.700");
  const buttonColor = useColorModeValue("#319795", "#3182ce");
  const textButton = useColorModeValue("#4A5568", "#fff");
  const footerIcons = useColorModeValue("#319795", "");

  // Custom cookie banner
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieExists = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("cookieConsent="));
    setShowBanner(!cookieExists);
    /* console.log("Cookie exists", cookieExists); */
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
    const expires = "; expires=" + date.toGMTString();
    document.cookie = "cookieConsent=true" + expires + "; path=/";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    SubmitNewsletter();
  };

  return (
    <Box bg={backgroundColor} color="#4A5568" p={4} mt={8} mx="auto" w="100%" justifyContent={"center"} alignItems={"center"}>
      <Flex
        direction={{ base: "column", sm: "row", md: "row" }}
        wrap="wrap"
        justifyContent="center"
        alignItems="center"
        maxWidth="1200px"
        margin="0 auto"
        mb={4}
      >
        {footerLinks.map(({ title, subLinks }, index) => (
          <Box key={index} textAlign="center" p={{ base: 4, sm: 6, md: 12 }}>
            <VStack spacing={2} alignItems="start">
              <Text
                color={textColor}
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
                  color={textColor}
                  fontSize={{ base: "sm", sm: "md", md: "sm" }}
                >
                  {label}
                </Link>
              ))}
            </VStack>
          </Box>
        ))}
      </Flex>

      {/* Subscribe newsletter input */}
      <Box textAlign="center">
        <Flex>
          <AdjustableColumnLayout columns={4}>
            <InputFieldComponent
              placeholder={"Subscribe for our newsletter"}
              placeholderTextColor={"gray.600"}
              icon={FaEnvelope}
              inpuFieldWidth={"434px"}
              inpuFieldBackgroundColor={"gray.200"}
            />
            <CustomButton
              bgColor={buttonColor}
              textColor={"#fff"}
              width={"150px"}
            >
              Submit
            </CustomButton>
          </AdjustableColumnLayout>
        </Flex>
      </Box>
      {/* Cookie */}
      {showBanner && (
        <CookieConsentBanner
          onAccept={handleAccept}
          CookieWidth={"100%"}
          buttonColor={"blue"}
        />
      )}
      <Divider borderColor="gray.300" my={8} />
      <Flex
        direction={{ base: "column-reverse", sm: "row", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxWidth="1200px"
        margin="0 auto"
        pt={4}
      >
        <Text fontSize={{ base: "sm", sm: "md", md: "md" }} color="gray.500">
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
              color={footerIcons}
              fontSize={25}
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="md"
              variant="ghost"
              colorScheme="gray"
              color={footerIcons}
              fontSize={25}
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              size="sm"
              variant="ghost"
              colorScheme="gray"
              color={footerIcons}
              fontSize={25}
            />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
