import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Avatar,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaUserPlus, FaComment } from 'react-icons/fa';
import { MdPersonAddDisabled } from 'react-icons/md';

const friendsList = [
  { name: 'محمد علي', avatar: 'https://bit.ly/code-beast', isFriend: true },
  { name: 'يوسف خالد', avatar: 'https://bit.ly/dan-abramov', isFriend: false },
  { name: 'أحمد نور', avatar: 'https://bit.ly/ryan-florence', isFriend: true },
  { name: 'علي حسن', avatar: 'https://bit.ly/kent-c-dodds', isFriend: false },
  { name: 'Ahmed Nader', avatar: 'https://bit.ly/sage-adebayo', isFriend: false },
  { name: ' Mido', avatar: 'https://bit.ly/prosper-baba', isFriend: true },
  { name: 'Tarek Hassan', avatar: 'https://bit.ly/prosper-baba', isFriend: true },

];

export default function FriendsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFriends = friendsList.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box maxW="1200px" mx="auto" py={6} px={4} color={'#333'}>
      {/* Heading */}
      <Heading fontSize={useBreakpointValue({ base: '2xl', md: '4xl' })} mb={6} textAlign="center">
        الأصدقاء
      </Heading>

      {/* Search Bar */}
      <Flex mb={6} justifyContent="center"  
      style={{border:"1px solid ##319795"}}>
        <Input
          placeholder="ابحث عن أصدقاء..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="500px"
          variant="filled"
          borderRadius="md"
          size="lg"
          bg={"#fff"}   
        //   focusBorderColor="teal.400"
          border="teal.400"
        />
      </Flex>

      {/* Friends Grid */}
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        {filteredFriends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))}
      </Grid>
    </Box>
  );
}

function FriendCard({ friend }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md" textAlign="center" bg="white">
      <Avatar size="xl" src={friend.avatar} mb={4} />
      <Text fontWeight="bold" fontSize="lg" mb={2}>
        {friend.name}
      </Text>

      <Stack direction="row" justify="center" spacing={4} mt={4}>
        {friend.isFriend ? (
          <>
            <Button leftIcon={<FaComment />} colorScheme="teal" size="sm">
              رسالة
            </Button>
            <IconButton
              aria-label="Unfriend"
              icon={<MdPersonAddDisabled />}
              colorScheme="red"
              size="sm"
              variant="outline"
              title="حذف صديق"
            />
          </>
        ) : (
          <Button leftIcon={<FaUserPlus />} colorScheme="blue" size="sm">
            إضافة صديق
          </Button>
        )}
      </Stack>
    </Box>
  );
}
