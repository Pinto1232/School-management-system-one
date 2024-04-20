import { useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Box, Flex, Button, ButtonGroup, Text } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

const useConfirmationToast = () => {
  const toast = useToast();

  const showToast = (id, onConfirm, onCancel) => {
    const toastId = toast({
      position: 'bottom',
      duration: 3500,
      render: () => (
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            x: {
              type: 'spring',
              stiffness: 900,
              damping: 12,
              repeat: 1,
              repeatType: 'reverse',
              duration: 0.15,
            },
            opacity: { duration: 0.1 },
          }}
        >
          <Box
            width="100vw"
            maxWidth="1300px"
            position="fixed"
            left="50%"
            transform="translateX(-50%)"
            bottom="10px"
            color="white"
            p={3}
            bg="red.500"
            borderRadius="md"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Box pr={2}>
                  <FaExclamationTriangle color="yellow" size="24px" />
                </Box>
                <Text>Warning: This Action Cannot Be Undone!</Text>
              </Flex>
              <ButtonGroup size="sm">
                <Button colorScheme="teal" onClick={() => onConfirm(toastId, id)}>
                  Yes
                </Button>
                <Button colorScheme="red" onClick={() => onCancel(toastId)}>
                  No
                </Button>
              </ButtonGroup>
            </Flex>
          </Box>
        </motion.div>
      ),
    });
  };

  return showToast;
};

export default useConfirmationToast;