import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Box,
  Textarea,
} from "@chakra-ui/react";

const MultiToggleForm = () => {
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);

  const handleToggleForm1 = () => setShowForm1(!showForm1);
  const handleToggleForm2 = () => setShowForm2(!showForm2);
  const handleToggleForm3 = () => setShowForm3(!showForm3);

  return (
    <Box>
      <Button onClick={handleToggleForm1}>Items1</Button>
      <Button onClick={handleToggleForm2}>Items2</Button>
      <Button onClick={handleToggleForm3}>Items3</Button>

      {showForm1 && (
        <FormControl>
          <FormLabel>Form 1</FormLabel>
          <Input type="text" />
          <FormHelperText>Enter form 1 details</FormHelperText>
        </FormControl>
      )}

      {showForm2 && (
        <FormControl>
          <FormLabel>Form 2</FormLabel>
          <Textarea />
          <FormHelperText>Enter form 2 details</FormHelperText>
        </FormControl>
      )}

      {showForm3 && (
        <FormControl>
          <FormLabel>Form 3</FormLabel>
          <Input type="number" />
          <FormHelperText>Enter form 3 details</FormHelperText>
        </FormControl>
      )}
    </Box>
  );
};

export default MultiToggleForm;
