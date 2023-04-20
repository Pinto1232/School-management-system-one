import { Box, Flex, Avatar, Heading, Text } from "@chakra-ui/react";

const TeamMember = ({ name, surname, role, imageUrl }) => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            whiteSpace="nowrap"
            justifyContent="space-between"
            maxWidth="320px"
            marginX="auto"
            marginBottom="24px"
        >
            <Avatar size="2xl" name={name} src={imageUrl} mb={4} />
            <Box textAlign="center">
                <Heading as="h3" size="lg" fontWeight="semibold" mb={2}>
                    {name} {surname}
                </Heading>
                <Text fontSize="lg" color="gray.600" mb={4}>
                    {role}
                </Text>
            </Box>
        </Flex>
    );
};

const TeamMembersSection = ({ title, teamMembersData }) => {
    return (
        <Box>
            <Heading as="h2" size="lg" mb={4}>
                {title}
            </Heading>
            <Flex
                direction={["column", null, null, "row"]}
                justifyContent="center"
                flexWrap="wrap"
            >
                {teamMembersData.map((member) => (
                    <TeamMember
                        key={member.id}
                        name={member.name}
                        surname={member.surname}
                        role={member.role}
                        imageUrl={member.imageUrl}
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default TeamMembersSection;
