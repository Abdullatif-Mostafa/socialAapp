import React, { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';

function PostCard({ post, onRemovePost }) { // Added onRemovePost prop
  // console.log("post ",post)
  // console.log("post.comments  ",post.comments)
  // console.log("post.comments_count  ",post.comments_count)
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loadingComment, setLoadingComment] = useState(false);
  const toast = useToast();

  // Toggle showing comments
  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const fetchingPostDetails = () => {
    fetch(`https://tarmeezacademy.com/api/v1/posts/${post.id}`)
      .then((response) => response.json())
      .then((result) => {
        // setPost(result.data);
        setComments(result.data.comments);
      })
      .catch((error) => console.log('error', error));
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
  useEffect(()=>{
    fetchingPostDetails();
    // console.log("comments ",comments)
  },[post.id])

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

  // Callback to handle post deletion
  const handlePostDelete = (deletedPostId) => {
    if (deletedPostId === post.id) {
      // Remove the post from the UI by calling the parent component's onRemovePost
      onRemovePost(deletedPostId);
    }
  };

  return (
    <div key={post.id} className='CardBox' style={{ cursor: 'pointer' }}>
      <Card className='card' flexGrow={1} maxW='500px' mb='1' p={'0'} mt={'0'}>
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
              <PostActions postUri={post} onDelete={handlePostDelete} /> {/* Corrected prop name and added onDelete */}
            </div>
          </div>
        </CardHeader>
        <Link to={`/posts/${post.id}`}>
          <CardBody className='cardBody'>
            <Text>{post.body}</Text>
          </CardBody>
          {post.image && post.image.url && <Image objectFit='cover' maxHeight={'320px'} width={"100%"} src={post.image.url} alt='Post image' />}
        </Link>
        <CardFooter justify='space-between' flexWrap='wrap'>
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
                   <Link to={`/profile/${comment.author.id}`}>
                     <Avatar size='sm' mt={1} name={comment.author.name}  me='1' src={comment.author.profile_image} mr={2} />
                   </Link>
                    <Box mb={1}>
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

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string, // Ensure this matches your data structure
    }),
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string, // Ensure this matches your data structure
      // Add other author fields if necessary
    }).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          profile_image: PropTypes.string, // Ensure this matches your data structure
        }).isRequired,
        created_at: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onRemovePost: PropTypes.func.isRequired, // Callback to handle post removal
};

export default PostCard;