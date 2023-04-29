import { Flex, Heading, VStack, Checkbox, CheckboxGroup } from "@chakra-ui/react";

const UserRoles = ({ roles, activeRole, onRoleChange }) => {
    return (
        <Flex flexDirection="column">
            <Heading as="h3" size="md" mb={2}>
                User Roles
            </Heading>
            <CheckboxGroup colorScheme="blue" defaultValue={activeRole} onChange={onRoleChange}>
                <VStack alignItems="flex-start">
                    <Checkbox value="admin">Admin</Checkbox>
                    <Checkbox value="moderator">Moderator</Checkbox>
                    <Checkbox value="user">User</Checkbox>
                </VStack>
            </CheckboxGroup>
        </Flex>
    );
};

export default UserRoles;
