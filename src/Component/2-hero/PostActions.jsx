// PostActions.js
import React, { useEffect, useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  useToast,
  useDisclosure,
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
} from 'react-icons/fi';
import EditPostModal from '../EditPost/EditPost';

const PostActions = (props) => {
  const [user,setUser]=useState()
  console.log("props ===",props.postUri.author.id)
  const authorId=props.postUri.author.id;
  const { id, body, profile_image, onPostUpdate }=props.postUri
  console.log("id ,body",
  id,
  body,
  profile_image,
  onPostUpdate
  )
  useEffect(()=>{
    const user=localStorage.getItem("user")
    console.log("user",user)
    if(user){
      const obj=JSON.parse(user)
      console.log("obj =================",obj.id)
      setUser(obj)
    }
  },[])
  console.log("user id ",user)
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // دالة لحفظ المنشور
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
  // دالة لتنزيل الصورة
  const handleDownloadImage = () => {
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
  };

  return (
    <>
      {/* Popover يحتوي على خيارات المنشور */}
      <Popover>
        <PopoverTrigger>
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

        <PopoverContent width="270px" me={4}>
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

              {/* زر تعديل المنشور */}
              {authorId===user?.id?  <Button
                flex={1}
                justifyContent="flex-start"
                padding="6px 10px"
                leftIcon={<FiEdit />}
                variant="ghost"
                onClick={onOpen} // فتح النافذة لتعديل المنشور
              >
                تعديل المنشور
              </Button>
:null}
            
              {/* يمكنك إضافة المزيد من الأزرار هنا حسب الحاجة */}
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

      {/* مكون نافذة التعديل */}
      <EditPostModal
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        initialBody={body}
        onUpdate={onPostUpdate} // دالة لتحديث المنشور بعد التعديل
      />
    </>
  );
};

export default PostActions;
