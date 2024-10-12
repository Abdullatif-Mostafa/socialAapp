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

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, [dispatch, page,CreatePost]);
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
