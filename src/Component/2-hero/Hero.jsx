import React, { useEffect, useState } from 'react';
import "./hero.css";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Image,
  Spinner,
  Text,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { FiFacebook, FiTwitter, FiLinkedin, FiCopy, FiMessageCircle } from 'react-icons/fi';  // Added FiMessageCircle for WhatsApp
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../RTK/Slices/PostSlice';
import { formatDistanceToNow, format } from 'date-fns';
import { ar } from 'date-fns/locale';  // استيراد اللغة العربية
import CreatePost from '../Posts/CreatePost';
import PostActions from './PostActions';
import RightSidebar from './../7-rightSide/RightSide';
import LeftSidebar from './../8-leftSide/LeftSide';
import SharePost from './SharePost';
import StoriesPage from '../Stories Page/StoriesPage';
import { Link } from 'react-router-dom';

function Hero() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  
  const { items: posts, status, hasMore } = useSelector((state) => state.posts);

  const login = async () => {
    try {
      const response = await fetch('https://tarmeezacademy.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "ali12345@gmail.com",
          password: "123456",
        }),
        credentials: 'include', // Include credentials if needed
      });
      // Check if response is OK (status code in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        throw new Error(errorData.error || 'Login failed');
      }
      // Parse the JSON response
      const data = await response.json();
      console.log('Login success:', data);
      // Optionally handle the data (e.g., store tokens, navigate, etc.)
      // localStorage.setItem('token', data.token);
      // navigate('/home'); // Redirect or navigate as needed
    } catch (error) {
      // Handle any errors that occurred during fetch or response processing
      console.error('Error during login:', error.message);
      // Display a user-friendly error message if necessary
      // alert('Login failed. Please try again.');
    }
  };
  

  useEffect(() => {
    dispatch(fetchPosts(page));
    login();
  }, [dispatch, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        if (status !== 'loading' && hasMore) {
          setPage((prevPage) => prevPage + 1);  // Load the next page when scrolled to the bottom
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status, hasMore]);

  // Format the timestamp in Arabic
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const timeDifference = now - date;

    if (timeDifference < 24 * 60 * 60 * 1000) {
      let relativeTime = formatDistanceToNow(date, { locale: ar, addSuffix: true });
      relativeTime = relativeTime
        .replace(/\s*حوالي\s*/g, '')
        .replace(/\s*تقريباً\s*/g, '')
        .replace(/\س*ساعات\s*/g, 'س')
        .replace(/\سساعة\s/g, 'س')
        .replace(/\س*دقائق\s*/g, 'د')
        .replace(/\س*دقيقة\s*/g, 'د')
        .replace(/\س*أيام\s*/g, 'ي')
        .replace(/\س*يوم\s*/g, 'ي');
      return relativeTime.trim();
    }

    return format(date, "d MMMM, h:mm a", { locale: ar });
  };

  // Function to handle sharing on social media platforms
  const handleShare = (platform, postUri) => {
    const url = encodeURIComponent(postUri);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${url}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Container>
      <div className='row'>
        <div className='' xs={4}>
          <RightSidebar />
        </div>

        <div className='' xs={12}>
          <CreatePost />
          <StoriesPage/>
          {/* Show posts or loading spinner */}
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className='' style={{cursor:"pointer"}}>
               <Link to={`posts/${post.id}`}>
                <Card flexGrow={1} maxW='' mb="2">
                  <CardHeader w={"100%"} bgColor={""}>
                    <div className='flexContainer' style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", justifyContent: "", gap: "6px" }}>
                        <Avatar className='avatar' cursor={"pointer"} name={post.author.name} src={post.author.profile_image} />
                        <div>
                          <Heading cursor={"pointer"} mb='0' size='sm'>{post.author.name}</Heading>
                          <Text mb='0' style={{ fontSize: "14px" }} className='text-muted'>
                            {formatTimestamp(post.author.created_at)}
                          </Text>
                        </div>
                      </div>
                      <div>
                        <PostActions postUri={post.uri} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className='cardBody'>
                    <Text>{post.body}</Text>
                  </CardBody>
                  {post.image && (
                    <Image objectFit='cover' src={post.image} alt='Post image' />
                  )}
                  <CardFooter justify='space-between' flexWrap='wrap'>
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                      أعجبني
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                      تعليق ({post.comments_count})
                    </Button>

                    {/* Share button with a popover */}
                    <SharePost postUri={post.uri} />

                  </CardFooter>
                </Card>
               </Link>
              </div>
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
        </div>
      </div>
      <div className='col-lg-12' xs={4}>
        <LeftSidebar />
      </div>
    </Container>
  );
}
export default Hero;