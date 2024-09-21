import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Avatar,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const stories = [
  {
    id: 1,
    name: "محمد علي",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    thumbnail: "data:image/jpeg;base64,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",
    content: "https://fb.watch/uKYvgEtKaq/",
  },
  {
    id: 2,
    name: "فاطمة خالد",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnl0knIZWE-Cf9RMtAT72EuiC2lfNvtQTGZQ&s",
    content: "https://source.unsplash.com/featured/?ocean",
  },
  {
    id: 3,
    name: "علي حسن",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQMvQWxIspwCPw7k_mgPI8I1kzVqhKWN9sQ&s",
    content: "https://source.unsplash.com/featured/?sky",
  },
];

const StoriesPage = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);

  const storyWidth = useBreakpointValue({ base: "100px", md: "140px" });
  const storyHeight = useBreakpointValue({ base: "180px", md: "240px" });

  const openStory = (index) => {
    setSelectedStoryIndex(index);
  };

  const closeStory = () => {
    setSelectedStoryIndex(null);
  };

  const nextStory = () => {
    if (selectedStoryIndex < stories.length - 1) {
      setSelectedStoryIndex((prev) => prev + 1);
    }
  };

  const prevStory = () => {
    if (selectedStoryIndex > 0) {
      setSelectedStoryIndex((prev) => prev - 1);
    }
  };

  return (
    <Box p={0} textAlign="right" bg="#f0f2f5">
      <Flex overflowX="scroll" pb={4} css={{ scrollbarWidth: "none" }}>
        {/* Box for creating a story */}
        <Box
          w={storyWidth}
          h={storyHeight}
          mr={3}
        //   bg="white"
          borderRadius="lg"
          cursor="pointer"
          border="1px solid #e4e6eb"
          textAlign="center"
        >
          <Box p={4} textAlign="center" bg={""} color="#3b5998">
            <Avatar size="md" mb={3} />
            <Text fontSize="sm" fontWeight="bold">
              أنشئ قصة
            </Text>
          </Box>
        </Box>

        {/* Display stories */}
        {stories.map((story, index) => (
          <Box
            key={story.id}
            w={storyWidth}
            h={storyHeight}
            mr={1}
            bg="white"
            borderRadius="lg"
            cursor="pointer"
            onClick={() => openStory(index)}
            position="relative"
          >
            <Image
              src={story.thumbnail}
              alt={story.name}
              borderRadius="lg"
              h="100%"
              w="100%"
              objectFit="cover"
            />
            <Box
              position="absolute"
              bottom={0}
              p={2}
              bg="rgba(0,0,0,0.6)"
              w="100%"
              borderRadius="lg"
            >
              <Flex align="center" justify="center">
                <Avatar size="xs" src={story.avatar} />
                <Text color="white" fontSize="xs" ml={2} me={2} mb={2}>
                  {story.name}
                </Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>
      {selectedStoryIndex !== null && (
        <Modal   isOpen={true} onClose={closeStory} isCentered>
          <ModalOverlay />
          <ModalContent marginTop={"40px"} maxW="400px" bg="black" color="white">
            <ModalCloseButton color="white" />
            <ModalBody p={0} position="relative">
              <Image
                src={stories[selectedStoryIndex].content}
                alt={stories[selectedStoryIndex].name}
                objectFit="cover"
                w="100%"
                h="500px"
              />
              <Text textAlign="center" mt={3}>
                {stories[selectedStoryIndex].name}
              </Text>

              {/* Navigation buttons */}
              {selectedStoryIndex > 0 && (
                <Button
                  position="absolute"
                  top="50%"
                  left="10px"
                  transform="translateY(-50%)"
                  onClick={prevStory}
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                >
                  <ChevronLeftIcon />
                </Button>
              )}
              {selectedStoryIndex < stories.length - 1 && (
                <Button
                  position="absolute"
                  top="50%"
                  right="10px"
                  transform="translateY(-50%)"
                  onClick={nextStory}
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                >
                  <ChevronRightIcon />
                </Button>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default StoriesPage;
