// Hero.js
import React, { useEffect, useState } from 'react';
import "./hero.css";
import {
  Container,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../RTK/Slices/PostSlice';
import { ar } from 'date-fns/locale';
import CreatePost from '../Posts/CreatePost';
import PostActions from './PostActions';
import RightSidebar from './../7-rightSide/RightSide';
import LeftSidebar from './../8-leftSide/LeftSide';
import SharePost from './SharePost';
import StoriesPage from '../Stories Page/StoriesPage';
import { Link } from 'react-router-dom';
import PostCard from '../Posts/Post';

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
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5) {
        if (status !== 'loading' && hasMore) {
          setPage((prevPage) => prevPage + 1);  // Load the next page when scrolled to the bottom
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status, hasMore]);

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
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <>
              <Text className='chakra-spinner' fontWeight={"bolder"} textAlign={"center"} color={"gray.700"}>
                لا توجد منشورات لعرضها.
              </Text>
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
