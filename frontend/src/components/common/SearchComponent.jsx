import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchComponent = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    console.log("Searching...");
    console.log(`Name: ${name}, Gender: ${gender}, Email: ${email}`);
  };

  return (
    <Box p={6} boxShadow="2xl"  bg="white">
      <Flex direction={["column", "row"]} alignItems="center" justifyContent="space-between">
        <FormControl mr={4}>
          <Input
            type="text"
            placeholder="Search by Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg="gray.200"
            borderRadius="lg"
          />
        </FormControl>

        <FormControl mr={4}>
          <Select
            placeholder="Search by Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            bg="gray.200"
            borderRadius="lg"
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
            bg="gray.200"
            borderRadius="lg"
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="md"
          px={9}
          py={4}
          fontSize="md"
          fontWeight="bold"
          _hover={{ bg: "teal.600" }}
          _active={{ bg: "teal.700" }}
          onClick={handleSearch}
          leftIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchComponent;
