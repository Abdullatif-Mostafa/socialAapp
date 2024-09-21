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
import { FaList, FaUserFriends, FaFacebookMessenger, FaRegSave } from 'react-icons/fa';
import { MdPostAdd, MdOutlineOndemandVideo, MdAddPhotoAlternate } from 'react-icons/md';
import "./header.css"
import { Link } from 'react-router-dom';
export default function FacebookMenu() {
  return (
    <Box display="flex" alignItems="center" textAlign="center">
      <Menu>
        {/* Wrap MenuButton with Tooltip */}
        <Tooltip label="خيارات" className='custom-tooltip mt-2' aria-label="Facebook options">
          <MenuButton
            fontSize={"18px"}
            className="faList"
            as={IconButton}
            icon={<FaList />} // Replaced FaBars with FaList
            variant="link"
            cursor="pointer"
            aria-label="Facebook options"
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
          {/* Option to Create Post */}
          <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
            <MdPostAdd  style={{ marginRight: '10px',marginLeft:"10px" }} /> إنشاء منشور
          </MenuItem>

          {/* Option to Create Reel */}
          <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
            <MdOutlineOndemandVideo style={{ marginRight: '10px',marginLeft:"10px"  }} /> إنشاء فيديو قصير
          </MenuItem>

          {/* Option to Create Story */}
          <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
            <MdAddPhotoAlternate style={{ marginRight: '10px' ,marginLeft:"10px" }} /> إنشاء قصة
          </MenuItem>

          {/* Divider */}
          <MenuDivider />

          {/* Friends List */}
          <Link to='/friendspage'>          
            <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
              <FaUserFriends style={{ marginRight: '10px' ,marginLeft:"10px" }} /> قائمة الأصدقاء
            </MenuItem>
          </Link>

          {/* Messages */}
          <Link to='/Messanger'>
          <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
            <FaFacebookMessenger style={{ marginRight: '10px',marginLeft:"10px"  }} /> الرسائل
          </MenuItem>
          </Link>

          {/* Saved Items */}
          <Link to='/saveditems'>
              <MenuItem fontSize={"18px"} color="black" _hover={{ bg: 'gray.100' }}>
                <FaRegSave style={{ marginRight: '10px' ,marginLeft:"10px" }} /> العناصر المحفوظة
              </MenuItem>
          </Link>

          {/* Settings */}
          <Link to='/SettingsPage'>
              <MenuItem fontSize={"18px"} icon={<SettingsIcon />} color="black" _hover={{ bg: 'gray.100' }}>
                الإعدادات
              </MenuItem>
          </Link>

          {/* Logout */}
          <MenuItem fontSize={"18px"} icon={<FiLogOut />} color="black" _hover={{ bg: 'gray.100' }}>
            تسجيل الخروج
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
