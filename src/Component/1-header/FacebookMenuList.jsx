import React, { useState, useRef } from 'react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Tooltip,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { AddIcon, SettingsIcon } from '@chakra-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { FaList, FaUserFriends, FaFacebookMessenger, FaRegSave } from 'react-icons/fa';
import { MdPostAdd, MdOutlineOndemandVideo, MdAddPhotoAlternate } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

export default function FacebookMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  // Handle Logout Functionality
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear tokens, update redux state)
    onClose();  // Close the alert dialog
    navigate('/login');  // Redirect to login after logout
  };

  return (
    <Box display="flex" alignItems="center" textAlign="center">
      <Menu>
        {/* Wrap MenuButton with Tooltip */}
        <Tooltip label="خيارات" className="custom-tooltip mt-2" aria-label="Facebook options">
          <MenuButton
            fontSize={"18px"}
            className="faList"
            as={IconButton}
            icon={<FaList />}  // Replaced FaBars with FaList
            variant="link"
            cursor="pointer"
            aria-label="Facebook options"
          />
        </Tooltip>
        <MenuList
          borderRadius="md"
          boxShadow="lg"
          py={3}
          my={2}
          zIndex={333}
        >
          {/* Option to Create Post */}
          <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
            <MdPostAdd style={{ marginRight: '10px', marginLeft: '10px' }} /> إنشاء منشور
          </MenuItem>

          {/* Option to Create Reel */}
          <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
            <MdOutlineOndemandVideo style={{ marginRight: '10px', marginLeft: '10px' }} /> إنشاء فيديو قصير
          </MenuItem>

          {/* Option to Create Story */}
          <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
            <MdAddPhotoAlternate style={{ marginRight: '10px', marginLeft: '10px' }} /> إنشاء قصة
          </MenuItem>

          {/* Divider */}
          <MenuDivider />

          {/* Friends List */}
          <Link to='/friendspage'>
            <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
              <FaUserFriends style={{ marginRight: '10px', marginLeft: '10px' }} /> قائمة الأصدقاء
            </MenuItem>
          </Link>

          {/* Messages */}
          <Link to='/Messanger'>
            <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
              <FaFacebookMessenger style={{ marginRight: '10px', marginLeft: '10px' }} /> الرسائل
            </MenuItem>
          </Link>

          {/* Saved Items */}
          <Link to='/saveditems'>
            <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
              <FaRegSave style={{ marginRight: '10px', marginLeft: '10px' }} /> العناصر المحفوظة
            </MenuItem>
          </Link>

          {/* Settings */}
          <Link to='/SettingsPage'>
            <MenuItem fontSize={"18px"} icon={<SettingsIcon />} color="black" _hover={{ bg: 'gray.100' }}>
              الإعدادات
            </MenuItem>
          </Link>

          {/* Logout with AlertDialog */}
          <MenuItem onClick={onOpen} fontSize={"18px"} icon={<FiLogOut />} color="black" _hover={{ bg: 'gray.100' }}>
            تسجيل الخروج
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Alert Dialog for Logout Confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="gray.700">
              تأكيد تسجيل الخروج
            </AlertDialogHeader>

            <AlertDialogBody color="gray.600">
              هل أنت متأكد أنك تريد تسجيل الخروج؟
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} width="90px">
                إلغاء
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3} width="90px">
                تأكيد
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
