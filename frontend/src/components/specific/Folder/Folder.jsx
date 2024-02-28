import { Box, useColorModeValue } from "@chakra-ui/react";

const Folder = ({ folder, onFolderSelect }) => {
    const bgColor = useColorModeValue('blue.50', 'blue.900');
    const hoverBgColor = useColorModeValue('blue.100', 'blue.700');
    const textColor = useColorModeValue('blue.700', 'blue.100');

    return (
        <Box
            p={3}
            m={1}
            borderRadius="md"
            bg={bgColor}
            color={textColor}
            _hover={{ bg: hoverBgColor, cursor: 'pointer' }}
            onClick={() => onFolderSelect(folder.id)}
        >
            <Text fontWeight="bold">{folder.name}</Text>
        </Box>
    );
};

export default Folder;
