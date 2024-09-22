import React from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
  useToast
} from '@chakra-ui/react';
import { FiSave, FiDownload, FiShare2, FiBellOff, FiEyeOff, FiFlag, FiUserMinus, FiMoreVertical } from 'react-icons/fi';
import SharePost from './SharePost';  // Import the SharePost component

const PostActions = ({ postUri, imageUrl }) => {
  const toast = useToast();

  // Function to handle "Save Post" action
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

  // Function to handle "Download Image" action
  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
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
  };

  const handleEnableNotifications = () => {
    toast({
      title: 'تم تشغيل الإشعارات.',
      description: 'ستتلقى إشعارات حول هذا المنشور.',
      status: 'info',
      duration: 1500,
      isClosable: false,
      position: 'top',
    });
  };

  const handleHidePost = () => {
    toast({
      title: 'تم إخفاء المنشور.',
      description: 'لن تشاهد هذا المنشور بعد الآن.',
      status: 'warning',
      duration: 1500,
      isClosable: false,
      position: 'top',
    });
  };

  const handleReportImage = () => {
    toast({
      title: 'تم الإبلاغ عن الصورة.',
      description: 'تم الإبلاغ عن هذه الصورة للمراجعة.',
      status: 'error',
      duration: 1500,
      isClosable: false,
      position: 'top',
    });
  };

  const handleUnfollow = () => {
    toast({
      title: 'تم إلغاء المتابعة.',
      description: 'لقد قمت بإلغاء متابعة هذا الحساب.',
      status: 'info',
      duration: 1500,
      isClosable: false,
      position: 'top',
    });
  };

  return (
    <Popover>
      <PopoverTrigger >
        <Button width={"20px"}  flex={1} justifyContent={"center"} variant='ghost' marginRight={"15px"} alignItems={"center"} leftIcon={<FiMoreVertical />}>
        </Button>
      </PopoverTrigger>

      <PopoverContent width={"270px"} me={4}>
        {/* <PopoverArrow /> */}
        <PopoverBody mr={0}>
          <Stack spacing={2}>
            <Button 
              flex={1} 
              justifyContent={"flex-start"} 
              padding={"6px 10px"} 
              leftIcon={<FiSave />} 
              variant="ghost"
              onClick={handleSavePost}
            >
              حفظ المنشور
            </Button>

            <Button 
              flex={1} 
              justifyContent={"flex-start"} 
              padding={"6px 10px"} 
              leftIcon={<FiDownload />} 
              variant="ghost"
              onClick={handleDownloadImage}
            >
              تنزيل الصورة
            </Button>

            {/* Share Post Option */}
            {/* <SharePost postUri={postUri} />  Use the SharePost component */}

            <Button  
              flex={1} 
              justifyContent={"flex-start"} 
              padding={"6px 10px"} 
              leftIcon={<FiBellOff />} 
              variant="ghost"
              onClick={handleEnableNotifications}
            >
              تشغيل الإشعارات لهذا المنشور
            </Button>

            <Button  
              flex={1} 
              justifyContent={"flex-start"} 
              padding={"6px 10px"} 
              leftIcon={<FiEyeOff />} 
              variant="ghost"
              onClick={handleHidePost}
            >
              إخفاء المنشور
            </Button>

            <Button  
              flex={1} 
              justifyContent={"flex-start"} 
              padding={"6px 10px"} 
              leftIcon={<FiFlag />} 
              variant="ghost"
              onClick={handleReportImage}
            >
              الإبلاغ عن صورة
            </Button>

            <Button  
              flex={1} 
              justifyContent={"flex-start"} 
              padding={"6px 10px"} 
              leftIcon={<FiUserMinus />} 
              variant="ghost"
              onClick={handleUnfollow}
            >
              إلغاء المتابعة
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PostActions;
