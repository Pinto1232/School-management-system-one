import React, { useEffect, useState } from 'react';
import {
    Box, Heading, Text, VStack, HStack, Badge, Button, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure,
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, useColorModeValue,
    ButtonGroup,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Flex,
    Center,
    CloseButton
} from '@chakra-ui/react';
import { FaUsers, FaTasks, FaRegLightbulb } from 'react-icons/fa';
import { MdEventNote, MdOutlineSubject, MdOutlineInfo } from 'react-icons/md';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AlertToast from '../../common/AlertToast';
import RecentActivities from '../../../../../RecentActivities';
import { motion } from 'framer-motion';

const itemsPerPage = 4;

const ClassOverview = ({
    classes = [],
    headingSize = 'lg',
    classTextSize = 'xl',
    detailTextSize = 'md',
    badgeColorScheme = 'green',
    buttonColorScheme = 'teal'
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenActivity, onOpen: onOpenAct, onClose: onCloseAct } = useDisclosure();
    const [selectedClass, setSelectedClass] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');


    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const sortedClasses = classes.sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];

        if (typeof fieldA === 'string') {
            fieldA = fieldA.toUpperCase();
        }
        if (typeof fieldB === 'string') {
            fieldB = fieldB.toUpperCase();
        }

        if (fieldA < fieldB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (fieldA > fieldB) {
            return sortOrder === 'asc' ? 1 : -1;
        }

        return 0;
    });

    const filteredClasses = classes.filter(classItem =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentClasses = filteredClasses.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
    const [exportStatus, setExportStatus] = useState(null);
    const [exportMessage, setExportMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleViewDetails = (classItem) => {
        setSelectedClass(classItem);
        onOpen();
        setExportStatus(null);
        setExportMessage("");
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Check if classes is an array and has length
    if (!Array.isArray(classes) || classes.length === 0) {
        return <Text>No classes available.</Text>;
    }

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner />
            </Center>
        );
    }

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const exportToCSV = () => {
        const csvData = classes.map(classItem => ({
            "Name": classItem.name,
            "Number of Students": classItem.numberOfStudents,
            "Upcoming Assignments": classItem.upcomingAssignments.length
        }));

        const csvLink = document.createElement('a');
        csvLink.href = URL.createObjectURL(new Blob([csvData], { type: 'text/csv' }));
        csvLink.download = 'classes.csv';
        csvLink.click();
    };

    const exportToPDF = (setExportStatus, setExportMessage) => {
        try {
            const doc = new jsPDF();
            const tableColumn = ["Name", "Number of Students", "Upcoming Assignments"];
            const tableRows = [];

            classes.forEach(classItem => {
                const row = [classItem.name, classItem.numberOfStudents, classItem.upcomingAssignments.length];
                tableRows.push(row);
            });

            // New autoTable syntax
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 20
            });

            doc.save('classes.pdf');

            // Update export status and message
            setExportStatus("success");
            setExportMessage("PDF exported successfully!");
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        } catch (error) {
            // Update export status and message
            setExportStatus("failure");
            setExportMessage("Failed to export PDF!");
        }
    };


    return (
        <VStack spacing={4} align="stretch">
            <Heading as="h2" size={headingSize} mb={4}>
                <Flex gap={2}>
                    <FaRegLightbulb /> Class Overview
                </Flex>
            </Heading>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input
                    placeholder="Search classes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="filled"
                    _focus={{ bg: "white", borderColor: "blue.500" }}
                />
            </InputGroup>
            {showAlert && (
                <motion.div
                    initial={{ x: "100vw" }} // Start from the right
                    animate={{ x: 0 }} // End at the center
                    transition={{ duration: 0.5 }} // Animation duration
                    style={{ position: "fixed", top: 0, right: 0, zIndex: 1000 }} // Position the alert at the top right
                >
                    <Box
                        padding="1em"
                        marginTop="1em"
                        borderRadius="md"
                        backgroundColor={exportStatus === "success" ? "green" : "red"}
                        color="white"
                        width="540px"
                    >
                        <Flex justifyItems={'center'} gap={2} justifyContent={'space-between'}>
                            <Text>{exportMessage}</Text>
                            <CloseButton onClick={() => setShowAlert(false)} />
                        </Flex>
                    </Box>
                </motion.div>
            )}
            {currentClasses.map((classItem) => (
                <Box key={classItem.id} p={5} shadow="xl" borderWidth="1px" borderRadius="lg" bg={'white'}>
                    <HStack justify="space-between">
                        <VStack align="start">
                            <Text fontSize={classTextSize} fontWeight="bold">{classItem.name}</Text>
                            <HStack>
                                <FaUsers />
                                <Text fontSize={detailTextSize}>Students: {classItem.numberOfStudents}</Text>
                            </HStack>
                            <HStack>
                                <FaTasks />
                                <Text fontSize={detailTextSize}>Upcoming Assignments: {classItem.upcomingAssignments.length}</Text>
                            </HStack>
                        </VStack>
                        <VStack align="end">
                            <Badge cursor="pointer" colorScheme={badgeColorScheme} p={2} borderRadius="md" onClick={onOpenAct}>
                                <Flex gap={2} justifyItems={'center'} alignItems={'center'}><MdEventNote />
                                    Recent Activity
                                </Flex>
                            </Badge>
                            <Flex gap={2} justifyItems={"center"} alignItems={'center'}>
                                <Button
                                    colorScheme={buttonColorScheme}
                                    size="sm"
                                    onClick={() => handleViewDetails(classItem)}
                                    leftIcon={<MdEventNote />}
                                >
                                    View Details
                                </Button>
                                <Button onClick={exportToCSV}>Export to CSV</Button>
                                <Button
                                    colorScheme={exportStatus === "success" ? "green" : "red"}
                                    onClick={() => exportToPDF(setExportStatus, setExportMessage)}
                                >
                                    Export to PDF
                                </Button>
                            </Flex>
                        </VStack>
                    </HStack>
                </Box>
            ))}

            {/* Pagination controls */}
            {totalPages > 1 && (
                <ButtonGroup variant="outline" spacing="2" justifyContent="center">
                    <IconButton
                        icon={<ChevronLeftIcon />}
                        onClick={() => handlePageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                        aria-label="Previous page"
                    />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <Button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            isActive={currentPage === pageNumber}
                            _active={{ bg: useColorModeValue('blue.600', 'blue.200'), color: useColorModeValue('white', 'gray.800') }}
                            _hover={{ bg: useColorModeValue('blue.200', 'blue.500'), color: useColorModeValue('gray.800', 'white') }}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                    <IconButton
                        icon={<ChevronRightIcon />}
                        onClick={() => handlePageChange(currentPage + 1)}
                        isDisabled={currentPage === totalPages}
                        aria-label="Next page"
                    />
                </ButtonGroup>
            )}

            {/* Modal for class details */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom" size="2xl">
                <ModalOverlay />
                <ModalContent mx={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="xl" >
                    <ModalHeader borderBottomWidth="1px" fontWeight="bold" fontSize="lg" bg={useColorModeValue('blue.500', 'blue.600')} color="white" >
                        {selectedClass?.name}
                    </ModalHeader>
                    <ModalCloseButton size="md" color="white" />
                    <ModalBody py={4} px={3}>
                        <TableContainer>
                            <Table variant="simple" size="sm" colorScheme="blue">
                                <Thead bg={useColorModeValue('blue.50', 'blue.900')}>
                                    <Tr>
                                        <Th color={useColorModeValue('gray.600', 'blue.100')} fontSize="md" fontWeight="bold">
                                            <HStack spacing="2">
                                                <Box p="1" bg={useColorModeValue('blue.100', 'blue.700')} borderRadius="full">
                                                    <MdOutlineSubject color={useColorModeValue('gray.600', 'white')} />
                                                </Box>
                                                <Text>Attribute</Text>
                                            </HStack>
                                        </Th>
                                        <Th color={useColorModeValue('gray.600', 'blue.100')} fontSize="md" fontWeight="bold">
                                            <HStack spacing="2">
                                                <Box p="1" bg={useColorModeValue('blue.100', 'blue.700')} borderRadius="full">
                                                    <MdOutlineInfo color={useColorModeValue('gray.600', 'white')} />
                                                </Box>
                                                <Text>Details</Text>
                                            </HStack>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td fontWeight="semibold">Number of Students</Td>
                                        <Td>{selectedClass?.numberOfStudents}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight="semibold">Upcoming Assignments</Td>
                                        <Td>{selectedClass?.upcomingAssignments.length}</Td>
                                    </Tr>
                                    {/* Add more rows as needed */}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Recent activity modal */}
            <Modal isOpen={isOpenActivity} onClose={onCloseAct} isCentered motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent bg="white" borderRadius="lg" boxShadow="lg">
                    <ModalHeader bg={useColorModeValue('blue.500', 'blue.600')} color="white" p={4} borderBottomWidth="1px" borderBottomColor="gray.200">
                        Recent Activities
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={4}>
                        <RecentActivities />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </VStack>
    );
};

export default ClassOverview;