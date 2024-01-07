import React from "react";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useUserContext } from "../../contexts/UserContext";

const UserProfileInfo = ({ avatarSrc }) => {
 const fontSize = "lg";
 const smallSize = "70px"
 const textColor = useColorModeValue("#fff", "#fff");
 const { user } = useUserContext();
 // Convert the file path from Windows backslashes to URL forward slashes
 const imagePath = user?.image.replace(/\\/g, '/');

 // Construct the full URL to the image
 const imageUrl = user?.image ? `http://localhost:3001/api/users/uploads/${user.image}` : undefined;

 console.log("User Profile Info", user)

 return (
   <Flex align="center" w="300px">
     <Avatar
        src={imageUrl}
        boxSize={smallSize}
        borderRadius="50%"
        objectFit="cover"
        name={user ? `${user.firstName} ${user.lastName}` : 'User'}
      />
   </Flex>
 );
};

export default UserProfileInfo;