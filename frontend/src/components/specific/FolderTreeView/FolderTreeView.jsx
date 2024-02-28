import React, { useState } from 'react';
import { Button, Input, VStack, Box, IconButton, Text  } from '@chakra-ui/react';
import { FaFolder } from 'react-icons/fa';

const FolderTreeView = ({ folderStructure, addFolder, selectFolder }) => {
    const [newFolderName, setNewFolderName] = useState('');

    const handleAddFolder = (parentFolderId = null) => {
        addFolder(newFolderName, parentFolderId);
        setNewFolderName('');
    };

    const renderFolderTree = (folders, level = 0 ) => {
        return folders.map(folder => (
            <VStack align="start" key={folder.id} pl={level * 4} spacing={2}>
                <Box d="flex" alignItems="center">
                    <IconButton
                        icon={<FaFolder />} 
                        size="sm"
                        variant="ghost"
                        aria-label="Select Folder"
                        onClick={() => selectFolder(folder.id)}
                        mr={2}
                    />
                    <Text
                        as="span"
                        fontSize="md"
                        fontWeight="medium"
                        _hover={{ textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => selectFolder(folder.id)}
                    >
                        {folder.name}
                    </Text>
                </Box>
                {folder.children && renderFolderTree(folder.children, level + 1)}
            </VStack>
        ));
    };

    return (
        <VStack align="start" spacing={4}>
            {renderFolderTree(folderStructure)}
        </VStack>
    );
};

export default FolderTreeView;
