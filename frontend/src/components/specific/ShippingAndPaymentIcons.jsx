import { Box, Flex, Image, Tooltip } from "@chakra-ui/react";

const ShippingAndPaymentIcons = ({ icons, alt }) => {
    return (
        <Flex justifyContent="center" alignItems="center">
            {Array.isArray(icons) && icons?.map((icon, index) => (
                <Tooltip label={icon.name} key={index}>
                    <Box mx={2} textAlign="center">
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
