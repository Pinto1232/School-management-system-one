import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ShareButtons = ({ platforms = [], buttonStyles = {} }) => {
  const defaultButtonStyles = {
    color: useColorModeValue("gray.600", "gray.200"),
    bg: useColorModeValue("white", "gray.700"),
    _hover: {
      bg: useColorModeValue("gray.200", "gray.600"),
    },
  };

  console.log("Icons pinto", platforms);

  const mergedButtonStyles = Object.assign({}, defaultButtonStyles, buttonStyles);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareLink = (platform) => {
    switch (platform) {
      case "twitter":
        return `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(currentUrl)}`;
      case "facebook":
        return `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(currentUrl)}`;
      case "linkedin":
        return `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(currentUrl)}`;
      case "email":
        return `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(currentUrl)}`;
      default:
        return "";
    }
  };

  return (
    <Flex>
      {platforms.map((platform) => (
        <IconButton
          justify={'center'}
          alignItems={'center'}
          key={platform}
          as="a"
          href={shareLink(platform)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${platform}`}
          icon={
            platform === "twitter"
              ? <FaTwitter />
              : platform === "facebook"
                ? <FaFacebook />
                : platform === "linkedin"
                  ? <FaLinkedin />
                  : platform === "email"
                    ? <FaEnvelope />
                    : null
          }
          size="sm"
          {...mergedButtonStyles}
          mr={2}
        />
      ))}
    </Flex>
  );
};

export default ShareButtons;
