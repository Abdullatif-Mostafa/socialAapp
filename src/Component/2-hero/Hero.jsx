import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import Post from '../Posts/Post';

const Hero = React.memo(() => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  
  const { items: posts, status, hasMore } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, [dispatch, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop 
      >= document.documentElement.offsetHeight - 100
    ) {
      if (status !== 'loading' && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [status, hasMore]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 300);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Memoize the posts list to prevent unnecessary re-renders
  const memoizedPosts = useMemo(() => (
    posts.map((post) => (
      <Post key={post.id} post={post} />
    ))
  ), [posts]);

  return (
    <Container maxW="container.xl" py={0}>
      <Flex>
        <Box flex="1" mr={0}>
          <RightSidebar />
        </Box>

        <Box flex="2" className='main-content' mr={4} backgroundColor={'transparent'}>
          <CreatePost />
          <Box mt={4}>
            <StoriesPage />
          </Box>
          {memoizedPosts}
          {status === 'loading' && (
            <Flex justify="center" mt={4}>
              <Spinner size="lg" />
            </Flex>
          )}
          {!hasMore && posts.length > 0 && (
            <Text textAlign="center" mt={4}>
              No more posts to load
            </Text>
          )}
        </Box>

        <Box flex="1" ml={0}>
          <LeftSidebar />
        </Box>
      </Flex>
    </Container>
  );
});

// Throttle function to limit scroll event handling
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

export default Hero;
