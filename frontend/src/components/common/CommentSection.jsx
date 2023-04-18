import React from "react";
import { Box, Textarea, Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CommentSection = ({ onSubmit }) => {
    const { handleSubmit, register } = useForm();

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} direction="column">
                <Textarea
                    resize="none"
                    placeholder="Leave a comment..."
                    {...register("comment", { required: true })}
                />
                <Button type="submit" colorScheme="blue" size="sm">
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default CommentSection;
