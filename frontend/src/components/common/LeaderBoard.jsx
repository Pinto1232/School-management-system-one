import React from 'react';
import {
    Box,
    Heading,
    IconButton,
    Image,
    Stack,
    Divider,
    Button,
    Text,
    Flex,
    Icon,
} from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const LeaderBoardItem = ({ imageUrl, percentage, changeDirection }) => (
    <Flex align="center" justify="space-between" p={2}>
        <Image borderRadius="full" boxSize="50px" src={imageUrl} alt="Student" />
        <Box flex="1" px={2}>
            <Text fontSize="lg">{percentage}%</Text>
            <Icon as={changeDirection === 'up' ? FaArrowUp : FaArrowDown} />
        </Box>
    </Flex>
);

const LeaderBoard = ({ students }) => (
    <Box p={3} boxShadow="md" borderRadius="md" bg={'red'}>
        <Flex justify="space-between" align="center">
            <Heading as="h3" size="lg">Leaderboard</Heading>
            <IconButton
                aria-label="Options"
                icon={<MdMoreHoriz />}
                variant="ghost"
            />
        </Flex>
        <Stack spacing={4}>
            {students.map((student) => (
                <LeaderBoardItem
                    key={student.id}
                    imageUrl={student.imageUrl}
                    percentage={student.percentage}
                    changeDirection={student.changeDirection}
                />
            ))}
        </Stack>
        <Divider my={4} />
        <Button width="full" colorScheme="transparent" color={"white"}>
            VIEW ALL STUDENTS
        </Button>
    </Box>
);

export default LeaderBoard;