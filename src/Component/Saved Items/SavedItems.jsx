import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Input,
  Stack,
  Select,
  Avatar,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTrashAlt, FaBookmark, FaSearch } from 'react-icons/fa';
import "./saved items.css";

const savedItemsData = [
  {
    id: 1,
    type: 'video',
    title: 'فيديو ترفيهي رائع',
    description: 'شاهد هذا الفيديو الممتع والمفيد.',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg', // Replaced with a real video thumbnail
    user: 'أحمد علي',
    avatar: 'https://i.pravatar.cc/50?img=3', // Example avatar
    date: 'قبل يومين',
  },
  {
    id: 2,
    type: 'photo',
    title: 'صورة رائعة',
    description: 'هذه الصورة ملتقطة من أعلى الجبل.',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVl0krf48WhFdoHYQ-MiL01BBWLd2i7jfItA&s', // Real mountain photo
    user: 'سارة خالد',
    avatar: 'https://i.pravatar.cc/50?img=5', // Example avatar
    date: 'قبل أسبوع',
  },
  {
    id: 3,
    type: 'link',
    title: 'مقالة مثيرة للاهتمام',
    description: 'اقرأ هذا المقال الجديد عن التكنولوجيا.',
    thumbnail: 'https://www.tech-mag.net/techmag/uploads/2023/07/Types-of-Communication-Technology.webp', // Tech-related article image
    user: 'هند عبدالله',
    avatar: 'https://i.pravatar.cc/50?img=6', // Example avatar
    date: 'قبل شهر',
  },
  // Add more saved items here...
];

const SavedItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const bgColor = useColorModeValue('white', 'gray.800');

  // Filter and search logic
  const filteredItems = savedItemsData.filter((item) => {
    return (
      (filter === 'all' || item.type === filter) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box maxW="100vw" mx="auto" py={6} px={4} color={"#000"}>
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        العناصر المحفوظة
      </Heading>
      {/* Search and Filter Section */}
      <Flex justify="space-between" mb={6} alignItems="center" wrap="wrap">
        <Input
          placeholder="ابحث في العناصر المحفوظة"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width={['100%', '300px']}
          variant="filled"
          bg="white"
          icon={<FaSearch />}
          _focus={{ bg: 'white' }}
          mb={[4, 0]}
        />
        <Select
          width={['100%', '200px']}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          bg="gray.100"
          cursor={"pointer"}
          _focus={{ bg: 'white' }}
        >
          <option style={{cursor:"pointer"}} value="all">الكل</option>
          <option style={{cursor:"pointer"}} value="video">الفيديوهات</option>
          <option style={{cursor:"pointer"}} value="photo">الصور</option>
          <option style={{cursor:"pointer"}} value="link">الروابط</option>
        </Select>
      </Flex>

      {/* Tabs Section */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab className='tabDetails'>الكل</Tab>
          <Tab className='tabDetails'>الفيديوهات</Tab>
          <Tab className='tabDetails'>الصور</Tab>
          <Tab className='tabDetails'>الروابط</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Grid layout for all items */}
            <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap={6}>
              {filteredItems.map((item) => (
                <SavedItemCard key={item.id} item={item} bgColor={bgColor} />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            {/* Grid layout for videos */}
            <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap={6}>
              {filteredItems
                .filter((item) => item.type === 'video')
                .map((item) => (
                  <SavedItemCard key={item.id} item={item} bgColor={bgColor} />
                ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            {/* Grid layout for photos */}
            <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap={6}>
              {filteredItems
                .filter((item) => item.type === 'photo')
                .map((item) => (
                  <SavedItemCard key={item.id} item={item} bgColor={bgColor} />
                ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            {/* Grid layout for links */}
            <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap={6}>
              {filteredItems
                .filter((item) => item.type === 'link')
                .map((item) => (
                  <SavedItemCard key={item.id} item={item} bgColor={bgColor} />
                ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const SavedItemCard = ({ item, bgColor }) => {
  return (
    <Flex
      direction="column"
      bg={bgColor}
      boxShadow="md"
      borderRadius="md"
      p={4}
      align="center"
      transition="all 0.3s"
      _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
    >
      <Image src={item.thumbnail} alt={item.title} borderRadius="md" />
      <Flex align="center" mt={4}>
        <Avatar src={item.avatar} size="sm" mr={3} mb={3} me={2} />
        <Text fontSize="md" fontWeight="bold">
          {item.user}
        </Text>
      </Flex>
      <Text mt={2} fontSize="lg" fontWeight="bold" textAlign="center">
        {item.title}
      </Text>
      <Text fontSize="sm" textAlign="center" color="gray.500">
        {item.description}
      </Text>
      <Text fontSize="xs" textAlign="center" color="gray.400">
        {item.date}
      </Text>

      <Stack direction="row" mt={4} spacing={4}>
        <Button colorScheme="red" leftIcon={<FaTrashAlt />} variant="outline">
          حذف
        </Button>
        <Button colorScheme="blue" leftIcon={<FaBookmark />} variant="solid">
          مشاهدة
        </Button>
      </Stack>
    </Flex>
  );
};

export default SavedItemsPage;
