import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Input,
  Button,
  IconButton,
  useColorModeValue,
  VStack,
  Image,
  useToast,  // Import useToast
} from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';

const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  const toast = useToast(); // Initialize the toast

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the raw file
    }
  };

  const handlePostSubmit = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    if (postText || image) {
      // Prepare the form data
      let formData = new FormData();
      formData.append('body', postText);
      if (image) {
        formData.append('image', image);  // Append the image file
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };

      try {
        // Make the POST request using fetch
        const response = await fetch('https://tarmeezacademy.com/api/v1/posts', requestOptions);

        // Check if the request was successful
        if (!response.ok) {
          const errorData = await response.json(); // Get the error message
          throw new Error(errorData.message || 'Error creating post'); // Throw the error with message
        }

        const data = await response.json();
        console.log('Post created successfully:', data);

        // Show success toast
        toast({
          title: "Post Created",
          description: "Your post has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Reset state after successful post creation
        setPostText('');
        setImage(null);
      } catch (error) {
        console.error('Error creating post:', error.message);

        // Show error toast
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      w=""
      p={4}
      mb={2}
      bg={bgColor}
      boxShadow="md"
      borderBottom={`1px solid ${borderColor}`}
      zIndex="999"
    >
      <Flex align="center" mb={4} maxW="600px" mx="auto" cursor={'pointer'}>
        <Avatar src="https://bit.ly/broken-link" size="md" mr={4} me={1} />
        <Input
          placeholder="ماذا يخطر ببالك؟"
          variant="outline"
          value={postText}
          textAlign={"start"}
          onChange={(e) => setPostText(e.target.value)}
          flex="1"
          borderRadius="full"
          color={textColor}
          bg={bgColor}
          borderColor={borderColor}
          _hover={{ borderColor: 'blue.400' }}
          _focus={{ borderColor: 'blue.400' }}
        />
      </Flex>
      <VStack spacing={4} align="stretch" maxW="600px" mx="auto">
        {image && (
          <Image
            src={URL.createObjectURL(image)} // Show the selected image
            alt="الصورة المحملة"
            maxH="400px"
            objectFit="cover"
            borderRadius="md"
            cursor={'pointer'}
          />
        )}
        <Flex justify="space-between">
          <IconButton
            icon={<FaImage />}
            aria-label="رفع صورة"
            as="label"
            htmlFor="image-upload"
            cursor="pointer"
            size="lg"
            colorScheme="blue"
            variant="ghost"
          />
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            display="none"
            onChange={handleImageUpload}
          />
          <Button
            colorScheme="blue"
            onClick={handlePostSubmit}
            borderRadius="full"
            isDisabled={!postText && !image}
          >
            نشر
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default CreatePost;
