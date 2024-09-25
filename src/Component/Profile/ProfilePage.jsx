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
  GridItem,
  Image,
  Text,
  Icon,
  Stack,
  CardFooter,
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { FaUserFriends, FaPhotoVideo, FaInfoCircle, FaVideo } from 'react-icons/fa';
import { MdOutlineTimeline, MdGroup } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { format, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import "./profile.css";

// Replace these with real image paths
const coverPhoto = '../../../public/assets/images/home.jpg';
const profilePic = '../../../public/assets/images/Screenshot 2023-12-24 192806.png';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
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
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
// console.console.log(("user" ,user));

  // Fetch posts from the API
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://tarmeezacademy.com/api/v1/posts/16354', requestOptions)
      .then(response => response.json())
      .then(result => {
        setPosts([result.data]);  // Assuming the API returns a single post in `result.data`
        setLoading(false);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box maxW="1000px" mx="auto" py={6}>
      <Box position="relative">
        <Image src={user?.profile_image || 'https://bit.ly/code-beast'} width="100%" height="400px" />
        <Avatar
          src={user?.profile_image || 'https://bit.ly/code-beast'}
          size="2xl"
          position="absolute"
          bottom="-50px"
          left="20px"
          border="4px solid white"
        />
      </Box>

      <Flex justify="space-between" mt={6} alignItems="center">
        <Box ml={4}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700"> {user?.name}</Text>
          <Text color="gray.500">@{user?.name}</Text>
        </Box>
        <Button style={{ backgroundColor: "#3b5998", color: "#fff", fontSize: "1rem" }} size="sm" mr={4}>
          تعديل الملف الشخصي
        </Button>
      </Flex>

      <Tabs variant="enclosed" mt={0} color="#000">
        <TabList display="grid" gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }} gap={4}>
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
              <Text fontWeight="bold" mb={4}>منشوراتك</Text>
              <Box className='hero'>
                {posts.map(post => (
                  <Card key={post.id} maxW='md' mb="2">
                    <CardHeader>
                      <Flex justify="space-between" width="100%">
                        <Flex gap="6px">
                          <Avatar name={post.author.name} src={post.author.profile_image} />
                          <Box>
                            <Heading size='sm'>{post.author.name}</Heading>
                            <Text fontSize="14px" className='text-muted'>{formatTimestamp(post.created_at)}</Text>
                          </Box>
                        </Flex>
                        <IconButton
                          aria-label='See menu'
                          icon={<BsThreeDotsVertical />}
                          variant='ghost'
                          colorScheme='gray'
                        />
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text>{post.body}</Text>
                    </CardBody>
                    {post.image && (
                      <Image src={post.image} alt={post.body} objectFit='cover' />
                    )}
                    <CardFooter justify='space-between'>
                      <Button variant='ghost' leftIcon={<BiLike />}>أعجبني</Button>
                      <Button variant='ghost' leftIcon={<BiChat />}>تعليق ({post.comments_count})</Button>
                      <Button variant='ghost' leftIcon={<BiShare />}>مشاركة</Button>
                    </CardFooter>
                  </Card>
                ))}
              </Box>
            </Box>
          </TabPanel>

          {/* Friends Tab */}
          <TabPanel>
            <Text fontWeight="bold" mb={4}>الأصدقاء</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {/* Add friends' avatars */}
            </Grid>
          </TabPanel>

          {/* Other Tabs */}
          {/* Add the content for other tabs like Photos, Reels, etc. */}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
