import React, { useState } from 'react';
import './header.css';
import { FaFacebook, FaSearch, FaHome, FaUserFriends, FaTv, FaStore, FaBars, FaBell, FaUserCircle, FaCaretDown, FaUser, FaFacebookMessenger, FaFilm } from 'react-icons/fa';
import { Tooltip } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import FacebookMenu from './FacebookMenuList';
import NotificationsMenu from './NotificationsMenu';
import { Container } from '@mui/material';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="facebook-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <FaFacebook style={{marginLeft:"6px"}}/>
        </Link>
        <div className="search-bar">
          <FaSearch  style={{color:"#666",cursor:"pointer"}}/>
          <input type="text" style={{textAlign:"end",color:"#000"}} placeholder="Search Facebook" />
        </div>
      </div>

      <div className="header-center">
        <Link to='/'>
          <Tooltip label="الصفحه الرئيسيه" className="custom-tooltip" aria-label="A tooltip">
            <div className="nav-icon active">
              <FaHome /> 
            </div>
          </Tooltip>
        </Link>
        <Link to='/friendspage'>
            <Tooltip label="الاصدقاء "className="custom-tooltip" aria-label="A tooltip">
              <div className="nav-icon">
              <FaUserFriends /> 
              </div>
            </Tooltip>
        </Link>
        <Link to="/Messanger">
          <Tooltip label="messenger "className="custom-tooltip" aria-label="A tooltip">
            <div className="nav-icon ">
            <FaFacebookMessenger />
            </div>
          </Tooltip>
        </Link>
      
      <Link to='/realspage'>
          <Tooltip label="ريلز "className="custom-tooltip" aria-label="A tooltip">
            <div className="nav-icon ">
              <FaFilm /> 
            </div>
          </Tooltip>
      </Link>
      <Link to='/Marketplace'>
        <Tooltip label="Marketplace " className="custom-tooltip" aria-label="A tooltip">
          <div className="nav-icon  marketplace">
          <FaStore />
          </div>
        </Tooltip>
      </Link>
      </div>

      <div className="header-right">
        <AccountMenu/>      
        <FacebookMenu/>
        <NotificationsMenu/>
      </div>

    </header>
  );
}

export default Header;