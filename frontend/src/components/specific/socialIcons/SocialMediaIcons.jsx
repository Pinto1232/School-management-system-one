import { Box, HStack, IconButton, Link } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const SocialMediaIcons = ({ size, color, align }) => {

    /* Another method of adding the links */
    /* const handleFacebookClick = () => {
        window.location.href = "https://www.facebook.com/your_facebook_page";
      };
    
      const handleTwitterClick = () => {
        window.location.href = "https://twitter.com/your_twitter_page";
      };
    
      const handleInstagramClick = () => {
        window.location.href = "https://www.instagram.com/your_instagram_page";
    }; */



    return (
        <HStack spacing={2}>
            <Link href="https://www.facebook.com" isExternal>
                <IconButton
                    icon={<FaFacebook />}
                    size={size}
                    colorScheme="facebook"
                    aria-label="Facebook"
                    variant="ghost"
                    {...color}
                    {...align}
                /* onClick={handleFacebookClick} */
                />
            </Link>
            <Link href="https://www.twitter.com" isExternal>
                <IconButton
                    icon={<FaTwitter />}
                    size={size}
                    colorScheme="twitter"
                    aria-label="Twitter"
                    variant="ghost"
                /* onClick={handleTwitterClick} */
                />
            </Link>
            <Link href="https://www.instagram.com" isExternal>
                <IconButton
                    icon={<FaInstagram />}
                    size={size}
                    colorScheme="pink"
                    aria-label="Instagram"
                    variant="ghost"
                /* onClick={handleInstagramClick} */
                />
            </Link>
        </HStack>
    );
};

const SocialMedia = ({ size, color, align }) => {
    return (
        <Box textAlign={align}>
            <SocialMediaIcons size={size} color={color} />
        </Box>
    );
};

export default SocialMedia;