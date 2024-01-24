import React, { useState } from 'react';
import { Box, Image, Text, Input, Button, VStack, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, InputGroup, InputLeftElement, Icon, Heading, Flex, IconButton } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { FaChevronLeft, FaChevronRight, FaSearch, FaUsersCog } from 'react-icons/fa';

const StudentRoster = ({ studentsRoastData }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('black', 'white');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filter, setFilter] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(studentsRoastData);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);
        const filtered = studentsRoastData.filter(student =>
            student.name.toLowerCase().includes(value) ||
            student.contactInformation.toLowerCase().includes(value)
        );
        setFilteredStudents(filtered);
    };

    const downloadPDF = async () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
        });
    
        // Define the columns for the table
        const columns = [
            { header: 'Profile Picture', dataKey: 'profilePicture' },
            { header: 'Name', dataKey: 'name' },
            { header: 'Contact Information', dataKey: 'contactInformation' },
            { header: 'Age', dataKey: 'age' },
            { header: 'Class', dataKey: 'class' },
            { header: 'Course', dataKey: 'course' },
        ];
    
        // Convert images to base64
        const loadImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new window.Image();
                img.crossOrigin = 'Anonymous'; // This should be enough for services that support CORS
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/jpeg');
                    resolve(dataURL);
                };
                img.onerror = () => {
                    reject(new Error(`Could not load image at ${url}`));
                };
                img.src = url;
            });
        };
    
        const base64Images = await Promise.all(
            studentsRoastData.map((student) => loadImage(student.profilePicture))
        ).then((images) => {
            return images.map((img) => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                return canvas.toDataURL('image/jpeg');
            });
        });
    
        // Map through the students data to format it for the table
        const tableData = studentsRoastData.map((student, index) => ({
            profilePicture: base64Images[index], // Base64 image data
            name: student.name,
            contactInformation: student.contactInformation,
            age: student.age,
            class: student.class,
            course: student.course,
        }));
    
        // Add the table to the PDF
        pdf.autoTable({
            columns: columns,
            body: tableData,
            willDrawCell: (data) => {
                if (data.column.dataKey === 'profilePicture' && data.cell.section === 'body') {
                    const img = data.cell.raw;
                    if (img) {
                        const dim = pdf.getImageProperties(img);
                        const imgHeight = dim.height * (data.cell.width / dim.width);
                        const yPos = data.cell.y + (data.cell.height - imgHeight) / 2;
                        pdf.addImage(img, 'JPEG', data.cell.x, yPos, data.cell.width, imgHeight);
                    }
                }
            },
            styles: { cellWidth: 'wrap' },
            columnStyles: {
                profilePicture: { cellWidth: 20 },
            },
        });
    
        // Save the PDF
        pdf.save('students.pdf');
    };

    const headingSize = "md"; // or any other appropriate value


    return (
        <>
            <Heading as="h2" size={headingSize} mb={4}>
                <Flex gap={2} p={5}>
                    <FaUsersCog /> Student Roster
                </Flex>
            </Heading>
            <VStack spacing={4} align="stretch">
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={FaSearch} color="gray.500" />}
                    />
                    <Input
                        placeholder="Filter students..."
                        value={filter}
                        onChange={handleFilterChange}
                        size="lg"
                        variant="filled"
                        focusBorderColor="teal.400"
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        borderRadius="0"
                    />
                </InputGroup>
            </VStack>
            <Box display="flex" flexDirection="column" mb={5} p={5} bg={'gray.200'}>
                <Table boxShadow="2xl" id="studentsTable" variant="simple" colorScheme="yellow" size="md" w="full" overflowX="auto">
                    <Thead>
                        <Tr>
                            <Th bg="black" color="white" fontWeight="bold" px={4} py={2}>Profile Picture</Th>
                            <Th bg="black" color="white" fontWeight="bold" px={4} py={2}>Name</Th>
                            <Th bg="black" color="white" fontWeight="bold" px={4} py={2}>Contact Information</Th>
                            <Th bg="black" color="white" fontWeight="bold" px={4} py={2}>Age</Th>
                            <Th bg="black" color="white" fontWeight="bold" px={4} py={2}>Class</Th>
                            <Th bg="black" color="white" fontWeight="bold" px={4} py={2}>Course</Th>
                        </Tr>
                    </Thead>
                    <Tbody cursor={'pointer'}>
                        {filteredStudents.map((student, index) => (
                            <Tr key={student.id} bg={index % 2 === 0 ? bgColor : 'gray.200'} color={color} _hover={{ bg: 'gray.100' }} onClick={() => { setSelectedStudent(student); onOpen(); }}>
                                <Td><Image borderRadius="full" src={student.profilePicture} alt={student.name} boxSize="50px" objectFit="cover" /></Td>
                                <Td>{student.name}</Td>
                                <Td>{student.contactInformation}</Td>
                                <Td>{student.age}</Td>
                                <Td>{student.class}</Td>
                                <Td>{student.course}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Flex justifyContent="space-between" mt={4}>
                    <Box>
                        <Button onClick={downloadPDF} alignSelf="flex-start" mt={2}>Download PDF</Button>
                    </Box>
                    <Box>
                        <IconButton
                            icon={<FaChevronLeft />}
                            onClick={handlePrevPage}
                            isDisabled={currentPage <= 1}
                            mr={2}
                        />
                        <IconButton
                            icon={<FaChevronRight />}
                            onClick={handleNextPage}
                            isDisabled={currentPage >= totalPages}
                        />
                    </Box>
                </Flex>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedStudent?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={selectedStudent?.profilePicture} alt={selectedStudent?.name} boxSize="100px" objectFit="cover" />
                        <Text>{selectedStudent?.contactInformation}</Text>
                        <Text>Age: {selectedStudent?.age}</Text>
                        <Text>Class: {selectedStudent?.class}</Text>
                        <Text>Course: {selectedStudent?.course}</Text>
                        {/* Add more details as needed */}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default StudentRoster;