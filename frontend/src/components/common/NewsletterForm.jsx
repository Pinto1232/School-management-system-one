import React from "react";
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import CustomButton from "./CustomButton";

const NewsletterForm = ({ namePlaceholder, emailPlaceholder, buttonText, onSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        onSubmit({
            name: formData.get("name"),
            email: formData.get("email"),
        });
    };

    return (
        <Box borderRadius="lg" borderWidth="1px" p={6}>
            <Heading size="lg" mb={4}>Sign up for our Newsletter</Heading>
            <form onSubmit={handleSubmit}>
                <Flex flexDirection="column">
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder={namePlaceholder} name="name" />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder={emailPlaceholder} name="email" />
                    </FormControl>
                    {/* <Button type="submit" mt={4}></Button> */}
                    <CustomButton type="submit" mt={4}>
                        {buttonText}
                    </CustomButton>
                </Flex>
            </form>
        </Box>
    );
};

export default NewsletterForm;
