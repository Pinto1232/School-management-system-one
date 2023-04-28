import { Box, Flex, Image, Tooltip } from "@chakra-ui/react";

const ShippingAndPaymentIcons = ({ icons, alt, iconSize }) => {
    return (
        <Flex justifyContent="center" alignItems="center">
            {Array.isArray(icons) && icons?.map((icon, index) => (
                <Tooltip label={icon.name} key={index}>
                    <Box mx={2} maxW={iconSize} textAlign="center">
                        <Image
                            src={icon.imageSrc}
                            alt={icon.name}
                            maxH="80px"
                            mx="auto"
                        />
                    </Box>
                </Tooltip>
            ))}
        </Flex>
    );
};

export default ShippingAndPaymentIcons;
