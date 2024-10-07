// PostActions.js
import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import {
  FiSave,
  FiDownload,
  FiBellOff,
  FiEyeOff,
  FiFlag,
  FiUserMinus,
  FiMoreVertical,
  FiEdit,
  FiTrash, // Import FiTrash icon for Delete
} from 'react-icons/fi';
import EditPostModal from '../EditPost/EditPost';
import axios from 'axios';
import PropTypes from 'prop-types';
import './hero.css'

const PostActions = (props) => {
  console.log("props ",props.postUri)
  // console.log("postUri ",props.post.author.id)
  const [user, setUser] = useState(null);
  const toast = useToast();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("storeduser",storedUser);
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);
  // Destructure necessary properties from postUri
  // const { id, body, profile_image, author } = props.post;
  // console.log('id ,body ,profile ', id, body, profile_image, author )
  const profile_image=props?.postUri?.image;
  const authorId = props?.postUri?.author?.id;
  console.log("authorId",authorId)
  // Fetch user data from localStorage on component mount
 
  // Chakra UI disclosure for EditPostModal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Chakra UI disclosure for Delete Confirmation Dialog
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();
console.log("user ",user);

  // Determine if the current user is the author of the post
  const isAuthor = user?.id === authorId;
  console.log("isAuthor ",isAuthor)
  // Handle Save Post
  const handleSavePost = () => {
    toast({
      title: 'تم حفظ المنشور.',
      description: 'تم حفظ المنشور بنجاح.',
      status: 'success',
      duration: 1500,
      isClosable: false,
      position: 'top',
    });
  };

  // Handle Download Image
  const handleDownloadImage = () => {
    if (profile_image) { // Ensure profile_image has a URL
      const link = document.createElement('a');
      link.href = profile_image;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'تم تنزيل الصورة.',
        description: 'تم تنزيل الصورة بنجاح.',
        status: 'success',
        duration: 1500,
        isClosable: false,
        position: 'top',
      });
    } else {
      toast({
        title: 'لا توجد صورة للتنزيل.',
        description: 'هذا المنشور لا يحتوي على صورة.',
        status: 'warning',
        duration: 1500,
        isClosable: false,
        position: 'top',
      });
    }
  };

  // Handle Delete Post
  const handleDeletePost = async () => {
    try {
      // Make API call to delete the post
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (!token) {
        throw new Error('User not authenticated');
      }

      await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${props.postUri.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Notify user of successful deletion
      toast({
        title: 'تم حذف المنشور.',
        description: 'تم حذف المنشور بنجاح.',
        status: 'success',
        duration: 1500,
        isClosable: false,
        position: 'top',
      });

      // Inform parent component to remove the post from the UI
      // if (onDelete) {
      //   onDelete(id);
      // }

      // Close the confirmation dialog
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: 'حدث خطأ أثناء حذف المنشور.',
        description: error.response?.data?.message || 'يرجى المحاولة مرة أخرى لاحقًا.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      {/* Popover containing post actions */}
      <Popover >
        <PopoverTrigger >
          <Button
            width="20px"
            flex={1}
            justifyContent="center"
            variant="ghost"
            marginRight="15px"
            alignItems="center"
            leftIcon={<FiMoreVertical />}
          />
        </PopoverTrigger>

        <PopoverContent className='postActions' width="270px">
          <PopoverBody mr={0}>
            <Stack spacing={2}>
              <Button
                flex={1}
                justifyContent="flex-start"
                padding="6px 10px"
                leftIcon={<FiSave />}
                variant="ghost"
                onClick={handleSavePost}
              >
                حفظ المنشور
              </Button>

              <Button
                flex={1}
                justifyContent="flex-start"
                padding="6px 10px"
                leftIcon={<FiDownload />}
                variant="ghost"
                onClick={handleDownloadImage}
              >
                تنزيل الصورة
              </Button>

              {/* Conditionally render "Edit Post" button */}
              {isAuthor && (
                <Button
                  flex={1}
                  justifyContent="flex-start"
                  padding="6px 10px"
                  leftIcon={<FiEdit />}
                  variant="ghost"
                  onClick={onEditOpen} // Open the edit modal
                >
                  تعديل المنشور
                </Button>
              )}

              {/* Conditionally render "Delete Post" button */}
              {isAuthor && (
                <Button
                  flex={1}
                  justifyContent="flex-start"
                  padding="6px 10px"
                  leftIcon={<FiTrash />}
                  variant="ghost"
                  colorScheme="red"
                  onClick={onDeleteOpen} // Open the delete confirmation dialog
                >
                  حذف المنشور
                </Button>
              )}

              {/* Other action buttons */}
              <Button
                flex={1}
                justifyContent="flex-start"
                padding="6px 10px"
                leftIcon={<FiBellOff />}
                variant="ghost"
                onClick={() => {
                  toast({
                    title: 'تم تشغيل الإشعارات.',
                    description: 'ستتلقى إشعارات حول هذا المنشور.',
                    status: 'info',
                    duration: 1500,
                    isClosable: false,
                    position: 'top',
                  });
                }}
              >
                تشغيل الإشعارات لهذا المنشور
              </Button>

              <Button
                flex={1}
                justifyContent="flex-start"
                padding="6px 10px"
                leftIcon={<FiEyeOff />}
                variant="ghost"
                onClick={() => {
                  toast({
                    title: 'تم إخفاء المنشور.',
                    description: 'لن تشاهد هذا المنشور بعد الآن.',
                    status: 'warning',
                    duration: 1500,
                    isClosable: false,
                    position: 'top',
                  });
                }}
              >
                إخفاء المنشور
              </Button>

              <Button
                flex={1}
                justifyContent="flex-start"
                padding="6px 10px"
                leftIcon={<FiFlag />}
                variant="ghost"
                onClick={() => {
                  toast({
                    title: 'تم الإبلاغ عن الصورة.',
                    description: 'تم الإبلاغ عن هذه الصورة للمراجعة.',
                    status: 'error',
                    duration: 1500,
                    isClosable: false,
                    position: 'top',
                  });
                }}
              >
                الإبلاغ عن صورة
              </Button>

              <Button
                flex={1}
                justifyContent="flex-start"
                padding="6px 10px"
                leftIcon={<FiUserMinus />}
                variant="ghost"
                onClick={() => {
                  toast({
                    title: 'تم إلغاء المتابعة.',
                    description: 'لقد قمت بإلغاء متابعة هذا الحساب.',
                    status: 'info',
                    duration: 1500,
                    isClosable: false,
                    position: 'top',
                  });
                }}
              >
                إلغاء المتابعة
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/* Edit Post Modal */}
      {isAuthor && (
        <EditPostModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          postId={props?.postUri?.id}
          initialBody={props?.postUri?.body}

          // onUpdate={onPostUpdate} // Callback to update the post after editing
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isAuthor && (
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader color={"gray.800"} fontSize="lg" fontWeight="bold">
                حذف المنشور
              </AlertDialogHeader>

              <AlertDialogBody color={"gray.700"}>
                هل أنت متأكد أنك تريد حذف هذا المنشور؟ لن تتمكن من استعادته بعد الحذف.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} width={"150px"} onClick={onDeleteClose}>
                  إلغاء
                </Button>
                <Button colorScheme="red" width={"150px"} mr={2} onClick={handleDeletePost} ml={3}>
                  حذف
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
    );
};

PostActions.propTypes = {
  postUri: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    profile_image: PropTypes.object, // Adjust based on your data structure
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string, // Adjust based on your data structure
      // Add other author fields if necessary
    }).isRequired,
    onPostUpdate: PropTypes.func, // Callback function after post update
  }).isRequired,
  onDelete: PropTypes.func, // Callback function after post deletion
};

export default PostActions;
