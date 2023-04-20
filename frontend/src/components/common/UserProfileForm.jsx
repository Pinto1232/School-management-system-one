import { Box, Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";

function UserProfileForm({ initialValues, onSubmit }) {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={6}>
                <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input type="text" {...formik.getFieldProps("name")} />
                </FormControl>

                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" {...formik.getFieldProps("email")} />
                </FormControl>

                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...formik.getFieldProps("password")} />
                </FormControl>

                <FormControl id="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...formik.getFieldProps("confirmPassword")} />
                </FormControl>

                <Button type="submit" colorScheme="blue">
                    Save
                </Button>
            </Stack>
        </form>
    );
}

export default UserProfileForm;
