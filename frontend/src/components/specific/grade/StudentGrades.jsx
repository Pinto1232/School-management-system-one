import React, { useState } from 'react';
import { Box, Text, VStack, HStack, Progress, Divider, Badge, Icon, Select } from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import GradeDistributionChart from './GradeDistributionChart';

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
        </VStack>
    );
};

export default StudentGrades;