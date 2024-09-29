// EditPostModal.js
import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,   
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useToast,
} from '@chakra-ui/react';

const EditPostModal = ({ isOpen, onClose, postId, initialBody, onUpdate }) => {
  const toast = useToast();
  const [body, setBody] = useState(initialBody || ''); // تهيئة الحالة بقيمة initialBody
  const [isLoading, setIsLoading] = useState(false);

  // تحديث حالة body عند تغيير initialBody
  const fetchingPostDetails= async()=>{
    try {
    const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}`, requestOptions);
    const result = await response.json();
    console.log("result ", result)
    setBody(result.data.body);
    } catch (error) {
    console.error('Error fetching posts:', error);
    }
  }
  useEffect(() => {
    fetchingPostDetails()
    setBody(initialBody || '');
  }, [initialBody]);

  const handleEditPost = async () => {
    setIsLoading(true);

    // جلب التوكن من localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      toast({
        title: 'خطأ في التوثيق.',
        description: 'لم يتم العثور على توكن التوثيق. يرجى تسجيل الدخول مرة أخرى.',
        status: 'error',
        duration: 1500,
        isClosable: false,
        position: 'top',
      });
      setIsLoading(false);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`); // تضمين التوكن في الرؤوس

    const raw = JSON.stringify({ body });
    
    console.log("body ", body)
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}`, requestOptions);
      const result = await response.json();
      console.log("result ", result)
      
      if (response.ok) {
        toast({
          title: 'تم تعديل المنشور.',
          description: 'تم تعديل المنشور بنجاح.',
          status: 'success',
          duration: 1500,
          isClosable: false,
          position: 'top',
        });
        onClose(); // إغلاق النافذة بعد النجاح
        if (onUpdate) {
          onUpdate(result); // تحديث المنشور في القائمة الرئيسية
        }
      } else {
        toast({
          title: 'حدث خطأ',
          description: result.message || 'فشل تعديل المنشور.',
          status: 'error',
          duration: 1500,
          isClosable: false,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء الاتصال بالخادم.',
        status: 'error',
        duration: 1500,
        isClosable: false,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} mt={2}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تعديل المنشور</ModalHeader>
        <ModalCloseButton color={"gray.700"} _hover={{color:"white"}} mb={0}/>
        <ModalBody>
          <Textarea
            mt={0}
            color={"gray.600"}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="قم بتعديل المنشور هنا..."
            size="md"
          />
        </ModalBody>

        <ModalFooter>
          <Button width={"200px"} me={1} variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button
            width={"200px"}
            colorScheme="blue"
            onClick={handleEditPost}
            isLoading={isLoading}
            ml={3}
          >
            حفظ التعديلات
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
