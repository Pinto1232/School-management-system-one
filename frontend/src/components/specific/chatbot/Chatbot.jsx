import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

const Chatbot = ({ messages, onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        onSendMessage(inputValue);
        setInputValue('');
    };

    return (
        <Box
            bg='white'
            boxShadow='md'
            borderRadius='md'
            overflow='hidden'
            w={{ base: '100%', md: '400px' }}
            mx='auto'
            mt={8}
        >
            <Flex bg='blue.500' color='white' px={4} py={2} alignItems='center'>
                <Box flex={1} textAlign='center' fontWeight='bold'>
                    PintoEdu Chatbot
                </Box>
            </Flex>
            <Box maxHeight='300px' overflowY='scroll' p={4}>
                {messages.map((message, index) => (
                    <Text key={index} color={message.user ? 'black' : 'white'}>
                        {message.type === 'text' && message.text}
                        {message.type === 'button' &&
                            message.buttons.map((button) => (
                                <BotButton key={button.payload} payload={button.payload}>
                                    {button.label}
                                </BotButton>
                            ))}
                    </Text>
                ))}
            </Box>
            <Flex bg='gray.100' p={2}>
                <Input
                    placeholder='Type a message'
                    value={inputValue}
                    onChange={handleInputChange}
                    mr={2}
                    flex={1}
                    color='black'
                />
                <Button
                    colorScheme='blue'
                    onClick={handleSendMessage}
                    disabled={!inputValue}
                    color='black'
                >
                    <IoIosSend />
                </Button>
            </Flex>
        </Box>
    );
};

Chatbot.propTypes = {
    messages: PropTypes.array.isRequired,
    onSendMessage: PropTypes.func.isRequired,
};

export default Chatbot;
