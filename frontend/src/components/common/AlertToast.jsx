import { Alert, AlertIcon, AlertDescription, Box, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CloseButton } from "@chakra-ui/react";

const AlertToast = ({ status, message }) => {
    const toast = useToast();

    useEffect(() => {
        if (!status || !message) {
            console.error('Missing required props: status and message');
            return;
        }

        toast({
            position: "top-right",
            duration: 2000,
            isClosable: false,
            render: ({ onClose }) => (
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100vw" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ zIndex: 9999, backdropFilter: "blur(10px)", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <Alert status={status} borderRadius="md" width="fit-content" margin="1rem">
                        <AlertIcon />
                        <AlertDescription>{message}</AlertDescription>
                        <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
                    </Alert>
                </motion.div>
            ),
        });
    }, [status, message]);

    return null;
};

export default AlertToast;