import React, { useState } from 'react';
import { Container, Button, useColorModeValue, useToast, VStack, Heading, Box } from '@chakra-ui/react';
import FileUploader from '../FileUploader/FileUploader';
import Folder from '../Folder/Folder';

const CourseMaterialContainer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.700');
    const color = useColorModeValue('gray.700', 'white');


    const onFileSelectSuccess = (file) => {
        setSelectedFile(file);
        toast({
          title: "Success",
          description: "File selected successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      };
    
      const onFileSelectError = (errorMessage) => {
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      };


    const [folders, setFolders] = useState([
        { id: 'root', name: 'Root', parentId: null, children: [] }
    ]);
    const [selectedFolderId, setSelectedFolderId] = useState('root');

    const handleFolderSelect = (folderId) => {
        setSelectedFolderId(folderId);
    };

    const handleAddFolder = (parentFolderId) => {
        const folderName = window.prompt('Enter the name for the new folder:');
        if (folderName) {
            addFolder(folderName, parentFolderId);
        }
    };

    const addFolder = (folderName, parentFolderId) => {
        const newFolder = {
            id: Date.now().toString(), // Simple unique ID generation
            name: folderName,
            parentId: parentFolderId,
            children: []
        };

        if (parentFolderId === null || parentFolderId === 'root') {
            // Adding a root folder
            setFolders([...folders, newFolder]);
        } else {
            // Adding a subfolder requires finding the parent folder and updating its children
            const addSubFolder = (folders, folderId, subFolder) => {
                return folders.map(folder => {
                    if (folder.id === folderId) {
                        // Found the parent folder - add the new subfolder
                        return { ...folder, children: [...folder.children, subFolder] };
                    } else if (folder.children.length) {
                        // The current folder is not the parent, but it might be an ancestor
                        return { ...folder, children: addSubFolder(folder.children, folderId, subFolder) };
                    } else {
                        // This is not the folder we're looking for
                        return folder;
                    }
                });
            };
            setFolders(addSubFolder(folders, parentFolderId, newFolder));
        }
    };

    // Recursive function to render folder structure
    const renderFolders = (foldersArray, parentId) => {
        return foldersArray
            .filter(folder => folder.parentId === parentId)
            .map(folder => (
                <Folder
                    key={folder.id}
                    folder={folder}
                    onFolderSelect={handleFolderSelect}
                    onAddSubfolder={handleAddFolder}
                    // Pass the renderFolders function itself to recursively render any children
                    renderSubFolders={renderFolders}
                />
            ));
    };

    return (
        <Container maxW="container.xl" centerContent p={8}>
            <VStack spacing={6} align="stretch" w="100%">
                <Box p={2} shadow="md" borderWidth="1px" borderRadius="md" bg={bgColor}>
                    <FileUploader
                        onFileSelectSuccess={onFileSelectSuccess}
                        onFileSelectError={onFileSelectError}
                    />
                    <Button
                        mt={4}
                        colorScheme="teal"
                        onClick={() => handleAddFolder(selectedFolderId)}
                    >
                        Add Folder
                    </Button>
                    {/* Render the folders here */}
                    {renderFolders(folders, 'root')}
                </Box>
            </VStack>
        </Container>
    );
};

export default CourseMaterialContainer;
