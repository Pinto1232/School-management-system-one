import React, { useState } from 'react';
import {
  Button,
  VStack,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Center,
  Progress,
  Text,
} from '@chakra-ui/react';

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      onFileSelectError('Please select a file.');
      return;
    }

    if (file.size > maxFileSize) {
      onFileSelectError('File size should not exceed 5MB.');
      return;
    }

    setSelectedFile(file);
    onFileSelectSuccess(file);
  };

  // Example upload function (you'll need to implement the actual upload logic)
  const uploadFile = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Simulate file upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      setTimeout(() => setUploadProgress(progress), 100 * progress);
    }

    // Reset after upload is "complete"
    setTimeout(() => {
      toast({
        title: 'File uploaded successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setSelectedFile(null);
      setUploadProgress(0);
    }, 1100);
  };

  return (
    <Center>
      <VStack>
        <FormControl>
          <FormLabel>Upload Course Material</FormLabel>
          <Input
            type="file"
            p={1}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.gif,.mp3,.mp4"
            onChange={handleFileChange}
            shadow={0}
          />
        </FormControl>
        {selectedFile && (
          <Text mt={2}>
            Selected File: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </Text>
        )}
        {uploadProgress > 0 && (
          <Progress hasStripe value={uploadProgress} width="100%" mt={2} />
        )}
        <Button mt={4} colorScheme="blue" onClick={uploadFile}>
          Upload
        </Button>
      </VStack>
    </Center>
  );
};

export default FileUploader;
