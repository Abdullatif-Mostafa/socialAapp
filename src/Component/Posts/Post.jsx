// PostCard.js
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { BiChat, BiLike } from 'react-icons/bi';
import { format, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import '../Post Details/postDetails.css'; // Ensure this CSS is available
import PostActions from '../2-hero/PostActions';
import SharePost from '../2-hero/SharePost';

function PostCard({ post }) {
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loadingComment, setLoadingComment] = useState(false);
  const toast = useToast();

  // Toggle showing comments
  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  // Format timestamp to Arabic with relative time
  const formatTimestamp = (timestamp) => {
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

    fetch(`https://tarmeezacademy.com/api/v1/posts/${post.id}/comments`, requestOptions)
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
    <div key={post.id} className='CardBox' style={{ cursor: 'pointer' }}>
      <Card className='card' flexGrow={1} maxW='500px' mb='2'>
        <CardHeader w={'100%'} bgColor={'transparent'}>
          <div className='flexContainer' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Link to={`/profile/${post.author.id}`}>
                <Avatar className='avatar' cursor={'pointer'} name={post.author.name} src={post.author.profile_image} />
              </Link>
              <div>
                <Link to={`/profile/${post.author.id}`}>
                  <Heading cursor={'pointer'} mb='0' size='sm'>
                    {post.author.name}
                  </Heading>
                </Link>
                <Text mb='0' style={{ fontSize: '14px' }} className='text-muted'>
                  {formatTimestamp(post.author.created_at)}
                </Text>
              </div>
            </div>
            <div>
              <PostActions postUri={post.uri} />
            </div>
          </div>
        </CardHeader>
        <Link to={`/posts/${post.id}`}>
          <CardBody className='cardBody'>
            <Text>{post.body}</Text>
          </CardBody>
          {post.image && <Image objectFit='cover' maxHeight={'320px'} src={post.image} alt='Post image' />}
        </Link>
        <CardFooter justify='space-between' flexWrap='wrap'>
          <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
            أعجبني
          </Button>
          <Button
            flex='1'
            variant='ghost'
            leftIcon={<BiChat />}
            onClick={handleShowComments}
          >
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
                    <Avatar size='sm' name={comment.author.name} src={comment.author.profile_image} mr={2} />
                    <Box>
                      <Text fontWeight='bold' mb={0}>
                        {comment.author.name}
                      </Text>
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
  );
}

export default PostCard;
