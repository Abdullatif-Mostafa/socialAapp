import * as React from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Tooltip,
  Button,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { MdNotificationImportant } from 'react-icons/md';

export default function NotificationsMenu() {
  const notifications = [
    {
      id: 1,
      user: 'محمد علي',
      action: 'أرسل لك طلب صداقة',
      avatar: 'https://via.placeholder.com/40',
      time: 'منذ 10 دقائق',
      type: 'friend-request',
    },
    {
      id: 2,
      user: 'Mohamed',
      action: 'أرسل لك رسالة جديدة',
      avatar: 'https://via.placeholder.com/40',
      time: 'منذ 30 دقيقة',
      type: 'message',
    },
    {
      id: 3,
      user: 'محمد',
      action: 'علق على منشورك',
      avatar: 'https://via.placeholder.com/40',
      time: 'منذ ساعة',
      type: 'comment',
    },
    {
      id: 4,
      user: 'ِAhmed Ali',
      action: 'أعجب بمنشورك',
      avatar: 'https://via.placeholder.com/40',
      time: 'منذ ساعتين',
      type: 'like',
    },
    {
      id: 5,
      user: 'سارة',
      action: 'قامت بمشاركه  منشورك',
      avatar: 'https://via.placeholder.com/40',
      time: 'منذ 3 ساعات',
      type: 'tag',
    },
    {
        id: 6,
        user: 'علي',
        action: 'دعاك للتسجيل في صفحة "تطوير البرمجيات"',
        avatar: 'https://via.placeholder.com/40',
        time: 'منذ 4 ساعات',
        type: '',
      },
  ];

  return (
    <Box display="flex" alignItems="center" textAlign="center">
      <Menu>
        <Tooltip label="الإشعارات" className='custom-tooltip' aria-label="Notifications">
          <MenuButton
            fontSize="18px"
            className="custom-menu-icon nav-icon faList"
            as={IconButton}
            icon={<MdNotificationImportant />}
            variant="link"
            cursor="pointer"
            aria-label="Notifications"
          />
        </Tooltip>
        <MenuList
          borderRadius="md"
          boxShadow="lg"
          py={2}
        //   my={1}
          zIndex={333}
          maxHeight="400px"
          overflowY="auto"
        >
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              fontSize="16px"
            //   color="black"
              _hover={{ bg: 'gray.100' }}
              p={2}
            //   minH="60px"
            >
              <Flex align="center" gap={2}>
                <Avatar size="sm" src={notification.avatar} />
                <Box flex="1">
                  <Text mb={1} color="gray.700">
                    <strong style={{fontWeight:"bolder"}}>{notification.user}</strong> {notification.action}
                  </Text>
                  <Text mb={1} fontSize="sm" color="gray.500">
                    {notification.time}
                  </Text>
                </Box>
                {notification.type === 'friend-request' && (
                  <Stack spacing={1} direction="row" ml={3}>
                    <Button size="xs" colorScheme="teal">
                      قبول
                    </Button>
                    <Button size="xs" colorScheme="red">
                      رفض
                    </Button>
                  </Stack>
                )}
              </Flex>
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem fontSize="16px" color="black" _hover={{ bg: 'gray.100' }}>
            <Box textAlign="center" width="100%">
              مسح الكل
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
