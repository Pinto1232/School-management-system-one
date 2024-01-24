import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListIcon, Text, VStack, HStack, Badge, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, TableContainer, useColorModeValue, ButtonGroup, IconButton, Input, InputGroup, InputLeftElement, Spinner, Flex, Center } from '@chakra-ui/react';
import { FaBook, FaUserGraduate, FaCalendarCheck, FaBell } from 'react-icons/fa';

const RecentActivities = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Static data for testing
        const data = [
            { type: 'newAssignment', description: 'New assignment posted.' },
            { type: 'gradeUpdate', description: 'Grade updated for John Doe.' },
            { type: 'attendanceRecord', description: 'Attendance recorded for Jane Smith.' },
            { type: 'notification', description: 'Notification sent to all students.' },
        ];
        setActivities(data);
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Box>
            <List spacing={3}>
                {activities.map((activity, index) => (
                    <ListItem key={index}>
                        <ListIcon as={getActivityIcon(activity.type)} />
                        <Text>{activity.description}</Text>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

const getActivityIcon = (type) => {
    switch (type) {
        case 'newAssignment':
            return FaBook;
        case 'gradeUpdate':
            return FaUserGraduate;
        case 'attendanceRecord':
            return FaCalendarCheck;
        case 'notification':
            return FaBell;
        default:
            return null;
    }
};

export default RecentActivities;