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
} from '@chakra-ui/react';
import { AddIcon, SettingsIcon } from '@chakra-ui/icons';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./header.css"
import { useDispatch } from 'react-redux';
import { logout } from '../../RTK/Slices/AuthSlice';

export default function AccountMenu() {
  const dispatch =useDispatch()
  return (
    <Box className='AccountMenu' display="flex" alignItems="center" textAlign="center">
      <Menu>
        <Tooltip label="الحساب"className='custom-tooltip' aria-label="Account settings">
          <MenuButton
            fontSize={"18px"}
            className="custom-menu-icon nav-icon" 
            as={IconButton}
            icon={<Avatar size="sm"   />}
            variant="link"
            cursor="pointer"
            aria-label="Account settings"
          />
        </Tooltip>
        {/* Enhance MenuList with styling */}
        <MenuList
          borderRadius="md"
          boxShadow="lg"
          py={3}
          my={2}
          zIndex={333}
        >
            <Link to={"/Profile"}>
          <MenuItem fontSize={"18px"} color="black"_hover={{ bg: 'gray.100' }}>
            <Avatar gap={"5"} size="sm" mr={2} me={2}/>
             الملف الشخصي
          </MenuItem>
            
            </Link>
            <Link to={'/Profile'}>
              <MenuItem fontSize={"18px"} color="black"_hover={{ bg: 'gray.100' }}>
                <Avatar size="sm" mr={2} me={2} /> حسابي
              </MenuItem>
            </Link>

          <MenuDivider />
          <Link to="/AddAnotherAccount">
              <MenuItem fontSize={"18px"} bg={'gary'} icon={<AddIcon hanging={5} />} me={2} color="black"_hover={{ bg: 'gray.100' }}>
                إضافة حساب آخر
              </MenuItem>
          </Link>
          <Link to={'/SettingsPage'}>
              <MenuItem fontSize={"18px"} icon={<SettingsIcon />} color="black"_hover={{ bg: 'gray.100' }}>
                الإعدادات
              </MenuItem>
          </Link>
          <MenuItem onClick={dispatch(logout)} fontSize={"18px"} icon={<FiLogOut />} color="black" _hover={{ bg: 'gray.100' }}>
            تسجيل الخروج
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
