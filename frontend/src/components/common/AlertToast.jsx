import { Alert, AlertIcon, AlertDescription, Box, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

const TRANSITION_STIFFNESS = 300;
const TRANSITION_DAMPING = 30;

const toastStyles = {
    zIndex: 9999,
    backdropFilter: "blur(10px)",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const AlertToast = ({ status, message }) => {
    const toast = useToast();

    useEffect(() => {
        if (!status || !message) {
            console.error('Missing required props: status and message');
            return;
        }

        toast({
            position: "bottom-right",
            duration: 2000,
            isClosable: true,
            render: ({ onClose }) => (
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100vw" }}
                    transition={{ type: "spring", stiffness: TRANSITION_STIFFNESS, damping: TRANSITION_DAMPING }}
                    style={toastStyles}
                >
                    <Alert status={status} borderRadius="md" width="fit-content" margin="1rem">
                        <AlertIcon />
                        <AlertDescription>{message}</AlertDescription>
                        <Button onClick={onClose} position="absolute" right="8px" top="8px">
                            Close
                        </Button>
                    </Alert>
                </motion.div>
            ),
        });
    }, [status, message]);

    return null;
};

export default AlertToast;