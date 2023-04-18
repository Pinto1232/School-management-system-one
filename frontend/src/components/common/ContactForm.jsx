import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Flex,
    Heading,
    useToast,
    Grid,
} from "@chakra-ui/react";

const ContactForm = ({ style }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to submit form data here
        // For example, you can use fetch or axios to send a POST request to a server endpoint
        toast({
            title: "Form submitted",
            description: "Thank you for your message!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <Grid
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            my={8}
            mx={{ base: 4, md: "auto" }}
            maxW={{ base: "90%", md: "70%", lg: "50%" }}
            p={8}
            borderRadius="lg"
            boxShadow="lg"
        >
            <Heading as="h2" mb={6} fontSize="xl">
                Contact Us
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl id="email" isRequired mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="message" isRequired mb={6}>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                        placeholder="Enter your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Submit
                </Button>
            </form>
        </Grid>
    );
};

export default ContactForm;
