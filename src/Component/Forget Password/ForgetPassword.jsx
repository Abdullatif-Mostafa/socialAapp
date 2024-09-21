import React, { useState } from 'react';
import {
  Box, Button, Input, Text, VStack, Heading, FormControl, FormLabel, Container,
  Alert, AlertIcon, CircularProgress, Icon, Fade
} from "@chakra-ui/react";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./forget password.css"

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("الرجاء إدخال بريد إلكتروني صالح.");
      setIsValidEmail(false);
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate sending the reset email (mock request)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000); // Simulate a 2-second network delay
  };

  return (
    <Box className='forgetPassword'>
      <Container  maxW="lg" centerContent py={{ base: "8", md: "16" }}>
        <Box 
          w="100%" 
          p={{ base: 4, md: 8 }} 
          boxShadow="lg" 
          borderRadius="lg" 
          bg="white"
          pos="relative"
        >
          <VStack spacing={6} align="start" w="full">
            <Heading size="lg" textAlign="center" w="full" color="#3b5998">
              نسيت كلمة السر؟
            </Heading>
            <Text fontSize="md" color="gray.600" textAlign="center" w="full">
              الرجاء إدخال بريدك الإلكتروني أو رقم الهاتف المحمول للبحث عن حسابك.
            </Text>

            <FormControl id="email" isInvalid={!isValidEmail}>
              <FormLabel>البريد الإلكتروني أو رقم الهاتف المحمول</FormLabel>
              <Input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={handleInputChange}
                focusBorderColor="#3b5998"
                isDisabled={isSubmitted || isLoading}
                textAlign="end"
              />
              {!isValidEmail && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {error}
                </Text>
              )}
            </FormControl>

            <Button 
              w="full" 
              mt={1} 
              colorScheme="blue" 
              onClick={handleSubmit}
              bg="#3b5998"
              isDisabled={isLoading || isSubmitted}
              leftIcon={isLoading && <CircularProgress size="20px" isIndeterminate color="white" />}
            >
              {isLoading ? 'جاري البحث...' : 'بحث'}
            </Button>

            {isSubmitted && (
              <Fade in={isSubmitted}>
                <Alert status="success" color={"gray.600"} w="full" mt={1} borderRadius="lg">
                  <AlertIcon />
                  تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.
                </Alert>
              </Fade>
            )}

            <VStack w="full" spacing={2} pt={1}>
              <Link to="/login">
                <Text fontSize="sm" color="#3b5998">
                  العودة إلى صفحة تسجيل الدخول
                </Text>
              </Link>
              <Link to={'/register'} style={{width:"100%"}}>
                  <Button 
                  w="full" 
                  variant="outline" 
                  colorScheme="blue" 
                  borderColor="#3b5998" 
                  onClick={() => console.log("New Account Creation")}
                  >
                  إنشاء حساب جديد
                  </Button>
              </Link>
            </VStack>
          </VStack>
          
          {isSubmitted && (
            <Box pos="absolute" top="10px" right="10px">
              <Icon as={FaCheckCircle} color="green.500" boxSize={6} />
            </Box>
          )}

          {error && (
            <Box pos="absolute" top="10px" right="10px">
              <Icon as={FaExclamationCircle} color="red.500" boxSize={6} />
            </Box>
          )}
        </Box>
      </Container>

    </Box>
  );
}

export default ForgetPassword;
