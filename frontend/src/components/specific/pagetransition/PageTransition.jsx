import { useState, useEffect } from "react";
import { Box, Text, Spinner, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const PageTransition = ({ children, loading }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (loading) {
            setIsLoading(true);
            onOpen();
        } else {
            setIsLoading(false);
            setTimeout(() => {
                onClose();
            }, 2000); // Wait for 500ms for the animation to complete
        }
    }, [loading, onClose, onOpen]);

    return (
        <Box position="relative">
            <AnimatePresence  mode="wait">
                {isLoading && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="gray.900"
                        zIndex="overlay"
                    >
                        <Spinner color="white" size="lg" />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence  mode="wait">
                {isOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="gray.900"
                        zIndex="overlay"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text fontSize="3xl" fontWeight="bold" color="white">
                            Loading...
                        </Text>
                    </motion.div>
                )}
                <Box
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </Box>
            </AnimatePresence>
        </Box>
    );
};

export default PageTransition;
