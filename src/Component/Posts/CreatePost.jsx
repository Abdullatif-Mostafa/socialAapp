import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Input,
  Button,
  Textarea,
  IconButton,
  useColorModeValue,
  VStack,
  Image,
} from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';
import axios from "axios";

const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const borderColor = useColorModeValue('gray.300', 'gray.700');

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the raw file
    }
  };
// console.log("image ",image)
  // Handle post submit
  const handlePostSubmit = async () => {
    if (postText || image) {
      const formData = new FormData();
      formData.append('text', postText);
      if (image) {
        formData.append('image', image);  // Append image file
      }
      try {
        const response = await axios.post('https://tarmeezacademy.com/api/v1/posts',
         formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Post created successfully', response.data);
        setPostText('');
        setImage(null);
      } catch (error) {
        console.error('Error creating post', error);
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
