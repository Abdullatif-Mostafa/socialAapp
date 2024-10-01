// src/components/GroupPage.js
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Avatar,
  AvatarBadge,
  VStack,
  HStack,
  Divider,
  useBreakpointValue,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import { FiUsers, FiSettings, FiShare2, FiMoreVertical } from 'react-icons/fi';

// بيانات تجريبية للمجموعة
const groupData = {
  coverImage: 'data:image/jpeg;base64,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',
  name: 'مجموعة المطورين العرب',
  description: 'مجموعة مخصصة للمطورين العرب لمشاركة الأفكار، المشاريع، والتعلم المشترك.',
  members: 1500,
  isMember: false,
  ProfileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNTqzYyr3X1uiCrU5KmUmZR5TJAmebKxz-oA&s',
};

// بيانات تجريبية لأعضاء المجموعة
const members = [
  { id: 1, name: 'أحمد', avatar: 'https://bit.ly/dan-abramov', status: 'online' },
  { id: 2, name: 'Ali', avatar: 'https://bit.ly/kent-c-dodds', status: 'offline' },
  { id: 3, name: 'محمد', avatar: 'https://bit.ly/prosper-baba', status: 'online' },
  { id: 4, name: 'Mohamed', avatar: 'https://bit.ly/code-beast', status: 'offline' },
  // يمكن إضافة المزيد من الأعضاء هنا
];

// مكون لعرض الأعضاء
const MembersList = () => (
  <VStack align="stretch" spacing={4}>
    {members.map((member) => (
      <HStack key={member.id} spacing={4} cursor={'pointer'}>
        <Avatar name={member.name} src={member.avatar} mb='4'>
          {member.status === 'online' && <AvatarBadge boxSize="1em" bg="green.500" />}
        </Avatar>
        <Box>
          <Text fontWeight="bold" color={'gray.900'} mb={'0'}>{member.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {member.status === 'online' ? 'متصل الآن' : 'غير متصل'}
          </Text>
        </Box>
      </HStack>
    ))}
  </VStack>
);

// مكون لعرض المنشورات
const Posts = () => (
  <VStack align="stretch" spacing={6}>
    {/* منشور تجريبي */}
    <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
      <HStack spacing={4} cursor={'pointer'}>
        <Avatar name="أحمد" src="https://bit.ly/dan-abramov" mb='4'/>
        <Box>
          <Text fontWeight="bold" color={'gray.700'} mb='0'>أحمد</Text>
          <Text fontSize="sm" color="gray.500">
            متصل الآن
          </Text>
        </Box>
      </HStack>
      <Text mt={4} color={'gray.700'}>مرحبًا بكم في مجموعة المطورين العرب!</Text>
      <Image src="https://www.apple.com/newsroom/images/product/os/standard/Apple-WWDC22-announcement-hero_big.jpg.slideshow-xlarge_2x.jpg" alt="Post Image" mt={4} borderRadius="md" />
      <HStack spacing={4} mt={4}>
        <Button leftIcon={<FiUsers />} variant="ghost">
          إعجاب
        </Button>
        <Button leftIcon={<FiShare2 />} variant="ghost">
          مشاركة
        </Button>
        <Button leftIcon={<FiUsers />} variant="ghost">
          تعليق
        </Button>
      </HStack>
    </Box>
    {/* يمكن إضافة المزيد من المنشورات هنا */}
  </VStack>
);

// المكون الرئيسي لصفحة المجموعة
const GroupPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column">
      {/* رأس المجموعة */}
      <Box position="relative">
        <Image src={groupData.coverImage} alt="Cover Image" width="100%" height="300px" objectFit="cover" />
        <Flex
          position="absolute"
          bottom="-50px"
          left={isMobile ? '50%' : '5%'}
          transform={isMobile ? 'translateX(-50%)' : 'none'}
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="lg"
          width={isMobile ? '90%' : '80%'}
          align="center"
          justify="space-between"
        >
          <HStack spacing={4}>
            <Avatar name={groupData.name} src={groupData.ProfileImage} size="xl" mb={4} />
            <Box mt={2}>
              <Text fontSize="2xl" color={"gray"} fontWeight="bold">
                {groupData.name}
              </Text>
              <Text color="gray.500">{groupData.description}</Text>
              <HStack spacing={2}>
                <FiUsers />
                <Text color={"gray.600"}>{groupData.members} عضو</Text>
              </HStack>
            </Box>
          </HStack>
          <HStack spacing={4}>
            {/* <Button colorScheme="blue"  width='00px' leftIcon={<FiUsers />}>
              {groupData.isMember ? 'ترك المجموعة' : 'الانضمام إلى المجموعة'}
            </Button> */}
            <IconButton icon={<FiShare2 />} aria-label="Share Group" />
            <IconButton icon={<FiSettings />} aria-label="Group Settings" />
          </HStack>
        </Flex>
      </Box>

      {/* المحتوى الرئيسي */}
      <Flex mt={20} px={4} py={6} maxW="1200px" mx="auto" w="100%">
        {/* الشريط الجانبي */}
        <Box w={isMobile ? '100%' : '25%'} mr={isMobile ? 0 : 6} mb={isMobile ? 6 : 0}>
          <Text fontSize="xl" fontWeight="bold" color={'gray.900'} mb={4}>
            الأعضاء
          </Text>
          <MembersList />
          <Button mt={4} leftIcon={<FiMoreVertical />} variant="outline" width="100%">
            عرض المزيد
          </Button>
        </Box>

        {/* منطقة المنشورات */}
        <Box w={isMobile ? '100%' : '75%'} bg="gray.50" p={4} borderRadius="md" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" color='gray.900' mb={4}>
            المنشورات
          </Text>
          <Posts />
        </Box>
      </Flex>
    </Flex>
  );
};

export default GroupPage;
