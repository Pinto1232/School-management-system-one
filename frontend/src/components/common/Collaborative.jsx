import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Button,
    VStack,
    HStack,
    Avatar,
    AvatarGroup,
    Textarea,
    useToast,
    Divider,
    Input,
    Stack,
    List,
    ListItem,
    useColorModeValue,
} from '@chakra-ui/react';

// Mockup test data for active users
const activeUsersTestData = [
    { id: 'user1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?img=1', role: 'instructor' },
    { id: 'user2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?img=2', role: 'student' },
    { id: 'user3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?img=3', role: 'student' },
];

// Mockup test data for comments
const commentsTestData = [
    { id: 'comment1', text: 'Should we add more examples here?', author: 'Alice', replies: [] },
    { id: 'comment2', text: 'I think this section could be clearer.', author: 'Bob', replies: [] },
];

// Mockup test data for revision history
const revisionHistoryTestData = [
    { id: 'rev1', content: 'Initial content of the document...', author: 'Alice', timestamp: new Date().toISOString() },
    // ... more revisions
];

const Collaborative = ({ documentId, currentUser }) => {
    const [documentContent, setDocumentContent] = useState('');
    const [activeUsers, setActiveUsers] = useState(activeUsersTestData);
    const [comments, setComments] = useState(commentsTestData);
    const [revisionHistory, setRevisionHistory] = useState(revisionHistoryTestData);
    const [isLocked, setIsLocked] = useState(false);
    const [newComment, setNewComment] = useState('');
    const toast = useToast();

    useEffect(() => {
        // Initialize real-time collaboration listeners
        // Subscribe to document changes
        // Subscribe to active user changes
        // Fetch initial document content
        // This would be replaced with actual real-time subscriptions
        const latestRevision = revisionHistoryTestData[revisionHistoryTestData.length - 1];
        setDocumentContent(latestRevision.content);
    }, [documentId]);

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setDocumentContent(newContent);
        // In a real application, you would send the update to the collaboration service here
    };

    const handleLockToggle = () => {
        setIsLocked(!isLocked);
        // In a real application, you would notify the collaboration service about the lock status here
    };

    const handleAddComment = () => {
        if (newComment.trim() === '') {
            toast({
                title: 'Cannot add empty comment',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const commentToAdd = {
            id: `comment${comments.length + 1}`,
            text: newComment,
            author: currentUser.name,
            replies: [],
        };
        setComments([...comments, commentToAdd]);
        setNewComment('');
        // In a real application, you would send the comment to the collaboration service here
    };

    const handleSaveRevision = () => {
        const newRevision = {
            id: `rev${revisionHistory.length + 1}`,
            content: documentContent,
            author: currentUser.name,
            timestamp: new Date().toISOString(),
        };
        setRevisionHistory([...revisionHistory, newRevision]);
        // Simulate sending new revision to backend service for backup
        toast({
            title: 'Revision Saved',
            description: 'A new revision has been saved and backed up.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleRevertToRevision = (revision) => {
        setDocumentContent(revision.content);
        // Simulate reverting to a previous revision and notifying other users
    };

    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const listItemBg = useColorModeValue('gray.50', 'gray.700');
    const buttonColorScheme = useColorModeValue('blue', 'orange');


    // Render the collaborative document editor
    return (
        <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="base" bg="white">
            <VStack spacing={4} align="stretch">
                <HStack justifyContent="space-between">
                    <AvatarGroup size="sm" max={3}>
                        {activeUsers.map((user) => (
                            <Avatar key={user.id} name={user.name} src={user.avatarUrl} />
                        ))}
                    </AvatarGroup>
                    {currentUser.role === 'instructor' && (
                        <Button size="sm" colorScheme={isLocked ? 'red' : 'green'} onClick={handleLockToggle}>
                            {isLocked ? 'Unlock' : 'Lock'}
                        </Button>
                    )}
                </HStack>
                <Textarea
                    value={documentContent}
                    onChange={handleContentChange}
                    isReadOnly={isLocked || currentUser.role !== 'instructor'}
                    placeholder="Start collaborating..."
                    minHeight="200px"
                />
                <Divider />
                <VStack spacing={2}>
                    {comments.map((comment) => (
                        <Box key={comment.id} p={2} borderWidth="1px" borderRadius="md" bg="gray.50">
                            <Text fontSize="sm"><strong>{comment.author}:</strong> {comment.text}</Text>
                            {/* Replies would be rendered here */}
                        </Box>
                    ))}
                </VStack>
                <Stack direction="row">
                    <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <Button size="sm" colorScheme="blue" onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </Stack>

                <Divider my={4} />
                <Text fontSize="lg" fontWeight="bold" pb={2}>Revision History</Text>
                <List spacing={2}>
                    {revisionHistory.map((revision) => (
                        <ListItem key={revision.id} p={2} borderWidth="1px" borderRadius="md" bg={listItemBg}>
                            <HStack justifyContent="space-between">
                                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.200')}>
                                    {`Revision ${revision.id} by ${revision.author} at ${new Date(revision.timestamp).toLocaleString()}`}
                                </Text>
                                <Button size="xs" colorScheme={buttonColorScheme} onClick={() => handleRevertToRevision(revision)}>
                                    Revert
                                </Button>
                            </HStack>
                        </ListItem>
                    ))}
                </List>
                <Button colorScheme={buttonColorScheme} onClick={handleSaveRevision}>Save Revision</Button>
            </VStack>
        </Box>
    );
};

export default Collaborative;