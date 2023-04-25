import { HStack, IconButton, Link } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const SocialMediaIcons = ({ size, color, align, iconPadding }) => {
    return (
        <HStack spacing={2}>
            <Link href="https://www.facebook.com" isExternal>
                <IconButton
                    icon={<FaFacebook />}
                    size={size}
                    padding={iconPadding}
                    colorScheme="facebook"
                    aria-label="Facebook"
                    variant="ghost"
                    color={color}
                    align={align}
                    fontSize={size}
                />
            </Link>
            {<Link href="https://www.twitter.com" isExternal>
                <IconButton
                    icon={<FaTwitter />}
                    size={size}
                    padding={iconPadding}
                    colorScheme="facebook"
                    aria-label="Facebook"
                    variant="ghost"
                    color={color}
                    align={align}
                    fontSize={size}
                />
            </Link>}
            <Link href="https://www.instagram.com" isExternal>
                <IconButton
                    icon={<FaInstagram />}
                    size={size}
                    padding={iconPadding}
                    colorScheme="facebook"
                    aria-label="Facebook"
                    variant="ghost"
                    color={color}
                    align={align}
                    fontSize={size}
                />
            </Link>
        </HStack>
    );
};
export default SocialMediaIcons;