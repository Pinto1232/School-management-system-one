import React, { useState, useCallback } from 'react';
import {
    Box, Button, Switch, Text, Flex, Image, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast,
    Stack, FormControl, FormLabel, Badge, useColorModeValue
} from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AttendanceTracker = ({ students = [], onAttendanceRecorded }) => {
    const [attendance, setAttendance] = useState(students.map(student => ({ ...student, status: 'unmarked' })));
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    const recordAttendance = () => {
        if (!attendance.some(student => student.status !== 'unmarked')) {
            toast({
                title: 'No attendance marked',
                description: "Please mark attendance for at least one student.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        onAttendanceRecorded(attendance);
        onClose();
        
        const studentNames = attendance.filter(student => student.status !== 'unmarked').map(student => student.name).join(", ");
        toast({
            title: 'Attendance recorded successfully.',
            description: `Attendance recorded for students: ${studentNames}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    const toggleStudentStatus = useCallback((studentId) => {
        setAttendance(currentAttendance =>
            currentAttendance.map(student =>
                student.id === studentId ? { ...student, status: student.status === 'present' ? 'absent' : 'present' } : student
            )
        );
    }, []);

    return (
        <Box p={5} borderRadius="md" boxShadow="lg" w="full" bg={bgColor}>
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center" color={textColor}>Attendance Tracker</Text>
            <Button colorScheme="blue" onClick={onOpen} width="full">
                Record Attendance
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent boxShadow="2xl" borderRadius="lg">
                    <ModalHeader>Select Students</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            {attendance.map((student) => (
                                <Flex key={student.id} align="center" p={3} bg={bgColor} borderRadius="md" boxShadow="base">
                                    <Image src={student.imageUrl} alt={student.name} boxSize="50px" borderRadius="full" mr={3} />
                                    <Box flex="1">
                                        <Text fontSize="md" fontWeight="bold" color={textColor}>{student.name}</Text>
                                        <Badge colorScheme={student.status === 'present' ? 'green' : student.status === 'absent' ? 'red' : 'gray'}>
                                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                        </Badge>
                                    </Box>
                                    <Switch isChecked={student.status === 'present'} onChange={() => toggleStudentStatus(student.id)} size="lg">
                                        {student.status === 'present' ? <FaCheck /> : <FaTimes />}
                                    </Switch>
                                </Flex>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={recordAttendance}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AttendanceTracker;
