import React, { useState, useRef, useEffect } from 'react';
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
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import { useDispatch } from 'react-redux';
import { logout } from '../../RTK/Slices/AuthSlice';

export default function AccountMenu() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [user,setUser]=useState() 
  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/login') // Close the dialog after logout
  };
  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(!user){
      navigate('/login')
    }
    else{
      const obj = JSON.parse(user);
      setUser(obj)
    }
  },[navigate])
  return (
    <Box className='AccountMenu' display="flex" alignItems="center" textAlign="center">
      <Menu>
        <Tooltip label="الحساب" className='custom-tooltip' aria-label="Account settings">
          <MenuButton
            fontSize={"18px"}
            className="custom-menu-icon nav-icon" 
            as={IconButton}
            icon={<Avatar size="sm" />}
            variant="link"
            cursor="pointer"
            aria-label="Account settings"
          />
        </Tooltip>
        <MenuList
          borderRadius="md"
          boxShadow="lg"
          py={3}
          my={2}
          zIndex={333}
        >
          <Link to={`/Profile/${user?.id}`}>
            <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
              <Avatar gap={"5"} size="sm" mr={2} me={2} />
              الملف الشخصي
            </MenuItem>
          </Link>
          <Link to={`/Profile/${user?.id}`}>
            <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
              <Avatar size="sm" mr={2} me={2} />
              حسابي
            </MenuItem>
          </Link>

          <MenuDivider />

          <Link to="/AddAnotherAccount">
            <MenuItem fontSize={"18px"} icon={<AddIcon />} color="black" _hover={{ bg: 'gray.100' }}>
              إضافة حساب آخر
            </MenuItem>
          </Link>

          <Link to={'/SettingsPage'}>
            <MenuItem fontSize={"18px"} icon={<SettingsIcon />} color="black" _hover={{ bg: 'gray.100' }}>
              الإعدادات
            </MenuItem>
          </Link>

          {/* Trigger the alert dialog for logout */}
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
          <AlertDialogContent className='logoutAlert'>
            <AlertDialogHeader  color={"gray.700"} fontSize="lg" fontWeight="bold">
              تأكيد تسجيل الخروج
            </AlertDialogHeader>

            <AlertDialogBody color={"gray.600"}>
              هل أنت متأكد أنك تريد تسجيل الخروج؟
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button width={"90px"} ref={cancelRef} onClick={onClose}>
                إلغاء
              </Button>
              <Button width={"90px"} colorScheme="red" mr={2} onClick={handleLogout} ml={3}>
                تأكيد
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
