import React, { useState } from 'react';
import { Box, Text, VStack, HStack, Progress, Divider, Badge, Icon, Select, Button } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, TimeIcon } from '@chakra-ui/icons';
import GradeDistributionChart from './GradeDistributionChart';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { MdSchool } from 'react-icons/md';
import { FaFileCsv } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';

// Example grade distribution data
const gradeDistributionData = {
    'A': 10,
    'B+': 15,
    'B': 20,
    'C+': 5,
    'C': 3,
    'D': 2,
    'F': 1,
};



const StudentGrades = ({ allGradeData }) => {
    const [selectedSemester, setSelectedSemester] = useState(Object.keys(allGradeData)[0]);
    const GradeData = allGradeData[selectedSemester];

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text(`Grade Report for ${GradeData.studentName}`, 10, 10);
        doc.text(`GPA: ${GradeData.GPA}`, 10, 20);
        doc.text(`Cumulative Grade: ${GradeData.cumulativeGrade}`, 10, 30);
        // Add more content as needed
        doc.save(`Grade_Report_${GradeData.studentName}_${selectedSemester}.pdf`);
    };

    const downloadCSV = () => {
        const csvData = GradeData.courses.map(course => ({
            Course: course.name,
            Grade: course.grade,
            Assessments: course.assessments.map(assessment => `${assessment.type}: ${assessment.name}, Grade: ${assessment.grade}, Due: ${assessment.dueDate}, Feedback: ${assessment.feedback}`).join('; ')
        }));
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Grade_Report_${GradeData.studentName}_${selectedSemester}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <VStack spacing={8} align="stretch">
            <Box p={6} shadow="2xl" borderWidth="1px" borderRadius="2xl" borderColor="gray.300" bgGradient="linear(to-r, blue.200, blue.100)">
                <Text fontSize="3xl" fontWeight="extrabold" color="blue.900">Grade Overview</Text>
                <Text fontSize="xl" fontWeight="bold" mt={3} color="blue.800">{GradeData.studentName}</Text>
                <HStack justify="space-between" mt={4}>
                    <Badge colorScheme="green" px={3} py={1} borderRadius="full" fontSize="md">GPA: {GradeData.GPA}</Badge>
                    <Badge colorScheme="green" px={3} py={1} borderRadius="full" fontSize="md">Cumulative: {GradeData.cumulativeGrade}</Badge>
                </HStack>
            </Box>
            <Box p={6} shadow="2xl" borderWidth="1px" borderRadius="2xl" borderColor="gray.300" bg="white">
                <Text fontSize="2xl" fontWeight="bold" mb={4}>Grade Distribution</Text>
                <GradeDistributionChart distributionData={gradeDistributionData} />
            </Box>
            <Box p={4}>
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    <Icon as={MdSchool} mr={2} /> Grade/Semester
                </Text>
                <Select placeholder="Select semester" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                    {Object.keys(allGradeData).map((semester) => (
                        <option key={semester} value={semester}>{semester}</option>
                    ))}
                </Select>
            </Box>
            {GradeData.courses.map((course) => (
                <Box key={course.name} p={6} shadow="2xl" borderWidth="1px" borderRadius="2xl" borderColor="gray.300" bg="white" width="100%">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">{course.name}</Text>
                    <Text fontSize="lg" fontWeight="medium" color="gray.600" mt={2}>Course Grade: <Badge colorScheme="blue" ml={1}>{course.grade}</Badge></Text>
                    <Divider my={4} borderColor="gray.400" />
                    <VStack spacing={5} width="100%">
                        {course.assessments.map((assessment) => (
                            <HStack key={assessment.name} justify="space-between" p={4} borderWidth="1px" borderRadius="lg" borderColor="gray.300" bg="gray.50" transition="background-color 0.2s" width="100%">
                                <VStack align="start" spacing={2} width="100%">
                                    <HStack width="100%">
                                        <Icon as={assessment.submitted ? CheckCircleIcon : TimeIcon} color={assessment.submitted ? "green.500" : "yellow.500"} />
                                        <Text fontSize="lg" fontWeight="semibold" flex="1">{assessment.type}: {assessment.name}</Text>
                                    </HStack>
                                    <Text fontSize="sm" color="gray.600">Due: {assessment.dueDate}</Text>
                                    <Text fontSize="sm" color="gray.600">Feedback: {assessment.feedback}</Text>
                                </VStack>
                                <Box textAlign="right">
                                    <Text fontSize="lg" fontWeight="bold" color={assessment.submitted ? "green.500" : "yellow.600"}>Grade: {assessment.grade}</Text>
                                    <Progress value={assessment.submitted ? 100 : 50} size="sm" colorScheme={assessment.submitted ? "green" : "yellow"} borderRadius="md" />
                                </Box>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            ))}
            <Box display="flex" justifyContent="space-between" p={4}>
                <Button onClick={downloadPDF} colorScheme="teal" leftIcon={<Icon as={FaFilePdf} />}>
                    Download PDF
                </Button>
                <Button onClick={downloadCSV} colorScheme="teal" leftIcon={<Icon as={FaFileCsv} />}>
                    Download CSV
                </Button>
            </Box>
        </VStack>
    );
};

export default StudentGrades;