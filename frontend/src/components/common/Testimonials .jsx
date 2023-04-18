import { Box, Heading, Text, Avatar, Stack } from "@chakra-ui/react";

const Testimonials = ({ testimonials }) => {
    return (
        <Stack spacing="24px">
            {testimonials.map((testimonial) => (
                <Box key={testimonial.id} borderRadius="lg" boxShadow="lg" p={6}>
                    <Stack direction={["column", "row"]} spacing="24px">
                        <Avatar src={testimonial.avatarUrl} size="lg" />
                        <Stack>
                            <Heading size="md">{testimonial.name}</Heading>
                            <Text fontSize="lg">{testimonial.text}</Text>
                        </Stack>
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default Testimonials;
