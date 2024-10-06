// src/components/Hero.js
import React, { useEffect, useState } from 'react';
import "./hero.css";
import {
  Box,
  Spinner,
  Text,
  Flex,
  Container,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../RTK/Slices/PostSlice';
import CreatePost from '../Posts/CreatePost';
import RightSidebar from './../7-rightSide/RightSide';
import LeftSidebar from './../8-leftSide/LeftSide';
import StoriesPage from '../Stories Page/StoriesPage';
import Post from '../Posts/Post'

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

  return (
    <Container maxW="container.xl" py={0}>
      <Flex>
        {/* الشريط الجانبي الأيمن */}
        <Box flex="1" mr={0}>
          <RightSidebar />
        </Box>

        {/* المحتوى الرئيسي */}
        <Box flex="2" className='main-content' mr={4} backgroundColor={'transparent'}>
          <CreatePost />
          <StoriesPage/>
          {/* عرض المنشورات أو مؤشر التحميل */}
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <>
              {/* {console.log("post hero",post)} */}
              <Post key={post.id} post={post} />
              </>
            ))
          ) : (
            <>
              <Text fontWeight={"bolder"} textAlign={"center"} color={"gray.700"}>لا توجد منشورات لعرضها.</Text>
              <Box display="flex" justifyContent="center" mt={4}>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </Box>
            </>
          )}
        </Box>

        {/* الشريط الجانبي الأيسر */}
        <Box flex="1">
          <LeftSidebar />
        </Box>
      </Flex>
    </Container>
  );
}

export default Hero;
