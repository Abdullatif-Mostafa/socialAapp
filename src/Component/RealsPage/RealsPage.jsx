import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Avatar,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import { FaHeart, FaComment, FaShareAlt, FaBookmark } from 'react-icons/fa';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';

// Sample reels data with more videos
const initialReelsData = [
  {
    id: 1,
    user: 'سارة خالد',
    avatar: 'https://via.placeholder.com/50',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 120,
    comments: 45,
  },
  {
    id: 2,
    user: 'أحمد نور',
    avatar: 'https://via.placeholder.com/50',
    video: 'https://www.w3schools.com/html/movie.mp4',
    likes: 90,
    comments: 25,
  },
  {
    id: 3,
    user: 'محمد عبد الله',
    avatar: 'https://via.placeholder.com/50',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 250,
    comments: 60,
  },
  {
    id: 4,
    user: 'هند علي',
    avatar: 'https://via.placeholder.com/50',
    video: 'https://www.w3schools.com/html/movie.mp4',
    likes: 320,
    comments: 75,
  },
  // Add more reels data
];

const ReelsPage = () => {
  const [reels, setReels] = useState(initialReelsData);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load more reels when scrolling near the bottom of the page
  const loadMoreReels = () => {
    setLoading(true);
    setTimeout(() => {
      setReels((prevReels) => [
        ...prevReels,
        ...initialReelsData.map((reel) => ({
          ...reel,
          id: prevReels.length + reel.id,
        })),
      ]);
      setLoading(false);
    }, 1500);
  };

  // Infinite scroll functionality
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMoreReels();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mute/unmute
  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  return (
    <Box maxW="100vw" mx="auto" py={4} px={4}>
      <Flex direction="column" align="center" overflowY="scroll" bg={''} height="100vh">
        {reels.map((reel) => (
          <ReelCard

            key={reel.id}
            reel={reel}
            muted={muted}
            onMuteToggle={handleMuteToggle}
          />
        ))}

        {loading && <Spinner size="xl" color="teal.500" mt={6} />}
      </Flex>
    </Box>
  );
};

const ReelCard = ({ reel, muted, onMuteToggle }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      mb={6}
      p={4}
      bg="gray.900"
      borderRadius="md"
      boxShadow="xl"
      width={{ base: '100%', md: '80%', lg: '60%' }} // Responsive width
      minHeight="75vh" // Video height set to 75vh
      overflow="hidden"
      mx="auto"
      transition="all 0.3s ease"
      _hover={{ transform: 'scale(1.0022)' }} // Add a slight hover effect
    >
      <video
        src={reel.video}
        autoPlay
        loop
        muted={muted}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />

      <IconButton
        icon={muted ? <MdVolumeOff /> : <MdVolumeUp />}
        onClick={onMuteToggle}
        position="absolute"
        top="10px"
        right="10px"
        colorScheme="teal"
        bg="rgba(0, 0, 0, 0.5)"
        borderRadius="full"
      />

      <Flex
        alignItems="center"
        position="absolute"
        bottom="10px"
        left="10px"
        zIndex="1"
      >
        <Avatar src={reel.avatar} size="md" mr={3} />
        <Text color="white" fontSize="lg" fontWeight="bold">
          {reel.user}
        </Text>
      </Flex>

      <Stack
        direction="row"
        position="absolute"
        bottom="10px"
        right="10px"
        zIndex="1"
        spacing={3}
      >
        <IconButton
          icon={<FaHeart />}
          aria-label="Like"
          colorScheme="red"
          variant="ghost"
          bg="rgba(0, 0, 0, 0.5)"
        />
        <IconButton
          icon={<FaComment />}
          aria-label="Comment"
          colorScheme="blue"
          variant="ghost"
          bg="rgba(0, 0, 0, 0.5)"
        />
        <IconButton
          icon={<FaShareAlt />}
          aria-label="Share"
          colorScheme="teal"
          variant="ghost"
          bg="rgba(0, 0, 0, 0.5)"
        />
        <IconButton
          icon={<FaBookmark />}
          aria-label="Save"
          colorScheme="yellow"
          variant="ghost"
          bg="rgba(0, 0, 0, 0.5)"
        />
      </Stack>

      <Flex
        position="absolute"
        bottom="50px"
        left="10px"
        zIndex="1"
        color="white"
        fontSize="sm"
      >
        <Text>{reel.likes} إعجابات</Text>
        <Text ml={4}>{reel.comments} تعليقات</Text>
      </Flex>
    </Flex>
  );
};

export default ReelsPage;
