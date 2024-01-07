import React, { useState, useEffect } from "react";
import { Avatar, Flex } from "@chakra-ui/react";
import { useUserContext } from "../../contexts/UserContext";
import Axios from "axios";

const UserProfileInfo = () => {
  const [imageBlobUrl, setImageBlobUrl] = useState(null);
  const { user } = useUserContext();
  const smallSize = "70px";

  useEffect(() => {
    if (user?.image) {
      // Extract the filename from the path and construct the URL
      const filename = user.image.split('\\').pop().split('/').pop();
      const imageUrl = `http://localhost:3001/api/users/uploads/${filename}`;

      // Fetch the image blob from the server
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          setImageBlobUrl(blobUrl);
        })
        .catch((error) => {
          console.error('Error fetching image data:', error);
        });
    }
  }, [user]);


  return (
    <Flex align="center" w="300px">
      <Avatar
        src={imageBlobUrl}
        boxSize={smallSize}
        borderRadius="50%"
        objectFit="cover"
        name={user ? `${user.firstName} ${user.lastName}` : 'User'}
      />
    </Flex>
  );
};

export default UserProfileInfo;