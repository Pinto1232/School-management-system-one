import { HStack, IconButton, Link } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const SocialMediaIcons = ({ size, color, align }) => {
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
                    fontSize={size}
                />
            </Link>
            <Link href="https://www.twitter.com" isExternal>
                <IconButton
                    icon={<FaTwitter />}
                    size={size}
                    colorScheme="twitter"
                    aria-label="Twitter"
                    variant="ghost"
                    fontSize={size}
                />
            </Link>
            <Link href="https://www.instagram.com" isExternal>
                <IconButton
                    icon={<FaInstagram />}
                    size={size}
                    colorScheme="pink"
                    aria-label="Instagram"
                    variant="ghost"
                    fontSize={size}
                />
            </Link>
        </HStack>
    );
};
export default SocialMediaIcons;