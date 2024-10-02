import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Grid,
  Image,
  Text,
  Icon,
  CardFooter,
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Heading,
  IconButton,
  GridItem,
} from '@chakra-ui/react';
import { FaUserFriends, FaPhotoVideo, FaInfoCircle, FaVideo } from 'react-icons/fa';
import { MdOutlineTimeline, MdGroup } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { format, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import "./profile.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostActions from '../2-hero/PostActions';
import SharePost from '../2-hero/SharePost';
import "../Profile/profile.css"
import PostCard from '../Posts/Post';

// Helper function to format timestamp
const formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return 'تاريخ غير صالح'; // "Invalid Date" in Arabic
  }

  const date = new Date(timestamp);
  if (isNaN(date)) {
    return timestamp; // Return the relative string as is
  }

  const now = new Date();
  const timeDifference = now - date;

  if (timeDifference < 24 * 60 * 60 * 1000) {
    let relativeTime = formatDistanceToNow(date, { locale: ar, addSuffix: true });
    relativeTime = relativeTime
      .replace(/\s*حوالي\s*/g, '')
      .replace(/\s*تقريباً\s*/g, '')
      .replace(/\s*ساعات\s*/g, 'س')
      .replace(/\s*ساعة\s*/g, 'س')
      .replace(/\s*دقائق\s*/g, 'د')
      .replace(/\s*دقيقة\s*/g, 'د')
      .replace(/\s*أيام\s*/g, 'ي')
      .replace(/\s*يوم\s*/g, 'ي');
    return relativeTime.trim();
  }

  return format(date, "d MMMM, h:mm a", { locale: ar });
};
export default function EnhancedProfilePage() {

  const { userId } = useParams();
  console.log("userId", userId)
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  const fetchUser = async () => {
    try {
      const response = await fetch(`https://tarmeezacademy.com/api/v1/users/${userId}`);
      const result = await response.json();
      console.log("response ", response)
      setUser(result.data);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching user:', error);
      setLoading(false);
    }
  }
  const fetchAllPosts = async () => {
    try {
      // Fetch all posts from the API
      const response = await fetch(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`);
      const result = await response.json();
      console.log("response ", response)
      setPosts(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    console.log("user ", user)
  }, []);
  useEffect(() => {
    // if (!user || !user.id) {
    //   setLoading(false);
    //   return;
    // }
    fetchAllPosts();
  }, []);

  console.log("posts ", posts)
  // Display a loading spinner while fetching data
  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
const handleNavigate=()=>{
  
}
  return (
    <Box maxW="1000px" mx="auto" py={1}>
      {/* Cover Photo */}
      <Box position="relative">
        <Image
          src={user?.profile_image}
          width="100%"
          height="400px"
          objectFit="cover"
          alt="Cover Photo"
        />
        <Avatar
          src={user?.profile_image}
          size="2xl"
          position="absolute"
          bottom="-50px"
          left="20px"
          border="4px solid white"
          mb={3}
        />
      </Box>

      {/* User Info and Actions */}
      <Flex justify="space-between" mt={6} alignItems="center">
        <Box ml={4}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">{user?.name}</Text>
          <Text color="gray.500">@{user?.username || user?.name}</Text>
        </Box>
        <Button
          style={{ backgroundColor: "#3b5998", color: "#fff", fontSize: "1rem" }}
          size="sm"
          mr={4}
        >
          تعديل الملف الشخصي
        </Button>
      </Flex>

      {/* Tabs for Profile Navigation */}
      <Tabs variant="enclosed" mt={10} color="#000">
        <TabList
          display="grid"
          gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }}
          gap={4}
        >
          <Tab className='tabDetails'>
            <Icon as={MdOutlineTimeline} mr={2} /> المنشورات
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaUserFriends} mr={2} /> الأصدقاء
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaPhotoVideo} mr={2} /> الصور
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaVideo} mr={2} /> الريلز والفيديوهات
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={MdGroup} mr={2} /> المجموعات
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaInfoCircle} mr={2} /> حول
          </Tab>
        </TabList>

        <TabPanels>
          {/* Posts Tab */}
          <TabPanel>
            <Box>
              <Text fontWeight="bolder" fontSize={"20px"} mb={4}>المنشورات</Text>
              <Box className='hero'>
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <>
                    <Text className='chakra-spinner' fontWeight={"bolder"} textAlign={"center"} color={"gray.700"}>لا توجد منشورات لعرضها.</Text>
                    <div className='chakra-spinner'>
                      <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                      />
                    </div>
                  </>
                )}
              </Box>
            </Box>
          </TabPanel>

          {/* Friends Tab */}
          <TabPanel>
            <Text fontWeight="bold" mb={4}>الأصدقاء</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {/* Replace with actual friends data if available */}
              
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="">احمد محمد</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign=""> علي السيد</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="">محي الدين</Text>
              </GridItem>
              {/* Add more friends as needed */}
            </Grid>
          </TabPanel>

          {/* Photos Tab */}
          <TabPanel>
            <Text fontWeight="bold" mb={4}>الصور</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {/* Replace with actual photos data if available */}
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" alt="Photo 1" />
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" alt="Photo 2" />
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" alt="Photo 3" />
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" alt="Photo 4" />
              </GridItem>
              {/* Add more photos as needed */}
            </Grid>
          </TabPanel>

          {/* Reels and Videos Tab */}
          <TabPanel>
            <Text fontWeight="bold" mb={4}>الريلز والفيديوهات</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {/* Replace with actual reels and videos data if available */}
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" alt="Reel 1" />
                <Text mt={2}>ريلز 1</Text>
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" alt="Video 1" />
                <Text mt={2}>فيديو 1</Text>
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" alt="Reel 2" />
                <Text mt={2}>ريلز 2</Text>
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" alt="Video 2" />
                <Text mt={2}>فيديو 2</Text>
              </GridItem>
              {/* Add more reels/videos as needed */}
            </Grid>
          </TabPanel>

          {/* Groups Tab */}
          <TabPanel>
            <Text fontWeight="bold" mb={4}>المجموعات</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {/* Replace with actual groups data if available */}
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">مجموعة 1</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">مجموعة 2</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">مجموعة 3</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">مجموعة 4</Text>
              </GridItem>
              {/* Add more groups as needed */}
            </Grid>
          </TabPanel>

          {/* About Tab */}
          <TabPanel>
            <Text fontWeight="bold" mb={4}>حول</Text>
            <Box>
              <Text>الاسم: {user?.name || 'غير متوفر'}</Text>
              <Text>الوظيفة: {user?.job || 'غير متوفر'}</Text>
              <Text>الموقع: {user?.location || 'غير متوفر'}</Text>
              <Text>نبذة: {user?.bio || 'لا توجد نبذة متاحة.'}</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
