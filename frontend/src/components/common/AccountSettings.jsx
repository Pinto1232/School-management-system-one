import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import InputFieldComponent from "./InputFieldComponent";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const AccountSettings = ({ user, onSave, onCancel }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    onSave();
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <Heading mb={6}>Account Settings</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name">
            <InputFieldComponent
              defaultValue={user.name}
              placeholder="name"
              icon={FaUser}
              type="text"
            />
          </FormControl>
          <FormControl id="email">
            <InputFieldComponent
              defaultValue={user.email}
              placeholder="email"
              icon={FaEnvelope}
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <InputFieldComponent
              placeholder="password"
              icon={FaLock}
              type="password"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Save Changes
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AccountSettings;
