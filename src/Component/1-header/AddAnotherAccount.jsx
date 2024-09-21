import React from 'react';
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Flex, Heading, Input, Stack, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function AddAnotherAccount() {
  // التوافق مع الشاشات المختلفة
  const cardSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const avatarSize = useBreakpointValue({ base: 'xl', md: '2xl' });

  return (
    <Container maxW="container.lg" py={10}>
      <Center minH="100vh">
        <Card size={cardSize} shadow="lg" borderRadius="md" p={6} maxW="lg" w="100%">
          <CardHeader>
            <VStack spacing={4} alignItems="center">
              {/* صورة الحساب */}
              <Avatar size={avatarSize} name="حساب جديد" src="" />
              {/* <Heading size="md">إضافة حساب آخر</Heading> */}
              {/* <Text color="gray.500" fontSize="sm">أدخل بيانات تسجيل الدخول لإضافة حساب جديد</Text> */}
            </VStack>
          </CardHeader>

          <CardBody>
            <Stack spacing={4}>
              {/* حقل البريد الإلكتروني أو رقم الهاتف */}
              <Input
                placeholder="البريد الإلكتروني أو رقم الهاتف"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
              
              {/* حقل كلمة المرور */}
              <Input
                placeholder="كلمة المرور"
                type="password"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />

              <Flex justifyContent="flex-end">
                <Button size="sm">
                  هل نسيت كلمة المرور؟
                </Button>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter>
            <VStack spacing={4} w="100%">
              <Button colorScheme="blue" w="100%">
                تسجيل الدخول
              </Button>
              <Text fontSize="sm" color="gray.500">
                أو
              </Text>
              <Link to='/register' style={{width:"100%"}}>
                <Button variant="outline" colorScheme="blue" w="100%">
                  إنشاء حساب جديد
                </Button>
              </Link>
            </VStack>
          </CardFooter>
        </Card>
      </Center>
    </Container>
  );
}

export default AddAnotherAccount;
