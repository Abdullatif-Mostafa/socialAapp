import React from 'react';
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
import "./profile.css"

// Placeholder images
const coverPhoto = '../../../public/assets/images/home.jpg';
const profilePic = '../../../public/assets/images/Screenshot 2023-12-24 192806.png';

const posts=[
    {
      "id": 29268,
      "title": "this is the title",
      "body": "this is the body 6",
      "author": {
        "id": 14509,
        "profile_image": {

        },
        "is_fake": 0,
        "username": "Issam",
        "name": "Nader",
        "email": null,
        "email_verified_at": null,
        "remember_token": null,
        "created_at": "2024-08-22T18:36:41.000000Z",
        "updated_at": "2024-08-22T18:36:41.000000Z"
      },
      "image": "http://tarmeezacademy.com/images/posts/okj1KxKj61oWzeB.jpg",
      "tags": [],
      "created_at": "23 seconds ago",
      "comments_count": 0
    },
    {
        "id": 29264,
        "title": "dsfds",
        "body": "sfdfd",
        "author": {
          "id": 14400,
          "profile_image": {
  
          },
          "is_fake": 0,
          "username": "Youssef2001@gmail.com",
          "name": "Youssef",
          "email": "Joo123456@gmail.com",
          "email_verified_at": null,
          "remember_token": null,
          "created_at": "2024-08-20T15:23:26.000000Z",
          "updated_at": "2024-08-20T15:23:26.000000Z"
        },
        "image": {
  
        },
        "tags": [],
        "created_at": "1 hour ago",
        "comments_count": 0
      },
      {
        "id": 29263,
        "title": null,
        "body": "this is the body",
        "author": {
          "id": 14826,
          "profile_image": {
  
          },
          "is_fake": 0,
          "username": "ahmed fisal200",
          "name": "ahmeaaaaaaaaaaaad@",
          "email": "ahmed.44@testewffsg",
          "email_verified_at": null,
          "remember_token": null,
          "created_at": "2024-08-28T02:36:31.000000Z",
          "updated_at": "2024-08-28T02:36:31.000000Z"
        },
        "image": "http://tarmeezacademy.com/images/posts/kuzVxpQTBpqnscL.jpg",
        "tags": [],
        "created_at": "1 hour ago",
        "comments_count": 1
      },
    {
      "id": 29267,
      "title": "this is the title",
      "body": "this is the body 6",
      "author": {
        "id": 14509,
        "profile_image": {

        },
        "is_fake": 0,
        "username": "Issam",
        "name": "Nader",
        "email": null,
        "email_verified_at": null,
        "remember_token": null,
        "created_at": "2024-08-22T18:36:41.000000Z",
        "updated_at": "2024-08-22T18:36:41.000000Z"
      },
      "image": "http://tarmeezacademy.com/images/posts/DJiEd5kSgC64tkH.jpg",
      "tags": [],
      "created_at": "39 seconds ago",
      "comments_count": 0
    }
    
]
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
  console.log("timestamp ",timestamp)
    // If it's within the last 24 hours, display "X minutes/hours ago"
    const now = new Date();
    const timeDifference = now - date;

    // Less than a day ago
    if (timeDifference < 24 * 60 * 60 * 1000) {
      let relativeTime = formatDistanceToNow(date, { locale: ar, addSuffix: true });
      // استبدال النصوص الطويلة بالنصوص المختصرة باستخدام تعبيرات منتظمة للتأكد من مطابقة أفضل
      relativeTime = relativeTime
        .replace(/\s*حوالي\s*/g, '') // إزالة "حوالي" مع أي فراغات
        .replace(/\s*تقريباً\s*/g, '') // إزالة "تقريباً" مع أي فراغات
        .replace(/\s*ساعات\s*/g, 'س')  // استبدال "ساعات" بـ "س" مع أي فراغات
        .replace(/\s*ساعة\s*/g, 'س')   // استبدال "ساعة" بـ "س"
        .replace(/\s*دقائق\s*/g, 'د')  // استبدال "دقائق" بـ "د"
        .replace(/\s*دقيقة\s*/g, 'د')  // استبدال "دقيقة" بـ "د"
        .replace(/\s*أيام\s*/g, 'ي')   // استبدال "أيام" بـ "ي"
        .replace(/\s*يوم\s*/g, 'ي');   // استبدال "يوم" بـ "ي"
      console.log("relative time ", relativeTime);
      return relativeTime.trim(); 
    }
    // If it's older, display the full date like "August 29 at 3:35 PM"
    return format(date, "d MMMM, h:mm a", { locale: ar });
  };
  
  const timestamp = '2024-08-29T23:35:01.000000Z';
  const readableTime = formatTimestamp(timestamp);
  

