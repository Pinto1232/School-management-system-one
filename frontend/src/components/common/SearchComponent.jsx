import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

const SearchComponent = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching...");
    console.log(`Name: ${name}, Gender: ${gender}, Email: ${email}`);
  };

  return (
    <Box p={4} boxShadow="md" borderRadius="md">
      <Flex direction={["column", "row"]} alignItems="flex-end" justifyContent="space-between">
        <FormControl mr={4}>
          <Input
            type="text"
            placeholder="Search by Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mr={4}>
          <Select
            placeholder="Search by Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <FormControl mr={4}>
          <Input
            type="email"
            placeholder="Search by Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="md"
         /*  borderRadius="full" */
          px={8}
          py={4}
          fontSize="lg"
          fontWeight="bold"
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchComponent;
