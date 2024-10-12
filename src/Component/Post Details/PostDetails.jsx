import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
  Textarea,
  useToast,
  CardHeader,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SharePost from '../2-hero/SharePost';
import { BiChat, BiLike } from 'react-icons/bi';
import PostActions from '../2-hero/PostActions';
import { format, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import './postDetails.css';

function PostDetails() {
  const { postId } = useParams(); // Get postId from the URL
  console.log("postId ",postId)
  const [post, setPost] = useState(null); // Set initial post state as null for loading
  const [comments, setComments] = useState([]); // To store comments
  const [showComments, setShowComments] = useState(false); // Toggle to show/hide comments
  const [newComment, setNewComment] = useState(''); // To hold the new comment text
  const [loadingComment, setLoadingComment] = useState(false); // Loading state for comment submission
  const toast = useToast();

  // Fetch post details from the API
  const fetchingPostDetails = () => {
    fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}`)
      .then((response) => response.json())
      .then((result) => {
        setPost(result.data);
        setComments(result.data.comments);
      })
      .catch((error) => console.log('error', error));
  };

  // Fetch post details when the component mounts
  useEffect(() => {
    fetchingPostDetails();
  }, []);

  // Toggle showing comments
  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  // Format timestamp to Arabic with relative time
  const formatTimestamp = (timestamp) => {
    console.log("Received timestamp:", timestamp); // Log the timestamp for debugging
  
    const date = new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", timestamp);
      return "Invalid date"; // Return an error message if the date is invalid
    }
  
    const now = new Date();
    const timeDifference = now - date;
  
    if (timeDifference < 24 * 60 * 60 * 1000) {
      // If time difference is less than a day, use relative time
      let relativeTime = formatDistanceToNow(date, { locale: ar, addSuffix: true });
      return relativeTime;
    }
  
    // Return a formatted date if it's older than a day
    return format(date, 'd MMMM, h:mm a', { locale: ar });
  };
  

  // Handle comment submission
  const handleSubmitComment = () => {
    setLoadingComment(true);

    // Get token from localStorage (or any other method you're using to store it)
    const token = localStorage.getItem('token');

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`, // Add the token in Authorization header
      },
      body: JSON.stringify({
        body: newComment,
      }),
    };

    fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setComments([result.data, ...comments]); // Add new comment to the top of the list
        setNewComment(''); // Clear the input field
        toast({
          title: 'تم إضافة التعليق',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log('error', error);
        toast({
          title: 'حدث خطأ أثناء إضافة التعليق',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoadingComment(false);
      });
  };

  return (
    <div className=''>
      {!post ? (
        <Box>
          <Text className='chakra-spinner ' fontWeight={'bolder'} textAlign={'center'} color={'gray.700'}>
            جارٍ تحميل المنشور...
          </Text>
          <div className='chakra-spinner'>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
          </div>
        </Box>
      ) : (
        <div key={post.id} className='CardBox'  style={{ cursor: 'pointer' }}>
          <Card className='card' flexGrow={1} maxW='500px' mb='2' p='0'>
            <CardHeader w={'100%'} bgColor={'transparent'}>
              <div className='flexContainer' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Link to={`/profile/${post.author.id}`}>
                <div style={{ display: 'flex', justifyContent: '', gap: '6px' }}>
                  <Avatar className='avatar' cursor={'pointer'} name={post.author.name} src={post.author.profile_image} />
                  <div>
                    <Heading cursor={'pointer'} mb='0' size='sm'>
                      {post.author.name}
                    </Heading>
                    <Text mb='0' style={{ fontSize: '14px' }} className='text-muted'>
                      {formatTimestamp(post.author.created_at)}
                    </Text>
                  </div>
                </div>
                </Link>
                <div >
                  <PostActions postUri={post.id}  />
                </div>
              </div>
            </CardHeader>
            <CardBody className='cardBody'>
              <Text>{post.body}</Text>
            </CardBody>
            {post.image && <Image objectFit='cover' maxHeight={'320px'} src={post.image} alt='Post image' />}
            <CardFooter justify='space-between' mb={1} paddingBottom={'4px'} flexWrap='wrap'>
              <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                أعجبني
              </Button>
              <Button flex='1' variant='ghost' 
              leftIcon={<BiChat />} 
              onClick={handleShowComments}>
                تعليق ({comments.length})
              </Button>

              {/* Share button with a popover */}
              <SharePost postUri={post.id} />
            </CardFooter>

            {showComments && (
              <Box mt={4}>
                <Heading size='md' mb={3}>
                  التعليقات
                </Heading>

                {/* Create comment input */}
                <Box mb={4}>
                  <Textarea
                    placeholder='أضف تعليق...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    isDisabled={loadingComment}
                  />
                  <Button
                    mt={2}
                    colorScheme='blue'
                    onClick={handleSubmitComment}
                    isLoading={loadingComment}
                    isDisabled={!newComment.trim()}
                  >
                    إضافة تعليق
                  </Button>
                </Box>

                {/* Display comments */}
                {comments.length > 0 ? (
                  <VStack spacing={4} align='stretch'>
                    {comments.map((comment) => (
                      <Box key={comment.id} display='flex' alignItems='flex-start' p={2} borderWidth={1} borderRadius='lg'>
                        <Avatar size='sm' name={comment.author.name} me={2} src={comment.author.profile_image} mr={2} />
                        <Box>
                          <Text fontWeight='bold'mb={0} me={2} >  {comment.author.name}</Text>
                          <Text fontSize='xs' color='gray.500'>
                            {formatTimestamp(comment.author.created_at)}
                          </Text>
                          <Text>{comment.body}</Text>
                        </Box>
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Text>لا توجد تعليقات بعد.</Text>
                )}
              </Box>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
