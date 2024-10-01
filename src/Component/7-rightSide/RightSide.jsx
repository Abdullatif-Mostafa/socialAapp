import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaBell, FaCog, FaCogs, FaFacebookMessenger, FaUser, FaUserCircle } from 'react-icons/fa';
import { FaBookmark, FaFilm, FaUserFriends, FaNewspaper, FaClock, FaEnvelope, FaAd } from 'react-icons/fa';
import './right.css'; // Custom CSS for advanced sidebar
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';

const RightSidebar = () => {
  const [user,setUser]=useState()
  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
      const obj = JSON.parse(user);
      setUser(obj)
      // navigate('/login')
    }
  },[])
  console.log("user id ",user?.id);
  
  const username=user?.name || "احمد علي" 
  console.log("name ",username);
  
  const groups = [
    {id:9,name: username ,icon:<Avatar className='avatar' cursor={"pointer"} name={user?.name} src={user?.profile_image} />
    ,path:`/profile/${user?.id}`},
    { id: 3, name: 'الأصدقاء', icon: <FaUserFriends />,path:"/friendspage" },
    { id: 1, name: 'العناصر المحفوظة', icon: <FaBookmark />,path:"/savedItems" },
    { id: 6, name: 'الرسائل', icon: <FaFacebookMessenger />,path:"/messages" },
    { id: 2, name: 'ريلز', icon: <FaFilm /> ,path:"/realspage"},
    { id: 4, name: 'الأخبار', icon: <FaNewspaper /> ,path:"/newsPage"},
    { id: 5, name: 'الذكريات', icon: <FaClock />,path:"/MemoriesPage" },
    { id: 7, name: 'الإعلانات', icon: <FaAd />,path:"/AdsPage" },
  ];

  const settings = [
    { id: 1, name: ' الاعدادات والخصوصيه', icon: <FaCogs />,path:"/settingsPage" },
  ];

  return (
    <div className="right-sidebar">
       {/* <h5>القائمة الرئيسية</h5> */}
      <ListGroup variant="flush">
        {groups.map((group) => (
          <Link to={group.path} >
           <ListGroup.Item style={{fontSize:"17px",border:"none",backgroundColor:"#f5f6f7"}} className="setting-item mb-1 d-flex gap-2">
            <span className="group-icon">{group.icon}</span>
            <span className="group-name ">{group.name}</span>
          </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
      <h5 className='text-dark m-2'>الإعدادات</h5>
      <ListGroup  variant="flush">
        {settings.map((setting) => (
          <Link to={setting.path}>
            <ListGroup.Item  key={setting.id} style={{fontSize:"17px",border:"none",backgroundColor:"#f5f6f7"}} className="setting-item mb-1 d-flex gap-2">
              {setting.icon}
              {setting.name}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default RightSidebar;
