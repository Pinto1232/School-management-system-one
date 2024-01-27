import React, { useState } from 'react';
import { Box, Button, Text, VStack, Grid, GridItem } from '@chakra-ui/react';

const AttendanceTracker = ({ students = [], onAttendanceRecorded }) => {
    const [attendance, setAttendance] = useState([]);

    const recordAttendance = (studentId) => {
        setAttendance([...attendance, studentId]);
        onAttendanceRecorded(studentId);
    };

    return (
        <Box p={5} borderRadius="md" boxShadow="md" w="full" h={'290px'} position="relative">
            <Text fontSize="lg" fontWeight="bold" mb={4}>Attendance Tracker</Text>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                {students.map((student) => (
                    <GridItem key={student.id}>
                        <Box borderRadius="md" p={4} borderWidth="1px" borderColor="gray.200">
                            <Text fontSize="md" fontWeight="bold">{student.name}</Text>
                            <Button colorScheme="teal" onClick={() => recordAttendance(student.id)}>
                                Record Attendance
                            </Button>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default AttendanceTracker;