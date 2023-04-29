import { Button, Icon } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

const BackToTopButton = ({ iconButtonW, iconButtonH}) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {showButton && (
                <Button
                   zIndex={3000}
                    onClick={handleClick}
                    position="fixed"
                    bottom={8}
                    right={8}
                    borderRadius="full"
                    size="md"
                    colorScheme="teal"
                    _hover={{ bg: "teal.500" }}
                >
                    <Icon w={iconButtonW} h={iconButtonH} as={FaArrowUp} />
                </Button>
            )}
        </>
    );
};

export default BackToTopButton;
