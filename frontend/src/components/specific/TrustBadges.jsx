import { Box, Flex, Image, Text } from "@chakra-ui/react";

const TrustBadge = ({ imageSrc, altText, text }) => {
    return (
        <Box textAlign="center" mx={2}>
            <Image src={imageSrc} alt={altText} maxH="80px" mx="auto" mb={2} />
            <Text fontSize="sm">{text}</Text>
        </Box>
    );
};

const TrustBadges = ({ badges }) => {
    return (
        <Flex flexWrap="wrap" justifyContent="center">
            {Array.isArray(badges) && badges.map((badge, index) => (
                <TrustBadge
                    key={index}
                    imageSrc={badge.imageSrc}
                    altText={badge.altText}
                    text={badge.text}
                />
            ))}
        </Flex>
    );
};

export default TrustBadges;
