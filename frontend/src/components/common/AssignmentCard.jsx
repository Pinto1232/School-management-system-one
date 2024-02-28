import React, { useEffect, useState } from 'react';
import { Box, Text, Progress, VStack, Flex, Heading, Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Tooltip, useColorModeValue, Icon, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { FaUpload, FaEye, FaCheckCircle, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';

const MotionBox = motion(Box);

const AssignmentCard = ({ assignments }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [progressValues, setProgressValues] = useState({});
    const bg = useColorModeValue("white", "gray.800");
    const hoverBg = useColorModeValue("gray.50", "gray.700");
    const [file, setFile] = useState(null);


    useEffect(() => {
        const initialProgressValues = assignments.reduce((acc, assignment) => {
            acc[assignment.id] = assignment.progress || 0;
            return acc;
        }, {});
        setProgressValues(initialProgressValues);
    }, [assignments]);


    const handleMarkComplete = (assignmentId) => {
        setProgressValues(prevValues => ({
            ...prevValues,
            [assignmentId]: 100,
        }));
        toast({
            title: 'Assignment marked as complete!',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    const handleOpenDetails = (assignment) => {
        setSelectedAssignment(assignment);
        onOpen();
    };

    const handleProgressChange = (assignmentId, value) => {
        setProgressValues(prevValues => ({
            ...prevValues,
            [assignmentId]: value,
        }));
    };

    const renderDeadlineIndicator = (deadline) => {
        const now = dayjs();
        const end = dayjs(deadline);
        const isPastDeadline = now.isAfter(end);
        const formatDeadline = end.format('MMM D, YYYY');
        if (isPastDeadline) {
            return <Text color="red.500">Past Deadline: {formatDeadline}</Text>;
        }
        return <Text color="green.500">Deadline: {formatDeadline}</Text>;
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (assignmentId) => {
        if (!file) {
            toast({
                title: 'No file selected',
                description: 'Please select a file to submit.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Assignment submitted!',
            description: `You have submitted ${file.name}.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        // Reset the file state after submission
        setFile(null);
        onClose();
    };


    const renderCountdown = (deadline) => {
        return (
            <Countdown
                date={dayjs(deadline).toDate()}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                        return <Text color="red.500">Deadline passed</Text>;
                    } else {
                        return <Text color="green.500">{days}d {hours}h {minutes}m {seconds}s left</Text>;
                    }
                }}
            />
        );
    };


    return (
        <VStack spacing={5} align="stretch">
            <AnimatePresence>
                {assignments.map((assignment, index) => (
                    <MotionBox
                        key={`${assignment.id}-${index}`}
                        p={5}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="lg"
                        bg={bg}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        _hover={{ bg: hoverBg }}
                    >
                        <Flex justify="space-between" align="center">
                            <Heading fontSize="xl" color="blue.600">{assignment.title}</Heading>
                            {renderDeadlineIndicator(assignment.deadline)}
                        </Flex>
                        <Text fontSize="md" mt={2} mb={4} color="gray.600">{assignment.description}</Text>
                        <Progress value={progressValues[assignment.id]} colorScheme="blue" size="sm" mt={3} borderRadius="md" />
                        <Flex justify="space-between" align="center" mt={4}>
                            <Tooltip label="View Details" hasArrow>
                                <IconButton
                                    icon={<Icon as={FaEye} color="blue.500" w={5} h={5} />}
                                    onClick={() => handleOpenDetails(assignment)}
                                    variant="ghost"
                                    aria-label="View Details"
                                />
                            </Tooltip>
                            <Tooltip label="Submit Assignment" hasArrow>
                                <IconButton
                                    icon={<Icon as={FaUpload} color="teal.500" w={5} h={5} />}
                                    onClick={() => toast({ title: 'Feature not implemented', status: 'info', duration: 2000, isClosable: true })}
                                    variant="ghost"
                                    aria-label="Submit Assignment"
                                />
                            </Tooltip>
                            <Tooltip label="Mark as Complete" hasArrow>
                                <IconButton
                                    icon={<Icon as={FaCheckCircle} color="green.500" w={5} h={5} />}
                                    onClick={() => handleMarkComplete(assignment.id)}
                                    variant="ghost"
                                    aria-label="Mark as Complete"
                                />
                            </Tooltip>
                        </Flex>
                    </MotionBox>
                ))}
            </AnimatePresence>
            {selectedAssignment && (
                <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
                    <ModalOverlay />
                    <ModalContent borderRadius="lg" mx={4} bg="white" color="gray.800">
                        <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center" bg="blue.500" color="white" borderRadius="lg 0 0 0">
                            {selectedAssignment.title}
                        </ModalHeader>
                        <ModalCloseButton color="white" />
                        <ModalBody pt={5}>
                            <Text fontSize="md" mb={4}>{selectedAssignment.description}</Text>
                            <Text fontSize="lg" fontWeight="semibold" mb={2}>Adjust Progress:</Text>
                            <Slider defaultValue={progressValues[selectedAssignment.id]} min={0} max={100} onChange={(value) => handleProgressChange(selectedAssignment.id, value)} mb={4}>
                                <SliderTrack bg="blue.100">
                                    <SliderFilledTrack bg="blue.500" />
                                </SliderTrack>
                                <SliderThumb boxSize={6}>
                                    <Box color="blue.500" as={FaEdit} />
                                </SliderThumb>
                            </Slider>
                            <FormControl>
                                <FormLabel htmlFor="file-upload" fontSize="lg" fontWeight="semibold">Upload your work:</FormLabel>
                                <Input id="file-upload" type="file" onChange={handleFileChange} bg="gray.50" borderColor="gray.300" _hover={{ borderColor: "blue.500" }} />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter flexDirection="column" alignItems="center">
                            <Button colorScheme="blue" w="full" mb={3} onClick={() => handleSubmit(selectedAssignment.id)}>
                                Submit
                            </Button>
                            <Button w="full" variant="outline" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </VStack>
    );
};

export default AssignmentCard;