export default function EnhancedProfilePage() {
  return (
    <Box maxW="1000px" mx="auto" py={6}>
      {/* Cover Photo */}
      <Box position="relative">
        <Image src={'https://bit.ly/code-beast'} width={"100%"} height={"400px"} />
        <Avatar
          src={'https://bit.ly/code-beast'}
          size="2xl"
          position="absolute"
          bottom="-50px"
          left="20px"
          border="4px solid white"
        />
      </Box>

      {/* User Info and Actions */}
      <Flex justify="space-between" mt={6} alignItems="center">
        <Box ml={4}>
          <Text fontSize="2xl" fontWeight="bold" color={"gray.700"} >محمد علي</Text>
          <Text color="gray.500">@mohamed_ali</Text>
        </Box>
        <Button  style={{backgroundColor:"#3b5998",color:"#fff",fontSize:"1rem"}} size="sm" mr={4}>
          تعديل الملف الشخصي
        </Button>
      </Flex>

      {/* Tabs for Profile Navigation */}
      <Tabs  variant="enclosed" mt={0} color={"#000"}>
         <TabList display="grid" gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }} gap={4}>
          <Tab className='tabDetails'>
            <Icon as={MdOutlineTimeline} mr={2} />
            المنشورات
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaUserFriends} mr={2} />
            الأصدقاء
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaPhotoVideo} mr={2} />
            الصور
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaVideo} mr={2} />
            الريلز والفيديوهات
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={MdGroup} mr={2} />
            المجموعات
          </Tab>
          <Tab className='tabDetails'>
            <Icon as={FaInfoCircle} mr={2} />
            حول
          </Tab>
        </TabList>

        <TabPanels color={"#000"}>
          {/* Timeline (Posts) Tab */}
          <TabPanel >
            <Box>
              <Text fontWeight="bold" mb={4}>
                منشوراتك
              </Text>
              {/* Example Post */}
              <Box className='hero' xs={12}>
                    {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Card className='card' maxW='md' mb="2" key={post.id}>
                        <CardHeader>
                            <div className='flexContainer' style={{display:"flex",width:"100%",justifyContent:"space-between"}} >
                            <div style={{display:"flex",justifyContent:"",gap:"6px"}}>
                                <Avatar className='avatar' cursor={"pointer"} name='Segun Adebayo' src={post.author.profile_image} />
                                <div >
                                <Heading cursor={"pointer"} mb='0' size='sm'>{post.author.name} </Heading>
                                <Text mb='0' style={{fontSize:"14px"}} className='text-muted'>  {formatTimestamp(post.author.created_at)}</Text>
                                </div>
                            </div>
                            <div>
                            <IconButton
                                display={"flex"}
                                justifyContent={"center"}
                                width={"20px"}
                                ml='auto'
                                // variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical />}
                            />
                            </div>
                            </div>
                        </CardHeader>
                        <CardBody className='cardBody'>
                            <Text>
                            {post.body}
                            </Text>
                        </CardBody>
                        <Image
                            objectFit='cover'
                            src={post.image}
                            alt='Chakra UI'
                        />
                        <CardFooter
                        style={{height:"20x",backgroundColor:"",padding:""}}
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                            '& > button': {
                                // minW: '136px',
                                backgroundColor:"none"
                            },
                            }}
                        >
                            <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                            أعجبني
                            </Button>
                            <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                            تعليق({post.comments_count})
                            </Button>
                            <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                            مشاركه
                            </Button>
                        </CardFooter>
                        </Card>
                    ))
                    ) :
                    (
                        <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        />
                    )
                    }

              </Box>
            </Box>
          </TabPanel>

          {/* Friends Tab */}
          <TabPanel color={"#000"}>
            <Text fontWeight="bold" mb={4}>
              الأصدقاء
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">صديق 1</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">صديق 2</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">صديق 3</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">صديق 1</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">صديق 2</Text>
              </GridItem>
              <GridItem>
                <Avatar src="https://via.placeholder.com/100" size="lg" />
                <Text mt={2} textAlign="center">صديق 3</Text>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* Photos Tab */}
          <TabPanel color={"#000"}>
            <Text fontWeight="bold" mb={4}>
              الصور
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" />
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" />
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" />
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x300" />
              </GridItem>
            </Grid>
          </TabPanel>

          {/* Reels and Videos Tab */}
          <TabPanel color={"#000"}>
            <Text fontWeight="bold" mb={4}>
              الريلز والفيديوهات
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" />
                <Text mt={2}>ريلز 1</Text>
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" />
                <Text mt={2}>فيديو 1</Text>
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" />
                <Text mt={2}>ريلز2</Text>
              </GridItem>
              <GridItem>
                <Image src="https://via.placeholder.com/300x200" />
                <Text mt={2}>فيديو2</Text>
              </GridItem>
            </Grid>
          </TabPanel>

          {/* Groups Tab */}
          <TabPanel color={"#000"}>
            <Text fontWeight="bold" mb={4}>
              المجموعات
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
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

            </Grid>
          </TabPanel>

          {/* About Tab */}
          <TabPanel color={"#000"} >
            <Text fontWeight="bold" mb={4}>
              حول
            </Text>
            <Box >
              <Text>الاسم: محمد علي</Text>
              <Text>الوظيفة: مهندس برمجيات</Text>
              <Text>الموقع: القاهرة، مصر</Text>
              <Text>نبذة: أنا مهتم بالتكنولوجيا والبرمجة وتطوير الويب.</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
