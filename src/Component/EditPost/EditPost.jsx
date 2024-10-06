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
import PropTypes from 'prop-types';

const EditPostModal = ({ isOpen, postId, onClose, initialBody, onUpdate }) => {
  const toast = useToast();
  const [body, setBody] = useState(initialBody || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch post details if initialBody is not provided
  useEffect(() => {
    const fetchPostDetails = async () => {
      if (initialBody) return; // Skip fetching if initialBody is available

      try {
        const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}`);
        if (!response.ok) {
          throw new Error('فشل في جلب تفاصيل المنشور.');
        }
        const result = await response.json();
        setBody(result.data.body);
      } catch (err) {
        console.error('Error fetching post details:', err);
        setError(err.message);
        toast({
          title: 'خطأ',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    };

    if (isOpen) {
      fetchPostDetails();
      // If initialBody is provided, ensure it's set
      setBody(initialBody || '');
    }
  }, [postId, isOpen, initialBody, toast]);

  const handleEditPost = async () => {
    setIsLoading(true);

    // Retrieve token from localStorage
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
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify({ body });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}`, requestOptions);
      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'تم تعديل المنشور.',
          description: 'تم تعديل المنشور بنجاح.',
          status: 'success',
          duration: 1500,
          isClosable: false,
          position: 'top',
        });
        onClose(); // Close the modal
        if (onUpdate) {
          onUpdate(result.data); // Pass the updated post data
        }
      } else {
        const errorMessage = result.message || 'فشل تعديل المنشور.';
        toast({
          title: 'حدث خطأ',
          description: errorMessage,
          status: 'error',
          duration: 1500,
          isClosable: false,
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>تعديل المنشور</ModalHeader>
        <ModalCloseButton color="gray.700" _hover={{ color: 'white' }} />
        <ModalBody>
          <Textarea
            id="edit-post-body"
            mt={0}
            color="gray.600"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="قم بتعديل المنشور هنا..."
            size="md"
            aria-label="محتوى المنشور"
          />
          {error && (
            <Button
              mt={2}
              colorScheme="red"
              variant="outline"
              onClick={() => setError(null)}
            >
              إعادة المحاولة
            </Button>
          )}
        </ModalBody>

        <ModalFooter>
          <Button width="150px" mr={3} variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button
            width="150px"
            colorScheme="blue"
            onClick={handleEditPost}
            isLoading={isLoading}
            aria-label="حفظ التعديلات"
          >
            حفظ التعديلات
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditPostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClose: PropTypes.func.isRequired,
  initialBody: PropTypes.string,
  onUpdate: PropTypes.func,
};

EditPostModal.defaultProps = {
  initialBody: '',
  onUpdate: null,
};

export default EditPostModal;
