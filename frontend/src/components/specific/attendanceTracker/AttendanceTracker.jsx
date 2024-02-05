import React, { useState } from 'react';
import {
    Box, Button, Checkbox, Text, Flex, Image, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';

const AttendanceTracker = ({ students = [], onAttendanceRecorded }) => {
    const [attendance, setAttendance] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState(new Set());
    const [absentStudents, setAbsentStudents] = useState(new Set());
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    const recordAttendance = () => {
        const currentDate = new Date().toLocaleDateString(); 
        const newAttendance = students.map(student => ({
            id: student.id,
            name: student.name, 
            status: selectedStudents.has(student.id) ? 'present' : absentStudents.has(student.id) ? 'absent' : 'unmarked',
            timestamp: Date.now(),
            date: currentDate
        }));
        setAttendance([...attendance, ...newAttendance]);

        // Filter and log names of present students
        const presentStudents = newAttendance.filter(record => record.status === 'present').map(record => record.name);
        console.log("Present Students:", presentStudents);

        // Filter and log names of absent students
        const absentStudentsList = newAttendance.filter(record => record.status === 'absent').map(record => record.name);
        console.log("Absent Students:", absentStudentsList);

        onAttendanceRecorded(newAttendance);
        onClose();
    };

    const toggleStudentSelection = (studentId, status) => {
        if (status === 'present') {
            setSelectedStudents(prev => {
                const newSet = new Set(prev);
                newSet.has(studentId) ? newSet.delete(studentId) : newSet.add(studentId);
                setAbsentStudents(absent => new Set([...absent].filter(id => id !== studentId)));
                return newSet;
            });
        } else if (status === 'absent') {
            setAbsentStudents(prev => {
                const newSet = new Set(prev);
                newSet.has(studentId) ? newSet.delete(studentId) : newSet.add(studentId);
                setSelectedStudents(present => new Set([...present].filter(id => id !== studentId)));
                return newSet;
            });
        }
    };

    return (
        <Box p={5} borderRadius="md" boxShadow="lg" w="full" bg="white">
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Attendance Tracker</Text>
            <Button colorScheme="blue" onClick={onOpen} width="full">
                Record Attendance
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent boxShadow="2xl" borderRadius="lg" bg="blue.50" color="blue.900">
                    <ModalHeader bg={'blue'} color={'white'}>Select Students</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {students.map((student) => (
                            <Flex key={student.id} align="center" mb={3}>
                                <Image src={student.imageUrl} alt={student.name} boxSize="50px" borderRadius="full" mr={3} />
                                <Text flex="1" fontSize="md">{student.name}</Text>
                                <Checkbox mr={2} isChecked={selectedStudents.has(student.id)} onChange={() => toggleStudentSelection(student.id, 'present')}>
                                    Present
                                </Checkbox>
                                <Checkbox
                                    isChecked={absentStudents.has(student.id)}
                                    onChange={() => toggleStudentSelection(student.id, 'absent')}
                                    colorScheme={absentStudents.has(student.id) ? 'red' : 'gray'} // This line applies the conditional color scheme
                                >
                                    Absent
                                </Checkbox>
                            </Flex>
                        ))}
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