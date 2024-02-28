import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import FolderTreeView from '../FolderTreeView/FolderTreeView';


const FolderManager = () => {
    const [folderStructure, setFolderStructure] = useState([
        { id: '1', name: 'Root', parentId: null, children: [] }
    ]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [newFolderName, setNewFolderName] = useState('');
    const toast = useToast();

    const addFolder = (name, parentId) => {
        const newFolder = {
            id: Date.now().toString(),
            name: name,
            parentId: parentId,
            children: []
        };
        if (parentId === null) {
            setFolderStructure([...folderStructure, newFolder]);
        } else {
            const addSubFolder = (folders, folderId, subFolder) => {
                return folders.map(folder => {
                    if (folder.id === folderId) {
                        return { ...folder, children: [...folder.children, subFolder] };
                    } else if (folder.children.length > 0) {
                        return { ...folder, children: addSubFolder(folder.children, folderId, subFolder) };
                    } else {
                        return folder;
                    }
                });
            };
            setFolderStructure(addSubFolder(folderStructure, parentId, newFolder));
        }
    };

    const selectFolder = (folderId) => {
        setSelectedFolderId(folderId);
        console.log(`Folder ${folderId} selected`);
    };

    const handleAddFolderClick = () => {
        if (!newFolderName.trim()) {
          toast({
            title: 'Error',
            description: 'Folder name cannot be empty',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        addFolder(newFolderName, selectedFolderId);
        setNewFolderName(''); 
      };
    

    return (
        <Container maxW="container.md" centerContent p={8} bg={'white'} w="full">
        <VStack spacing={4} align="stretch" w="full">
            <Box>
                <Heading size="lg" mb={4}>Folder Structure</Heading>
                <Input
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New folder name"
                    size="md"
                    mb={2}
                />
                <Button onClick={handleAddFolderClick} colorScheme="blue">Add New Folder</Button>
            </Box>
            <FolderTreeView
                folderStructure={folderStructure}
                addFolder={addFolder}
                selectFolder={selectFolder}
            />
        </VStack>
    </Container>
    );
};

export default FolderManager;
