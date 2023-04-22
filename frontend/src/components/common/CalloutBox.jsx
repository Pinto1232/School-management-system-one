import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const CalloutBox = ({
    title,
    subtitle,
    bg,
    color,
    align,
    borderRadius,
    boxShadow,
    padding,
    margin
}) => {
    return (
        <Box
            bg={bg ? bg : "#fff"}
            color={color ? color : "#000"}
            borderRadius={borderRadius ? borderRadius : "md"}
            boxShadow={boxShadow ? boxShadow : "md"}
            padding={padding ? padding : "4"}
            margin={margin ? margin : "4"}
        >
            <Flex
                direction="column"
                alignItems={align ? align : "center"}
            >
                <Heading as="h2" size="md" mb="2">
                    {title}
                </Heading>
                <Text as="p" fontSize="sm">
                    {subtitle}
                </Text>
            </Flex>
        </Box>
    );
};

export default CalloutBox;
